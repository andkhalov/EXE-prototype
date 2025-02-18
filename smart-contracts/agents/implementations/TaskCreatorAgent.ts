// /agents/implementations/TaskCreatorAgent.ts
import { AgentBase } from "../base/AgentBase";
import { ethers } from "ethers";

export class TaskCreatorAgent extends AgentBase {
  // Create a task by specifying the performer address, the price (in ETH), and RDF data
  async createTask(performer: string, priceEther: string, rdf: string): Promise<void> {
    console.log(`TaskCreatorAgent: Creating task for performer ${performer} with price ${priceEther} ETH and RDF: ${rdf}`);
    const price = ethers.utils.parseEther(priceEther);
    const tx = await this.taskManager.createTask(performer, price, rdf);
    const receipt = await tx.wait();
    console.log(`Task created! Transaction hash: ${receipt.transactionHash}`);
  }
}
