// config.js

const NETWORKS = {
    local: {
      name: "Local Development",
      chainId: 31337,
      rpcUrl: "http://127.0.0.1:8545",
      contracts: {
        EXETaskManager: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        AgentController: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
        GraphSync: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
        dAppProxyModule: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
        TokenBurner: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
        ZKValidator: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
        MockERC20: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      },
    },
  
    crossfiTestnet: {
      name: "CrossFi Testnet",
      chainId: 4157, // CrossFi EVM = 4157
      rpcUrl: "https://crossfi-testnet-rpc-url", // testnet EVM RPC
      contracts: {
        EXETaskManager: "0x...",
        AgentController: "0x...",
        GraphSync: "0x...",
        dAppProxyModule: "0x...",
        TokenBurner: "0x...",
        ZKValidator: "0x...",
        MockERC20: "0x..."
      }
    }
  };
  
  module.exports = NETWORKS;