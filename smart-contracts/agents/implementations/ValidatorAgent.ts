// /agents/implementations/ValidatorAgent.ts
import { AgentBase } from "../base/AgentBase";
import { ethers } from "ethers";

export class ValidatorAgent extends AgentBase {
  // Complete a task by providing its ID and the RDF data indicating task completion
  async completeTask(taskId: number, rdfData: string): Promise<void> {
    console.log(`ValidatorAgent: Completing task #${taskId} with data: ${rdfData}`);
    const tx = await this.taskManager.completeTask(taskId, rdfData);
    const receipt = await tx.wait();
    console.log(`Task #${taskId} completed! Transaction hash: ${receipt.transactionHash}`);
  }
}
