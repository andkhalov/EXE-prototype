import os
import random
import json
import subprocess

from flask import Flask, render_template, request, redirect, url_for
from web3 import Web3, HTTPProvider
import requests

# -----------------------------
# 1) Load environment variables from .env (which is located one level above).
#    We use python-dotenv for that.
# -----------------------------
from dotenv import load_dotenv
import pathlib

# Determine the current directory (where this script lives).
CURRENT_DIR = pathlib.Path(__file__).resolve().parent
# The .env file is in the parent folder, so we do: parent / ".env"
ENV_PATH = CURRENT_DIR.parent / ".env"

# Load the .env file.
load_dotenv(dotenv_path=ENV_PATH)

# Create our Flask application.
app = Flask(__name__)

# -----------------------------
# 2) Read environment variables (private keys, GraphDB settings, etc.)
# -----------------------------
CREATOR_KEY = os.getenv("CREATOR_KEY")
AGENT_KEY = os.getenv("AGENT_KEY")

if not CREATOR_KEY:
    raise ValueError("CREATOR_KEY not set in .env or environment.")
if not AGENT_KEY:
    raise ValueError("AGENT_KEY not set in .env or environment.")

# keep contract addresses also in your .env or fallback to placeholders
ERC20_ADDRESS = os.getenv("MockERC20")
EXE_TASK_MANAGER_ADDR = os.getenv("EXETaskManager")

# GraphDB config
GRAPHDB_ENDPOINT = os.getenv("GRAPHDB_ENDPOINT", "http://localhost:7200/repositories/EXE-Repo/statements")
GRAPHDB_USER = os.getenv("GDB_ADMIN_USER", "")
GRAPHDB_PASS = os.getenv("GDB_ADMIN_PASSWORD", "")

# -----------------------------
# 3) Connect to the local Hardhat (or any other blockchain endpoint).
#    If you are running `npx hardhat node` at 127.0.0.1:8545, that is typical for local dev.
# -----------------------------
w3 = Web3(HTTPProvider("http://127.0.0.1:8545"))

# Minimal ABIs (just examples)
ERC20_ABI = [
    "function transfer(address to, uint256 amount) returns (bool)"
]
TASK_MANAGER_ABI = [
    "function createTask(address performer, uint256 price, string rdfData) returns (uint256)",
    "function completeTask(uint256 taskId, string rdfData)"
]

# -----------------------------
# Flask routes
# -----------------------------
@app.route("/")
def index():
    """
    Display a random transaction ID on the main page (1..1000).
    Warn the user about possible ID collisions (since it's purely random).
    """
    tx_id = random.randint(1, 1000)
    return render_template("index.html", tx_id=tx_id)

@app.route("/negotiate", methods=["POST"])
def negotiate():
    """
    This endpoint simulates multi-agent negotiation by calling a TypeScript script
    (../scripts/agent_negotiation.ts).
    We parse the output, which is supposed to be JSON, and display it to the user.
    """
    tx_id = request.form.get("tx_id")

    # Launch the negotiation script via subprocess.
    # Adjust 'cwd' if needed (for example, cwd="..") so that 'npx ts-node' can find the script.
    cmd = ["npx", "ts-node", "../scripts/agent_negotiation.ts", str(tx_id)]
    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        # If the script errored out, show the stderr in the response (or handle gracefully).
        return f"Negotiation error: {result.stderr}", 500

    # The script might print some lines for debugging and a final JSON line.
    # We parse the last non-empty line as JSON.
    lines = result.stdout.strip().split('\n')
    json_line = next((line for line in reversed(lines) if line.strip()), "")
    data = json.loads(json_line)

    # Extract relevant info from the JSON.
    agent_costs = data["agentCosts"]
    gas_fee = data["gasFee"]
    total = data["total"]
    summary = data["negotiationSummary"]
    tx_id_check = data["txId"]

    # Just a stub message about ZK-proof
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
    This endpoint receives the final "Sign & Pay" action:
    1) We build and sign a transaction on our local Hardhat blockchain
    2) We record the final cost in GraphDB
    3) Then redirect the user to the success page
    """
    tx_id_str = request.form.get("tx_id")
    total_str = request.form.get("total")
    tx_id = int(tx_id_str) if tx_id_str else 0
    total_exe = int(total_str) if total_str else 0

    # Build and sign a transaction with creator's private key
    creator_account = w3.eth.account.from_key(CREATOR_KEY)
    agent_account = w3.eth.account.from_key(AGENT_KEY).address

    # Use the EXETaskManager contract
    contract = w3.eth.contract(address=EXE_TASK_MANAGER_ADDR, abi=TASK_MANAGER_ABI)
    nonce = w3.eth.get_transaction_count(creator_account.address)

    build_tx = contract.functions.createTask(
        agent_account,
        w3.toWei(10, 'ether'),  # Example price
        f"<transaction_{tx_id}> <hasStatus> <Created>"
    ).build_transaction({
        "chainId": 31337,
        "gas": 500000,
        "gasPrice": w3.toWei("1", "gwei"),
        "nonce": nonce
    })

    # Sign and send
    signed_tx = w3.eth.account.sign_transaction(build_tx, private_key=CREATOR_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Receipt from chain:", receipt)

    # Record it in GraphDB
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

    # Redirect to the success page
    return redirect(url_for("success", tx_id=tx_id))

@app.route("/success")
def success():
    """
    Final page displayed after payment is done, showing the transaction ID,
    and a minimal agent interaction diagram (in success.html).
    """
    tx_id = request.args.get("tx_id")
    return render_template("success.html", tx_id=tx_id)

if __name__ == "__main__":
    # Debug mode on port 5000
    app.run(debug=True, port=5000)
