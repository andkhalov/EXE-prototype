// /smart-contracts/agents/base/AgentBase.ts
import { ethers } from "ethers";
import config from "../../config.js"; // Adjust the path if needed
import abiTaskManager from "../../artifacts/contracts/EXETaskManager.sol/EXETaskManager.json";

export abstract class AgentBase {
  protected provider: ethers.providers.JsonRpcProvider;
  public signer: ethers.Wallet;
  protected taskManager: ethers.Contract;

  constructor(privateKey: string) {
    if (!privateKey) {
      throw new Error("A valid private key must be provided.");
    }

    // Initialize the JSON-RPC provider using the RPC URL from config
    this.provider = new ethers.providers.JsonRpcProvider(config.local.rpcUrl);

    // Create a signer (wallet) with the provided private key
    this.signer = new ethers.Wallet(privateKey, this.provider);

    // Retrieve the Task Manager contract address from configuration
    const taskManagerAddress = config.local.contracts.EXETaskManager;
    if (!taskManagerAddress) {
      throw new Error("Task Manager address is missing in configuration.");
    }

    // Create an instance of the Task Manager contract using its ABI and the signer
    this.taskManager = new ethers.Contract(taskManagerAddress, abiTaskManager.abi, this.signer);
  }

  /**
   * Returns the ERC20 token balance of the signer, formatted in Ether.
   * @param tokenAddress The address of the ERC20 token contract.
   */
  async getTokenBalance(tokenAddress: string): Promise<string> {
    try {
      const abi = ["function balanceOf(address) view returns (uint256)"];
      const tokenContract = new ethers.Contract(tokenAddress, abi, this.signer);
      const balance = await tokenContract.balanceOf(await this.signer.getAddress());
      return ethers.formatEther(balance); // ethers v6 exposes formatEther directly
    } catch (error) {
      console.error("Error retrieving token balance:", error);
      throw error;
    }
  }
}
