# EXE Prototype


A minimal proof-of-concept for a multi-agent synergy workflow that integrates:   

- Smart Contracts (Hardhat + Solidity)
- Token payments (ERC20)
- Agent-based negotiation (TypeScript/Ethers.js)
- GraphDB (for ontology-driven knowledge graph storage)
- Flask UI (Python + web3.py) with a dark Web3-style interface


This demo showcases an end-to-end flow:   
1. Agent Negotiation (via a TypeScript script simulating LLM-based conversation).
2. On-chain Transaction to create or complete a task in the `EXETaskManager.sol` contract.
3. GraphDB insertion to record the final synergy result.
4. UI with a minimal “ZK-proof” stub and agent interaction graph visualization.


## Contents

- [Project Structure]
- [Prerequisites]
- [Setup Instructions]
- [Hardhat Deploy & Agents]
- [GraphDB Setup]
- [Flask UI Setup & Run]
- [Demonstration Flow]
- [Smart Contracts Overview]
- [Agents Overview]
- [GraphDB & Ontology]
- [Troubleshooting]
- [License]


### Project Structure

A high-level overview of the repository (some folders omitted for brevity):   

```
EXE-prototype/
├── 📂 docs/
│   ├── ARCHITECTURE.md
│   ├── README.md
│   └── DEMO.md
│
├── 📂 ontology/
│   ├── exe.ttl                         # RDF Triples Ontology
│   └── exe.owl                         # OWL Ontology
│
├── 📂 graphdb/
│   ├── docker-compose.yml               # Docker setup for GraphDB
│   ├── Dockerfile                       # Docker for configuration
│   ├── entrypoin.sh                     # GraphDB settings
│   ├── repo-config.ttl                  # Config for GraphDB repository creation
│   ├── setup-graphdb.sh                 # server setup file
│   ├── upload_ontology_abox.py          # Creating repo and upload ontology script (can be done with GUI)
│   ├── queries/
│   │   ├── sample_queries.sparql
│   │   └── insert_triples.sparql
│   └── graph_engine.py                  # GraphDB interaction script with RPC listener and SPARQL requests to GDB (Python)
│
📂 smart-contracts/
├── 📂 contracts/
│   ├── EXETaskManager.sol                # Centrac entity for tasks and payments
│   ├── MockERC20.sol                     # Test ERC20 token
│   ├── AgentController.sol               # Authorisation and agents behaviour
│   ├── GraphSync.sol                     # Connect RDFS (graphDB) and onchain RDF triplets
│   ├── dAppProxyModule.sol               # Proxy contract to connect any dApp
│   ├── TokenBurner.sol                   # BURN contract
│   └── ZKValidator.sol                   # Validation contract with ZK-proof machanics
│
└── 📂 tests/
│   ├── task_manager.test.js
│   ├── agent_controller.test.js
│   ├── graph_sync.test.js
│   ├── dapp_proxy.test.js
│   ├── token_burner.test.js
│   └── zk_validator.test.js
│
├── 📂 agents/
│   ├── base/
│   │   └── AgentBase.ts
│   ├── implementations/
│   │   ├── ValidatorAgent.ts
│   │   ├── LiquidityPool1.ts
│   │   ├── LendingAgent.ts
│   │   ├── TaskCreatorAgent.ts
│   │   ├── InferenceAgent.ts
│   │   └── LiquidityPool2.ts
│   └── inference/
│       └── llm_negotiation.py
│
├── 📂 scripts/
│   ├── deploy_all.js
│   ├── agent_negotiation.ts
│   └── demo_agents.tsß
│
├── 📂 ui/
│   ├── app.py                  # Flask app interface demonstration
│   ├── requirements.txt
│   ├── static/
│       ├── style.css
│   │   └── diagram.js
│   └── templates/
│       ├── base.html
│       ├── index.html
│       ├── negotiation.html
│       └── success.html
│
├── 📂 cache/
│
├── 📂 artifacts/
│
├── history-builder/
│   ├── history-plan.json
│   └── history-builder.py
│
├── .env.sample
├── .env                        # add yours
├── .gitignore
├── package.json                # npm init
├── hardhat.config.js
├── config.js
├── package-lock.json
├── package.json
├── tsconfig.json
└── README.md
```

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Hardhat globally or via `npx`
- Python 3.9+ (with `pip`)
- Docker (if you want to run GraphDB locally via Docker Compose)
- `python-dotenv`, `requests`, `web3` etc. (installed via `pip` for the Flask UI)


### Setup Instructions

1. Clone the repository:

```
git clone https://github.com/andkhalov/EXE-prototype.git
cd EXE-prototype
```

2. Install Node dependencies:

```
npm install
```
This installs Hardhat, Ethers, TypeScript, etc.   

3. **(Optional)** Copy `.env.sample` → `.env` or create your own `.env`.
Make sure to fill in valid private keys (`CREATOR_KEY`, `AGENT_KEY`), contract addresses, GraphDB credentials, etc.

4. Compile and test Hardhat (optional but recommended):

```
npx hardhat compile
npx hardhat test
```

5. Deploy the contracts locally:

```
npx hardhat run scripts/deploy_all.js --network local
```

- This uses the local Hardhat network running at http://127.0.0.1:8545.
- After deployment, copy/paste the contract addresses into your .env or config.js if needed.

6. Run the agent demo (optional):

```
npm run agent-demo
```

This will run `ts-node scripts/demo_agents.ts`, which demonstrates how the TypeScript agents (e.g. `TaskCreatorAgent`, `ValidatorAgent`) interact with the deployed contracts.  

7. Install Python dependencies (for the Flask UI):

```
cd ui
pip install -r requirements.txt
```

! Make sure you do this in a virtual environment (no conda!) or your desired Python environment.


### Hardhat Deploy & Agents

- `scripts/deploy_all.js`: Deploys all the relevant smart contracts (MockERC20, EXETaskManager, AgentController, GraphSync, etc.) onto the selected network.
- `scripts/demo_agents.ts`: A short TypeScript script that:
1. Approves tokens.
2. Calls `createTask(...)`.
3. Completes a task via `ValidatorAgent`.

If successful, you’ll see console logs indicating task creation and completion events on the local network.


### GraphDB Setup

To record synergy data in a knowledge graph, we use GraphDB:

1. Launch GraphDB via Docker Compose:

```
cd graphdb
docker-compose up -d
```
This should expose GraphDB on `http://localhost:7200`.

2. Check if it’s running:
- Visit `http://localhost:7200` in your browser.
- Log in with default credentials or those specified in `.env`.

3. Create the repository (e.g., named “EXE-Repo”). You can do it manually via the GraphDB UI or use:
```
python upload_ontology_abox.py
```
(Adjust script paths if needed.)

4. Load the ontology (`ontology/exe.ttl`) either through the GraphDB web interface or `upload_ontology_abox.py`.

With GraphDB running, the Flask app can POST SPARQL updates to `http://localhost:7200/repositories/EXE-Repo/statements`.


### Flask UI Setup & Run

After installing Python requirements:

1. Set environment variables if needed (`CREATOR_KEY`, `AGENT_KEY`, `MockERC20`, `EXETaskManager`, etc.). They can be loaded from `.env` if using `python-dotenv`.   

2. Run the Flask app:
```
cd ui
flask run
```
or
```
python app.py
```
By default, it listens at `http://127.0.0.1:5000`.

3. Open your browser at `http://127.0.0.1:5000`.
- You’ll see a random `tx_id`.
- Click Start Negotiation to call the TypeScript agent script (`agent_negotiation.ts`).
- Then proceed to Sign & Pay.
- If everything is correct, you’ll see a transaction get mined in Hardhat, and a record insertion attempt into GraphDB.


### Demonstration Flow
1. Index Page:
- Displays a random Transaction ID from 1..1000 (warning about collisions inside session transaction ID must be unique).
- Button: “Start Negotiation.”
2. Negotiation (calls `agent_negotiation.ts` in TS):
- The script simulates agent cost assignment.
- Returns a JSON with total cost, agent breakdown, etc.
- The Flask page shows these details (Gas Fee, total, etc.).
- Also displays a stub “ZK-Proof passed.”
3. Sign & Pay:
- Sends a real transaction to `EXETaskManager.createTask(...)` using `web3.py`.
- Inserts a SPARQL triple into the GraphDB (e.g., `<transaction_123>` `exe:hasCost 50`).
- Redirects to the success page.
4. Success:
- Shows a minimal “Agent Interaction Graph” (circles + arrows in SVG).
- The system logs any errors (e.g., if GraphDB is not running).


### Smart Contracts Overview

`EXETaskManager.sol`: Creates tasks (createTask) and completes tasks (completeTask) with payment in MockERC20.
`MockERC20.sol`: A simple ERC20 token for local testing.
`AgentController.sol`: Registers agent addresses and roles.
`GraphSync.sol`: Stub contract to log RDF data on-chain for potential off-chain ingestion.
`dAppProxyModule.sol`: Illustrates how an external dApp might forward calls to EXETaskManager.
`TokenBurner.sol`: Example contract for burning tokens.
`ZKValidator.sol`: A mock ZK-proof validator contract (always returns success in this MVP).


### Agents Overview

TypeScript classes under `smart-contracts/agents/`:

- `AgentBase.ts`: Provides a base for all agent classes, setting up an Ethers provider and signer, referencing the EXETaskManager address from config.js.
- `InferenceAgent.ts`: Simulates LLM-based negotiation (stub logs: “price = 100 EXE”).
- `ValidatorAgent.ts`: Completes tasks by calling completeTask(...).
- `TaskCreatorAgent.ts`: Creates tasks on the chain.

**Other stubs** (`LendingAgent.ts`, `LiquidityPool1.ts`, `LiquidityPool2.ts`, `GraphSyncAgent.ts`) show how more specialized agents might be plugged in.`


### GraphDB & Ontology

- GraphDB is used to store synergy data (SPARQL `INSERT DATA`).
- `exe.ttl`, `exe.owl` contain an ontology describing agents, tasks, costs, etc.
- The off-chain knowledge graph can represent more complex relationships than typical on-chain data.
- A “hybrid” approach merges on-chain events (through `GraphSync`) with RDF/OWL rules, enabling advanced orchestration and queries.


### Troubleshooting

1. `Connection Refused` at `http://localhost:7200`:
- Ensure GraphDB Docker is running (`docker-compose up -d`).
- Check the repository name is correct (`EXE-Repo`).

2. `Non-hexadecimal digit found`:`
- Your `CREATOR_KEY` or `AGENT_KEY` environment variable might be invalid. It must be a valid `0x...` private key (64 hex chars).

3. `Invalid JSON from negotiation script`:
- The TS script might output logs in the same line as JSON. Ensure you parse only the last line or move logs to `console.error(...)`.

4. Hardhat says `“Error: missing path to config.js”`:
- Check your `config.js` references or environment variables.

5. UI is “dark theme”** but you prefer another style**:
- Tweak the `static/style.css` to your liking.


### License
This project is provided under the MIT License (or whichever license is appropriate).  
Feel free to adapt or extend any part of this code for your own use.


**Enjoy exploring the EXE-Prototype’s multi-agent synergy system with integrated knowledge graph and a modern dark-themed UI!**