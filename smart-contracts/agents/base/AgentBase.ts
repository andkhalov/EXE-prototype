// /smart-contracts/agents/base/AgentBase.ts
import { ethers } from "ethers";

// We assume your project uses a localConfig in config.js
import config from "../../../config.js"; 

// Path to your artifact JSON
import abiTaskManager from "../../artifacts/smart-contracts/contracts/EXETaskManager.sol/EXETaskManager.json";

/**
 * Abstract base class for all agents.
 */
export abstract class AgentBase {
  protected provider: ethers.JsonRpcProvider;
  public signer: ethers.Wallet;
  protected taskManager: ethers.Contract;

  constructor(privateKey: string) {
    if (!privateKey) {
      throw new Error("A valid private key must be provided.");
    }

    // Initialize the provider using the RPC URL from configuration.
    this.provider = new ethers.JsonRpcProvider(config.local.rpcUrl);

    // Create a signer (wallet) with the provided private key.
    this.signer = new ethers.Wallet(privateKey, this.provider);

    // Retrieve the Task Manager contract address from configuration.
    const taskManagerAddress = config.local.contracts.EXETaskManager;
    if (!taskManagerAddress) {
      throw new Error("Task Manager address is missing in configuration.");
    }

    // Instantiate the Task Manager contract with its ABI and the signer.
    this.taskManager = new ethers.Contract(taskManagerAddress, abiTaskManager.abi, this.signer);
  }

  /**
   * Retrieves the ERC20 token balance for the signer's address and returns it formatted as Ether.
   * @param tokenAddress The ERC20 token contract address.
   */
  async getTokenBalance(tokenAddress: string): Promise<string> {
    try {
      const abi = ["function balanceOf(address) view returns (uint256)"];
      const tokenContract = new ethers.Contract(tokenAddress, abi, this.signer);
      const balance = await tokenContract.balanceOf(await this.signer.getAddress());
      return ethers.formatEther(balance);
    } catch (error) {
      console.error("Error retrieving token balance:", error);
      throw error;
    }
  }
}