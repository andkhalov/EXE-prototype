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
      chainId: "YOUR_CROSSFI_TESTNET_ID",  // replace with actual chain ID
      rpcUrl: "https://crossfi-testnet-rpc-url",  // replace with actual CrossFi RPC URL
      contracts: {
        EXETaskManager: "0x...",      // replace after deployment
        AgentController: "0x...",     // replace after deployment
        GraphSync: "0x...",           // replace after deployment
        dAppProxyModule: "0x...",     // replace after deployment
        TokenBurner: "0x...",         // replace after deployment
        ZKValidator: "0x...",         // replace after deployment
        MockERC20: "0x...",           // replace after deployment
      },
    },
  };
  
  // Switch this to quickly toggle between local and CrossFi Testnet deployment
  const ACTIVE_NETWORK = NETWORKS.local;
  
  module.exports = ACTIVE_NETWORK;  