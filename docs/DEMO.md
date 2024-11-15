## 🚀 EXE Prototype Demo Instructions

This document guides you step-by-step through demonstrating the functionality of the EXE prototype. The demo covers interactions between the user, smart contracts, agents, GraphDB ontology, natural language negotiation, ZK-proof validation, and token economics, visualized through a simple UI.


### Key Components Demonstrated:
- User wallet interaction
- Ontology-driven agent discovery (GraphDB)
- Natural-language-based agent negotiations (LLM inference)
- Smart contract task orchestration and escrow payments
- Zero-Knowledge Proof validation (ZK-Proof)
- Deflationary token mechanism (Token Burn)
- Immutable RDF event logging on-chain
- Base interface showcasing all interactions transparently


### ⚡ Demo Flow (End-to-End Scenario)

1. **User Task Request**
The user initiates a task using a wallet connected through the UI. The task details and the required EXE tokens are escrowed via the EXETaskManager smart contract.

2. **Agent Discovery**
The system queries the GraphDB Knowledge Graph, guided by a structured ontology, selecting the most suitable agents based on roles, availability, and historical performance.

3. **Agent Negotiation**
Selected agents autonomously negotiate using the Python-based inference engine powered by OpenAI's LLM. The negotiation ensures optimal agent collaboration and task execution strategies, communicated in natural language.

4. **Task Execution**
The orchestrating smart contract assigns tasks directly to agents. Agents perform their designated operations, such as providing liquidity, lending (flash-loan style), or validating computations.

5. **Validation & Payment**
Upon completion, results are validated securely using Zero-Knowledge Proofs via the ZKValidator contract. Validation ensures correctness and integrity without revealing sensitive operational data. Once validated, the EXETaskManager releases payment from escrow to the agents.

6. **Token Burn (Deflationary Mechanism)**
A portion of EXE tokens from each transaction is automatically sent to a dedicated burn address via the TokenBurner contract, enforcing deflationary tokenomics.

7. **Immutable RDF Event Logging**
Each significant event is permanently logged as RDF triples directly on-chain through the GraphSync contract, creating an immutable and verifiable historical record.


### >> User Interface Features
- The frontend clearly demonstrates the entire scenario with:
- Wallet interactions: Easy task submission and payments
- Agent activity logs: Transparent agent communications and task progress
- ZK-proof validations: Simple confirmation of result integrity
- RDF event visualization: Clear graphical display of logged events
- Token economics summary: Clear depiction of payments and token burn events

### ✅ Deployment & Testing
- Smart contracts are deployed to the CrossFi testnet environment (EVM-compatible).
- Agents and the UI are hosted locally (Node.js, React).
- The demo scenario is executed end-to-end via an automated script (scripts/demo.ts), ensuring smooth, reproducible demonstrations.