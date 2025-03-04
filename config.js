// config.js

const NETWORKS = {
    local: {
      name: "Local Development",
      chainId: 31337,
      rpcUrl: "http://127.0.0.1:8545",
      contracts: {
        EXETaskManager: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
        AgentController: "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e",
        GraphSync: "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0",
        dAppProxyModule: "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82",
        TokenBurner: "0x9A676e781A523b5d0C0e43731313A708CB607508",
        ZKValidator: "0x0B306BF915C4d645ff596e518fAf3F9669b97016",
        MockERC20: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
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