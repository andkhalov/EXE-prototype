require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // from .env

const NETWORKS = require("./config.js");

// import CrossFi from .env
const CROSSFI_RPC = process.env.CROSSFITESTNET_RPC_URL || NETWORKS.crossfiTestnet.rpcUrl;
const CROSSFI_CHAIN = process.env.CROSSFITESTNET_CHAIN_ID || NETWORKS.crossfiTestnet.chainId;

// Private keys (can be empty)
const CROSSFI_KEYS = [
  process.env.CROSSFITESTNET_PRIVATE_KEY1,
  process.env.CROSSFITESTNET_PRIVATE_KEY2,
].filter(k => k); // remoove undefined

module.exports = {
  solidity: "0.8.20",

  networks: {
    // 1)  Hardhat-network for local tests "npx hardhat test"
    hardhat: {
      chainId: NETWORKS.local.chainId || 31337,
    },

    // 2) Local network (when "npx hardhat node" + "npx hardhat run ... --network local")
    local: {
      url: NETWORKS.local.rpcUrl || "http://127.0.0.1:8545",
      chainId: NETWORKS.local.chainId || 31337,
      // Hardhat generates 20 аккаунтов, if not accounts
    },

    // 3) CrossFi Testnet
    crossfiTestnet: {
      url: CROSSFI_RPC, 
      chainId: parseInt(CROSSFI_CHAIN, 10) || 4157,
      accounts: CROSSFI_KEYS, // private keys from .env
    }
  },

  paths: {
    // source folders
    sources: "./smart-contracts/contracts",
    tests: "./smart-contracts/tests",
    cache: "./smart-contracts/cache",
    artifacts: "./smart-contracts/artifacts"
  }
};
