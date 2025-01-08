// config.js

const NETWORKS = {
    local: {
      name: "Local Development",
      chainId: 31337,
      rpcUrl: "http://127.0.0.1:8545",
      contracts: {
        EXETaskManager: "0x...",
        AgentController: "0x...",
        GraphSync: "0x...",
        dAppProxyModule: "0x...",
        TokenBurner: "0x...",
        ZKValidator: "0x...",
        MockERC20: "0x...",
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