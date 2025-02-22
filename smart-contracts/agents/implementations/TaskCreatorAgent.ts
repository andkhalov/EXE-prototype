// /smart-contracts/agents/implementations/TaskCreatorAgent.ts
import { AgentBase } from "../base/AgentBase";
import { ethers } from "ethers";

export class TaskCreatorAgent extends AgentBase {
  /**
   * Creates a new task by calling the Task Manager's createTask method.
   * @param performer The address of the agent assigned to perform the task.
   * @param priceEther The price in Ether (as a string, e.g., "100").
   * @param rdf The RDF data string describing the task.
   */
  async createTask(performer: string, priceEther: string, rdf: string): Promise<void> {
    try {
      console.log(`TaskCreatorAgent: Creating task for performer ${performer} with price ${priceEther} ETH and RDF: ${rdf}`);
      // In ethers v6, use ethers.parseEther directly.
      const price = ethers.parseEther(priceEther);
      const tx = await this.taskManager.createTask(performer, price, rdf);
      const receipt = await tx.wait();
      console.log(`TaskCreatorAgent: Task created successfully! Transaction hash: ${receipt.transactionHash}`);
    } catch (error) {
      console.error("TaskCreatorAgent: Error creating task:", error);
      throw error;
    }
  }
}
