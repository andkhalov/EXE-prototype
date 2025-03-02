// /smart-contracts/agents/implementations/TaskCreatorAgent.ts
import { AgentBase } from "../base/AgentBase";
import { ethers } from "ethers";

export class TaskCreatorAgent extends AgentBase {
  /**
   * Creates a new task by calling the Task Manager's createTask method.
   * @param performer The address of the performer.
   * @param priceEther The price in ETH as a string (e.g., "100").
   * @param rdf The RDF data describing the task.
   */
  async createTask(performer: string, priceEther: string, rdf: string): Promise<void> {
    try {
      console.log(`TaskCreatorAgent: Creating task for performer ${performer} with price ${priceEther} ETH and RDF: ${rdf}`);
      
      // Convert the price from string to a BigNumber (in wei).
      const price = ethers.parseEther(priceEther);
      
      // Get the latest nonce for the creator's account.
      const nonce = await this.signer.getNonce();
      console.log(`TaskCreatorAgent: Using nonce ${nonce} for createTask`);
      
      // Send the transaction with the explicit nonce.
      const tx = await this.taskManager.createTask(performer, price, rdf, { nonce });
      const receipt = await tx.wait();
      console.log(`TaskCreatorAgent: Task created successfully! Transaction hash: ${receipt.transactionHash}`);
    } catch (error) {
      console.error("TaskCreatorAgent: Error creating task:", error);
      throw error;
    }
  }
}
