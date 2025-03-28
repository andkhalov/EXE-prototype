// scripts/agent_negotiation.ts

import dotenv from "dotenv";
import path from "path";

// Явно указываем путь к .env в корне (пример).
// Если .env лежит ещё на уровень выше, делайте "../../.env" и т.д.
dotenv.config({
  path: path.resolve(__dirname, "../.env")
});

// Импортируем агентов
import { InferenceAgent } from "../smart-contracts/agents/implementations/InferenceAgent";
import { AgentBase } from "../smart-contracts/agents/base/AgentBase";

// 1) Считываем аргумент командной строки (tx_id)
const txIdArg = process.argv[2] || "1";
const txId = parseInt(txIdArg, 10);

// 2) Берём ключ из окружения
const INF_AGENT_KEY = process.env.LOCALNET_PRIVATE_KEY2;
if (!INF_AGENT_KEY) {
  // Выводим ошибку в stderr
  console.error("No LOCALNET_PRIVATE_KEY2 found in env. Exiting.");
  process.exit(1);
}

// 3) Создаём агент
const inferenceAgent = new InferenceAgent(INF_AGENT_KEY);

// 4) Асинхронная обёртка
(async () => {
  try {
    // Шаг переговоров (примитивная демонстрация)
    // По желанию, внутри negotiateTask() можно тоже перекинуть логи в console.error().
    const negotiationResult = await inferenceAgent.negotiateTask(txId);

    // Для примера: если в negotiationResult встречается “150”, ставим price=150
    let price = 100;
    if (negotiationResult.includes("150")) {
      price = 150;
    }

    // Допустим, у нас есть два “агента”
    const validatorCost = 15; 
    const gpuCost = 30;       
    const gasFee = 5;

    // 5) Готовим итоговый объект
    const resultObj = {
      txId,
      negotiationSummary: negotiationResult,
      agentCosts: {
        ValidatorAgent: validatorCost,
        GPUProvider: gpuCost
      },
      gasFee,
      total: validatorCost + gpuCost + gasFee
    };

    // 6) Выводим ТОЛЬКО JSON в stdout
    // (Все отладочные логи печатаем в stderr через console.error, чтобы не ломать JSON-парсинг)
    console.log(JSON.stringify(resultObj));

    // 7) Успешное завершение
    process.exit(0);
  } catch (err) {
    // Любая ошибка → пишем в stderr, выходим с кодом 1
    console.error("Error in agent_negotiation.ts:", err);
    process.exit(1);
  }
})();
