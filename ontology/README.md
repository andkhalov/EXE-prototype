# EXE Ontology – README

This folder contains the **EXE Ontology**, an OWL-based ontology that captures the key concepts, relationships, and data properties of the EXE ecosystem. It describes how **agents**, **tasks**, **resources**, **protocols** (DeFi, GameFi, SocialFi, etc.), **blockchain networks**, and **contracts** interact to accomplish complex, multi-agent goals.

Created to unify semantic description of processes and entities in EXE ecosystem.  

EXE ontology builded on paradigm of Open World and can be expandede on any stage of building.  

---

## 1. Overview

The file `exe.owl` defines the semantic backbone of whole EXE ecosystem. It provides:

- **Core Classes**  
  - `Agent`, `Task`, `Resource`, `Token`, `Event`, `Contract`, `BlockchainNetwork`, `Bridge`, etc.
- **Hierarchical Protocol Classes**  
  - `Protocol`, `DeFiProtocol`, `GameFiProtocol`, `SocialFiProtocol`, `GamblingProtocol`
- **Collaboration & Negotiation**  
  - Classes like `Collaboration` and `Negotiation` that model multi-agent coordination and agreement processes.
- **Roles & Capabilities**  
  - E.g. `ValidatorRole`, `LiquidityProviderRole`, plus capabilities like `ProvidesLiquidity`, `ValidatesTasks`.
- **Object & Data Properties**  
  - Relationships (`performsTask`, `assignedTo`, `implementsProtocol`) and typed data (`contractAddress`, `hasDeadline`).

By encoding EXE concepts semantically, we gain:
1. **Interoperability**: Agents, tasks, and protocols share a unified model across different modules (TypeScript, Python, Solidity logs).  
2. **Semantic Queries**: Tools like GraphDB or `rdflib` can run SPARQL queries, enabling richer retrieval and reasoning over tasks, roles, or agent capabilities.  
3. **Extensibility**: New classes, properties, or individuals can be added without breaking existing data.

---

## 2. Ontology Structure

`exe.owl` is logically divided into major sections:

- **Header & Metadata**  
  Declares the ontology IRI (`https://exe.ai#`) and version (`2.0.0`), plus descriptive comments.

- **Core Classes**  
  Defines essential domain classes such as `Agent`, `Task`, `Resource`, `Token`, `Event`, `dApp`, `BlockchainNetwork`, etc.

- **Protocol Hierarchy**  
  Describes `Protocol` as an abstract parent, then subclasses for DeFi, GameFi, SocialFi, and Gambling.

- **Tasks, Collaboration & Negotiation**  
  Captures multi-agent tasks, statuses (Created, InProgress, Completed, Cancelled), negotiation events, and collaboration groups.

- **Resources, Tokens & Events**  
  More specialized classes dealing with the flow of value and actions in the EXE ecosystem.

- **Roles & Capabilities**  
  Allows assigning specific roles (e.g. `ValidatorRole`, `LiquidityProviderRole`) and capabilities (e.g. `ValidatesTasks`) to agents.

- **Properties**  
  - **ObjectProperties** (links between classes, like `performsTask`, `requiresResource`, `hasStatus`).  
  - **DataProperties** (typed attributes, like `hasCreationDate`, `contractAddress`, `hasBlockNumber`).

- **Example Individuals**  
  Predefined data points like task statuses (`Created`, `InProgress`, `Completed`, `Cancelled`), networks (`EthereumNetwork`, `CrossFiNetwork`), and demonstration protocols (Lorem Ipsum, can be any) (`GameFiX`, `SocialFiZ`).

---

## 3. Usage with GraphDB or Other RDF Stores

1. **Loading the Ontology**  
   - In GraphDB, create or open a repository.  
   - Upload `exe.owl` via the “Import RDF” feature or run a SPARQL-based insert.  
   - The classes, properties, and individuals become available in your RDF store.

2. **Querying**  
   - Use SPARQL to explore the data. For example, to list all classes in the EXE namespace:
     ```sparql
     PREFIX exe: <https://exe.ai#>
     SELECT ?class WHERE {
       ?class a owl:Class .
       FILTER(STRSTARTS(STR(?class), "https://exe.ai#"))
     }
     ```

3. **Extending**  
   - You can add new individuals (e.g. `exe:Agent123`), define more specialized classes (`exe:RiskyDeFiProtocol`), or extra properties for advanced logic.  

---

## 4. Integration Tips

- **Python**: Use [`rdflib`](https://rdflib.readthedocs.io/) or GraphDB’s REST API in `graph_engine.py` (can be not accessibble in early versions) to insert/query triples referencing classes and properties from `exe.owl`.
- **TypeScript Agents**: If your Node.js agents in `/agents` need to store or read semantic data, adopt a naming scheme (e.g., `exe:Agent_0x123`) to keep references consistent across code and ontology.
- **Smart Contracts**: When emitting RDF logs (through `GraphSync.sol` or off-chain events), reference the relevant classes/properties. For instance, a `TaskCreated` event might note `exe:refersToTask` or `exe:hasStatus exe:Created`.

---

## 5. Maintenance & Versioning

- **File Name**: `exe.owl`  
- **Version**: `2.0.0` (see `owl:versionInfo`)  
- **Namespace**: `https://exe.ai#`  (VERY IMPORTANT TO KEEP CONSISTENT NAME SPACES)

If you add or modify classes and properties, remember to:

- Increment the `owl:versionInfo`.  
- Provide or update `rdfs:comment` for clarity.  
- Document changes in commit messages or an ADR (Architecture Decision Record).

---

## 6. Sample SPARQL Queries

1. **Find All DeFi Protocols**  
   ```sparql
   PREFIX exe: <https://exe.ai#>
   SELECT ?protocol ?name WHERE {
     ?protocol a exe:DeFiProtocol ;
               exe:hasName ?name .
   }

2. **List All Tasks with Status = Completed**
   ```sparql
    PREFIX exe: <https://exe.ai#>
    SELECT ?task WHERE {
      ?task a exe:Task ;
            exe:hasStatus exe:Completed .
    }

3. **Retrieve Agents with 'ValidatorRole'**
   ```sparql
    PREFIX exe: <https://exe.ai#>
    SELECT ?agent WHERE {
      ?agent a exe:Agent ;
             exe:hasRole exe:ValidatorRole .
    }
____

## 7. Contributing

- Fork / New Branch: Make your changes in a separate branch.
- Naming Conventions: Keep new properties/classes in lowerCamelCase or CamelCase as appropriate.
- KEEP NAMESPACE exe.ai <<<<
- Documentation: Add or adjust rdfs:comment to explain the purpose of each addition.
- Version Info: Bump owl:versionInfo to reflect major or minor changes.

## Enjoy building on top of the EXE Ontology!