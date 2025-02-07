### AgentController Test
**Purpose:** Deploy the AgentController contract, register an agent with a specific role (e.g., "Validator"), and verify that:
- The AgentRegistered event is emitted.
- The stored role for the agent is correct.

### dAppProxyModule Test
**Purpose:** Deploy the dAppProxyModule (proxy) along with a mock ERC20 token and EXETaskManager contract. Then call the proxyCreateTask function to forward the call to the TaskManager and verify that:
- The ProxyCall event is emitted.
- The event parameters (like the caller's address and target address) match the expected values.

### GraphSync Test
**Purpose:** Deploy the GraphSync contract, call the recordRDF function with RDF data, and verify that the LogRDF event is emitted with the correct parameters.

### MockERC20 Test
**Purpose:** Deploy a mock ERC20 token, check that the initial supply is set correctly, and test transferring tokens between accounts.

### EXETaskManager Test
**Purpose:**
- Create a task via createTask and verify that the TaskCreated event is emitted with the proper task id and parameters.
- Approve token spending and then have the performer complete the task via completeTask, which should emit the TaskCompleted event and transfer the tokens correctly.

### TokenBurner Test
**Purpose:**
- Deploy the TokenBurner contract, approve token transfers, then call burnTokens which should send tokens to the address 0xdead and emit the TokensBurned event.
- Verify that the user’s token balance decreases as expected.

### ZKValidator Test
**Purpose:** Deploy the ZKValidator contract, call the validateProof function with a dummy proof, and check that the ProofValidated event is emitted with success set to true.