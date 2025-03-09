// /smart-contracts/agents/implementations/ValidatorAgent.ts
import { AgentBase } from "../base/AgentBase";

export class ValidatorAgent extends AgentBase {
  /**
   * Completes an existing task by calling the Task Manager's completeTask method.
   * @param taskId The ID of the task to complete.
   * @param rdfData The RDF data indicating task completion.
   */
  async completeTask(taskId: number, rdfData: string): Promise<void> {
    try {
      console.log(`ValidatorAgent: Completing task #${taskId} with RDF: ${rdfData}`);
      
      // Get the current nonce for the validator's account.
      const nonce = await this.signer.getNonce();
      console.log(`ValidatorAgent: Using nonce ${nonce} for completeTask`);
      
      // Send the transaction with the explicit nonce.
      const tx = await this.taskManager.completeTask(taskId, rdfData);
      const receipt = await tx.wait();
      console.log(`ValidatorAgent: Task #${taskId} completed successfully! Transaction hash: ${receipt.transactionHash}`);
    } catch (error) {
      console.error(`ValidatorAgent: Error completing task #${taskId}:`, error);
      throw error;
    }
  }
}
