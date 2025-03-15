// scripts/agent_negotiation.ts

import "dotenv/config";
import { InferenceAgent } from "../smart-contracts/agents/implementations/InferenceAgent";
import { AgentBase } from "../smart-contracts/agents/base/AgentBase";

// Читаем аргумент командной строки (например, tx_id)
const txIdArg = process.argv[2] || "1";
const txId = parseInt(txIdArg, 10);

// Можно взять приватный ключ агента из env:
const INF_AGENT_KEY = process.env.LOCALNET_PRIVATE_KEY2; 
if (!INF_AGENT_KEY) {
  console.error("No LOCALNET_PRIVATE_KEY2 found in env. Exiting.");
  process.exit(1);
}

// Создаём объект InferenceAgent
const inferenceAgent = new InferenceAgent(INF_AGENT_KEY);

// async wrapper
(async () => {
  try {
    // “Неготиация” через метод агентa:
    const negotiationResult = await inferenceAgent.negotiateTask(txId);

    // Предположим, что `negotiationResult` — это какая-то строка типа
    // "price = 100 EXE, agreement successful"
    // Либо вы можете возвращать более структурированный объект.

    // Для демонстрации распарсим это условно
    let price = 100; // захардкоженное (или из negotiationResult вытащить)
    if (negotiationResult.includes("150")) {
      price = 150;
    }

    // Имитируем ещё одного агента
    const validatorCost = 15;  // например 15 EXE
    const gpuCost = 30;        // например 30 EXE

    // Собираем объект-ответ, который вернём во Flask
    const resultObj = {
      txId: txId,
      negotiationSummary: negotiationResult,
      agentCosts: {
        ValidatorAgent: validatorCost,
        GPUProvider: gpuCost
      },
      // Считаем газ
      gasFee: 5,
      // Итого
      total: validatorCost + gpuCost + 5
    };

    // Печатаем JSON в stdout
    console.log(JSON.stringify(resultObj));
    process.exit(0);
  } catch (err) {
    console.error("Error in agent_negotiation.ts:", err);
    process.exit(1);
  }
})();
