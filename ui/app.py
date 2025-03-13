import os
import random
import json
import subprocess

from flask import Flask, render_template, request, redirect, url_for
from web3 import Web3, HTTPProvider
import requests

app = Flask(__name__)

# ----------------------------------------------------------------
# 1) Настройки blockchain
# ----------------------------------------------------------------
w3 = Web3(HTTPProvider("http://127.0.0.1:8545"))

CREATOR_KEY = os.getenv("CREATOR_KEY", "0xabc123...")
AGENT_KEY   = os.getenv("AGENT_KEY",   "0xdef456...")

# Допустим, уже задеплоенные адреса:
ERC20_ADDRESS = "0xMockERC20..."
EXE_TASK_MANAGER_ADDR = "0xEXETaskManager..."

ERC20_ABI = [
    "function transfer(address to, uint256 amount) returns (bool)"
]
TASK_MANAGER_ABI = [
    "function createTask(address performer, uint256 price, string rdfData) returns (uint256)",
    "function completeTask(uint256 taskId, string rdfData)"
]

# ----------------------------------------------------------------
# 2) GraphDB настройки
# ----------------------------------------------------------------
GRAPHDB_ENDPOINT = "http://localhost:7200/repositories/EXE-Repo/statements"
GRAPHDB_USER = os.getenv("GDB_ADMIN_USER", "")
GRAPHDB_PASS = os.getenv("GDB_ADMIN_PASSWORD", "")

# ----------------------------------------------------------------
# Главная страница — генерируем случайный ID, предупреждаем о коллизиях
# ----------------------------------------------------------------
@app.route("/")
def index():
    tx_id = random.randint(1, 1000)
    return render_template("index.html", tx_id=tx_id)

# ----------------------------------------------------------------
# Шаг переговоров. Реально вызываем TS-скрипт "agent_negotiation.ts"
# ----------------------------------------------------------------
@app.route("/negotiate", methods=["POST"])
def negotiate():
    tx_id = request.form.get("tx_id")

    # Запускаем Node-скрипт, передаём ему tx_id
    script_path = os.path.join("..", "scripts", "agent_negotiation.ts") 
    # ↑ Путь может зависеть от структуры проекта.
    # Если app.py лежит в "ui/", а TS-скрипт — в "../scripts/"

    # Команду формируем: npx ts-node scripts/agent_negotiation.ts <tx_id>
    cmd = ["npx", "ts-node", script_path, str(tx_id)]

    try:
        result = subprocess.run(
            cmd, capture_output=True, text=True, check=True
        )
        # result.stdout — то, что вывел скрипт
        # Парсим JSON
        data = json.loads(result.stdout)
    except subprocess.CalledProcessError as e:
        print("Error calling agent_negotiation.ts:", e)
        return "Negotiation error", 500
    except json.JSONDecodeError as e:
        print("JSON parse error from agent_negotiation.ts:", e)
        return "Invalid JSON from negotiation script", 500

    # data — это объект вида:
    # {
    #   "txId": 123,
    #   "negotiationSummary": "price = 100 EXE, agreement successful",
    #   "agentCosts": { "ValidatorAgent":15, "GPUProvider":30 },
    #   "gasFee": 5,
    #   "total": 50
    # }
    agent_costs = data.get("agentCosts", {})
    gas_fee     = data.get("gasFee", 0)
    total       = data.get("total", 0)
    summary     = data.get("negotiationSummary", "")
    tx_id_check = data.get("txId")

    # Для демонстрации, также выведем "ZK-Proof" заглушку
    zk_proof_stub = "ZK-Proof verification passed. (Real check is stubbed)"

    return render_template(
        "negotiation.html",
        tx_id=tx_id_check,
        agent_costs=agent_costs,
        gas_fee=gas_fee,
        total=total,
        negotiation_summary=summary,
        zk_proof_stub=zk_proof_stub
    )

# ----------------------------------------------------------------
# Подписываем/оплачиваем: делаем вызов createTask() (или transfer()), пишем в GDB
# ----------------------------------------------------------------
@app.route("/signpay", methods=["POST"])
def signpay():
    tx_id_str = request.form.get("tx_id")
    total_str = request.form.get("total")
    tx_id     = int(tx_id_str) if tx_id_str else 0
    total_exe = int(total_str) if total_str else 0

    # 1) Выполним условную транзакцию createTask(...).
    creator_account = w3.eth.account.from_key(CREATOR_KEY)
    agent_addr      = w3.eth.account.from_key(AGENT_KEY).address

    contract = w3.eth.contract(address=EXE_TASK_MANAGER_ADDR, abi=TASK_MANAGER_ABI)
    nonce = w3.eth.get_transaction_count(creator_account.address)

    build_tx = contract.functions.createTask(
        agent_addr,
        w3.toWei(10, 'ether'),  # к примеру
        f"<transaction_{tx_id}> <hasStatus> <Created>"
    ).build_transaction({
        "chainId": 31337,
        "gas": 500000,
        "gasPrice": w3.toWei("1", "gwei"),
        "nonce": nonce
    })

    signed_tx = w3.eth.account.sign_transaction(build_tx, private_key=CREATOR_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    print("On-chain receipt:", receipt)

    # 2) Запись в GraphDB
    #    Простейший INSERT DATA:
    sparql_insert = f"""
PREFIX exe: <https://exe.ai#>
INSERT DATA {{
  GRAPH <http://exe/graph> {{
    <transaction_{tx_id}> exe:hasCost {total_exe} .
    <transaction_{tx_id}> exe:hasStatus "Completed" .
  }}
}}
    """

    try:
        r = requests.post(
            GRAPHDB_ENDPOINT,
            data=sparql_insert,
            headers={"Content-Type": "application/sparql-update"},
            auth=(GRAPHDB_USER, GRAPHDB_PASS) if GRAPHDB_USER else None
        )
        print("GraphDB insertion:", r.status_code, r.text)
    except Exception as e:
        print("GraphDB error:", e)

    return redirect(url_for("success", tx_id=tx_id))

# ----------------------------------------------------------------
# Финальная страница: показываем, что всё завершено + простой граф
# ----------------------------------------------------------------
@app.route("/success")
def success():
    tx_id = request.args.get("tx_id")
    return render_template("success.html", tx_id=tx_id)

# ----------------------------------------------------------------
# Запуск
# ----------------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)