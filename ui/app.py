import os
import random
import json
import subprocess

from flask import Flask, render_template, request, redirect, url_for
from web3 import Web3, HTTPProvider
import requests

# We will use eth_utils.to_wei for Ether/Gwei conversions
from eth_utils import to_wei

# 1) Load environment variables from .env located one level above.
from dotenv import load_dotenv
import pathlib

# Determine the current directory (where this file is).
CURRENT_DIR = pathlib.Path(__file__).resolve().parent

# The .env is in the parent of CURRENT_DIR (i.e., project root).
ENV_PATH = CURRENT_DIR.parent / ".env"
load_dotenv(dotenv_path=ENV_PATH)

# 2) Load the Hardhat artifact for EXETaskManager (full ABI).
ARTIFACT_FILE = (
    CURRENT_DIR.parent
    / "smart-contracts"
    / "artifacts"
    / "smart-contracts"
    / "contracts"
    / "EXETaskManager.sol"
    / "EXETaskManager.json"
)

with open(ARTIFACT_FILE, "r") as f:
    artifact = json.load(f)

TASK_MANAGER_ABI = artifact["abi"]  # a list of dicts, valid for web3.py

# 3) Read environment variables for private keys, contract addresses, etc.
CREATOR_KEY = os.getenv("CREATOR_KEY")
AGENT_KEY = os.getenv("AGENT_KEY")

if not CREATOR_KEY:
    raise ValueError("CREATOR_KEY not set in .env or environment.")
if not AGENT_KEY:
    raise ValueError("AGENT_KEY not set in .env or environment.")

# Example: reading addresses from .env, e.g. "MockERC20=0x5FbDB..."
ERC20_ADDRESS = os.getenv("MockERC20")  
EXE_TASK_MANAGER_ADDR = os.getenv("ExETaskManager") or os.getenv("EXETaskManager")
# Sometimes you might have it under "EXETaskManager" or a slightly different name

if not ERC20_ADDRESS:
    raise ValueError("MockERC20 not set in .env or environment.")
if not EXE_TASK_MANAGER_ADDR:
    raise ValueError("EXETaskManager not set in .env or environment.")

# GraphDB config
GRAPHDB_ENDPOINT = os.getenv("GRAPHDB_ENDPOINT", "http://localhost:7200/repositories/EXE-Repo/statements")
GRAPHDB_USER = os.getenv("GDB_ADMIN_USER", "")
GRAPHDB_PASS = os.getenv("GDB_ADMIN_PASSWORD", "")

# 4) Connect to local Hardhat or any custom chain
w3 = Web3(HTTPProvider("http://127.0.0.1:8545"))

# Example minimal ABI for ERC20, if needed
ERC20_ABI = [
    "function transfer(address to, uint256 amount) returns (bool)"
]

# 5) Initialize Flask app
app = Flask(__name__)

@app.route("/")
def index():
    """
    Main page: show a random transaction ID (1..1000).
    Warn about collisions.
    """
    tx_id = random.randint(1, 1000)
    return render_template("index.html", tx_id=tx_id)

@app.route("/negotiate", methods=["POST"])
def negotiate():
    """
    Calls the TypeScript script `agent_negotiation.ts` to simulate multi-agent negotiation.
    Then parses the JSON output and renders 'negotiation.html'.
    """
    tx_id = request.form.get("tx_id")
    cmd = ["npx", "ts-node", "../scripts/agent_negotiation.ts", str(tx_id)]
    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        # Show the script's stderr if there's an error
        return f"Negotiation error: {result.stderr}", 500

    # The script may print extra logs, so we parse the last non-empty line as JSON
    lines = result.stdout.strip().split('\n')
    json_line = next((line for line in reversed(lines) if line.strip()), "")
    data = json.loads(json_line)

    agent_costs = data["agentCosts"]
    gas_fee = data["gasFee"]
    total = data["total"]
    summary = data["negotiationSummary"]
    tx_id_check = data["txId"]

    zk_proof_stub = "ZK-Proof verification passed. (Stub)"

    return render_template(
        "negotiation.html",
        tx_id=tx_id_check,
        agent_costs=agent_costs,
        gas_fee=gas_fee,
        total=total,
        negotiation_summary=summary,
        zk_proof_stub=zk_proof_stub
    )

@app.route("/signpay", methods=["POST"])
def signpay():
    """
    Signs and sends an on-chain transaction calling createTask(...)
    then inserts a triple in GraphDB. Finally, redirects to /success.
    """
    tx_id_str = request.form.get("tx_id")
    total_str = request.form.get("total")
    tx_id = int(tx_id_str) if tx_id_str else 0
    total_exe = int(total_str) if total_str else 0

    # Use the CREATOR_KEY and AGENT_KEY from environment
    creator_account = w3.eth.account.from_key(CREATOR_KEY)
    agent_addr = w3.eth.account.from_key(AGENT_KEY).address

    # Build the contract instance with the loaded artifact's ABI
    contract = w3.eth.contract(address=EXE_TASK_MANAGER_ADDR, abi=TASK_MANAGER_ABI)
    nonce = w3.eth.get_transaction_count(creator_account.address)

    # Convert "10 Ether" to wei. Also convert "1 gwei" for gasPrice
    price_wei = to_wei(10, "ether")
    gas_price_wei = to_wei("1", "gwei")

    build_tx = contract.functions.createTask(
        agent_addr,
        price_wei,
        f"<transaction_{tx_id}> <hasStatus> <Created>"
    ).build_transaction({
        "chainId": 31337,
        "gas": 500000,
        "gasPrice": gas_price_wei,
        "nonce": nonce
    })

    signed_tx = w3.eth.account.sign_transaction(build_tx, private_key=CREATOR_KEY)

    # In web3.py 6+, the attribute is `signed_tx.raw_transaction` (with underscore)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Receipt from chain:", receipt)

    # Insert a record into GraphDB
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
        print("GraphDB insertion status:", r.status_code, r.text)
    except Exception as e:
        print("GraphDB insertion error:", e)

    return redirect(url_for("success", tx_id=tx_id))

@app.route("/success")
def success():
    """
    Final page showing that everything is done,
    with a minimal agent interaction diagram (see success.html).
    """
    tx_id = request.args.get("tx_id")
    return render_template("success.html", tx_id=tx_id)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
