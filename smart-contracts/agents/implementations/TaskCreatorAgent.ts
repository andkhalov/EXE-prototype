// /smart-contracts/agents/implementations/TaskCreatorAgent.ts
import { AgentBase } from "../base/AgentBase";
import { ethers } from "ethers";

export class TaskCreatorAgent extends AgentBase {
  /**
   * Creates a new task and returns its id.
   * @param performer The address of the performer.
   * @param priceEther The price in ETH as a string (e.g., "100").
   * @param rdf The RDF data describing the task.
   * @returns The new task id.
   */
  async createTask(performer: string, priceEther: string, rdf: string): Promise<number> {
    try {
      console.log(`TaskCreatorAgent: Creating task for performer ${performer} with price ${priceEther} ETH and RDF: ${rdf}`);
      const price = ethers.parseEther(priceEther);
      const tx = await this.taskManager.createTask(performer, price, rdf);
      console.log("Transaction submitted, hash:", tx.hash);
      const receipt = await tx.wait();
      console.log(`TaskCreatorAgent: Task created successfully! Receipt hash: ${receipt.hash}`);
      
      // Извлекаем событие TaskCreated и получаем taskId
      const event = receipt.events?.find((e: any) => e.event === "TaskCreated");
      const taskId = event?.args?.taskId.toNumber();
      console.log("New task id:", taskId);
      return taskId;
    } catch (error) {
      console.error("TaskCreatorAgent: Error creating task:", error);
      throw error;
    }
  }
}