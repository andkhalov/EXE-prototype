// /agents/base/AgentBase.ts
import { ethers } from "ethers";
import config from "../../config.js"; // Adjust the path if needed
import abiTaskManager from "../../artifacts/contracts/EXETaskManager.sol/EXETaskManager.json";

// Base class for all agents
export class AgentBase {
  protected provider: ethers.providers.JsonRpcProvider;
  public signer: ethers.Wallet;
  protected taskManager: ethers.Contract;

  constructor(privateKey: string) {
    // Connect to the RPC from config (local network in this example)
    this.provider = new ethers.providers.JsonRpcProvider(config.local.rpcUrl);
    this.signer = new ethers.Wallet(privateKey, this.provider);

    // Get the Task Manager contract address from config
    const taskManagerAddress = config.local.contracts.EXETaskManager;

    // Create a contract instance with the Task Manager ABI
    this.taskManager = new ethers.Contract(taskManagerAddress, abiTaskManager.abi, this.signer);
  }

  // Example method: Get token balance from an ERC20 token contract
  async getTokenBalance(tokenAddress: string): Promise<string> {
    const abi = ["function balanceOf(address) view returns (uint256)"];
    const tokenContract = new ethers.Contract(tokenAddress, abi, this.signer);
    const balance = await tokenContract.balanceOf(await this.signer.getAddress());
    return ethers.utils.formatEther(balance);
  }
}
