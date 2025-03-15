# EXE Prototype Architecture Overview

## General Architecture

This document provides a detailed architectural overview of the EXE Prototype, outlining key modules, interactions, smart contracts, agent communications, ontology usage, and inference mechanisms.

## 🛠 Top-Level Architecture Components

### 🔗 On-chain Components

1. **Smart Contracts (Ethereum compatible EVM, deployed on CrossFi Testnet)**

2. **EXETaskManager.sol** 
| Manages tasks lifecycle (creation, assignment, completion) |   
| Handles token escrow for tasks |   
| Emits events logged as RDF triples for GraphSync |   

3. **AgentController.sol**
| Manages agent registration, roles, authorization, and permissions |
| Ensures agents operate within defined roles and responsibilities |  

4. **GraphSync.sol**
| Bridges off-chain GraphDB and on-chain RDF triples |
| Records on-chain RDF triples to provide immutable data logging and verifiable history |

5. **dAppProxyModule.sol**
| Universal proxy that integrates into external dApps |
| Performs delegated tasks and returns control post-execution to original client |

6. **TokenBurner.sol**
| Implements deflationary tokenomics by periodically sending EXE tokens to a burn address |  
| Ensures scarcity and value retention of EXE tokens |  

7. **ZKValidator.sol**
| Performs validation of agent outputs using Zero-Knowledge Proofs (zk-SNARKs) |  
| Allows task execution verification without disclosing task-specific sensitive details |  

8. **MockERC20.sol**
| ERC-20 compatible test token to simulate token-based payments in testnet environment |  

9. **On-chain Knowledge Graph (RDF):**
    - RDF Triplets representing key events and transactions;
    - Immutable history of agent interactions and task executions

10. Zero-Knowledge Proof (ZK-Proof)
    - Validation of agent task execution without revealing sensitive data  


### 🌐 Off-chain Components

1. **GraphDB (Knowledge Graph), graph_engine.py**
    - SPARQL engine and triple storage (GraphDB, external server, can be deployed locally)
    - graph_engine.py for queries and updates

| Stores agent metadata, historical events, and dynamic state changes |  
| Serves SPARQL endpoints for querying agent states, task details, and past interactions |  
| Performs reasoning based on ontology to provide semantic queries and validations |  

2. **Ontology (OWL)**
    - Structured domain-specific ontology for agent roles, tasks, and interactions (exe.owl, exe.ttl)

| Defines core domain concepts: Agents, Roles, Tasks, Events, Tokens, and Resources |  
| Facilitates semantic consistency and interoperability across agents |  

3. **Inference & Negotiation Engine**
    - Python-based LLM interface (llm_negotiation.py, langChain/langGraph lib. for demo purpose)
    - Powered by OpenAI API (can be any inf engine eg. DeepSeek, Antropic, open source instructed model on cloud) for negotiation between agents in natural language
    - Generates structured JSON payloads from natural language communications

4. **Agents (TypeScript)**
    - Modular agents interacting with smart contracts and GraphDB
    - baseAgent supercalss - Abstract class providing basic functionalities: send/receive messages, interact with smart contracts, query GraphDB  
    - LiquidityPoolAgent1.ts: Provides liquidity operations (LP1) (agents entity 1)
    - LiquidityPoolAgent2.ts: Secondary liquidity provider (LP2) (agents entity 2)
    - LendingAgent.ts: Provides lending services (Flash Loans) (agents entity 3)
    - ValidatorAgent.ts: Oversees correctness, validates tasks execution via ZK-Proof (agents entity 4)
    - **Each agent uses a common inference engine and negotiates in natural language through the LLM module.**


### 🔧 Forks & Third-party Integrations
**OpenZeppelin:** Standard ERC20 tokens and secure contract templates
**Chainlink:** Inspiration for GraphSync contract (off-chain/on-chain bridging concepts same as oracles but from ontology and knowlege graph)
**Tornado.cash / Semaphore:** ZK-proof implementation inspirations (validation privacy)
**LangGraph / Bittensor (optional):** Ideas for agent inference and negotiation architectures



## 🔧 Technology Stack

- **Smart Contracts**: Solidity, Hardhat
- **Backend & Agents**: TypeScript, Node.js
- **Inference & GraphDB**: Python, GraphDB, SPARQL
- **Frontend UI**: React.js



## 🚩 Key Objectives for concept demonstration

- Clear separation of concerns between off-chain and on-chain processes.
- Robust validation mechanisms leveraging ZK-proofs.
- Scalable agent-based transaction negotiation and execution.
- Effective tokenomics maintained through deflationary token burn mechanisms.



## Project Folder Structure (main onchain parts)

```
## 📂 Root Directory
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

This architectural overview provides a detailed guide for the structured development and deployment of the EXE prototype (first version). │