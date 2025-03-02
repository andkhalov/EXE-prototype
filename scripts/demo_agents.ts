// /agents/demo_agents.ts
import "dotenv/config"; // load environment variables
import { TaskCreatorAgent } from "../smart-contracts/agents/implementations/TaskCreatorAgent";
import { ValidatorAgent } from "../smart-contracts/agents/implementations/ValidatorAgent";

import { Contract, parseEther } from "ethers";
import localConfig from "../config.js"; // Adjust path if needed

// Load private keys from environment variables
const CREATOR_KEY = process.env.LOCALNET_PRIVATE_KEY1;
const VALIDATOR_KEY = process.env.LOCALNET_PRIVATE_KEY2;

if (!CREATOR_KEY || !VALIDATOR_KEY) {
  throw new Error(
    "Please set LOCALNET_PRIVATE_KEY1 and LOCALNET_PRIVATE_KEY2 in your .env file"
  );
}

async function main() {
  // Instantiate the agents
  const creator = new TaskCreatorAgent(CREATOR_KEY);
  const validator = new ValidatorAgent(VALIDATOR_KEY);

  // Log the derived addresses for clarity
  console.log("Creator address:", creator.signer.address);
  console.log("Validator address:", validator.signer.address);

  // Use validator's address as the performer
  const performerAddress = validator.signer.address;

  // 1) Approve EXETaskManager to spend tokens on behalf of creator
  const mockTokenAddress = localConfig.local.contracts.MockERC20;
  const mockTokenAbi = ["function approve(address spender, uint256 value) returns (bool)"];
  const tokenContract = new Contract(mockTokenAddress, mockTokenAbi, creator.signer);

  console.log("Approving EXETaskManager to spend 1,000,000 tokens on behalf of creator...");
  const approveTx = await tokenContract.approve(
    localConfig.local.contracts.EXETaskManager,
    parseEther("1000000")
  );
  await approveTx.wait();
  console.log("Creator has approved EXETaskManager successfully.");

  // 2) Creator creates a task for the validator
  console.log("\nTaskCreatorAgent -> createTask");
  const createTaskTx = await creator.createTask(
    performerAddress,
    "100",
    "<task1> <hasStatus> <Created>"
  );
  // Optionally, query the task after creation if your contract provides a view function:
  // const task = await creator.taskManager.tasks(1);
  // console.log("Created task details:", task);

  // 3) Validator completes the task (assuming task ID is 1)
  console.log("\nValidatorAgent -> completeTask");
  await validator.completeTask(
    1,
    "<task1> <hasStatus> <Completed>"
  );

  console.log("\nDemo completed successfully!");
}

main().catch((error) => {
  console.error("Error in demo_agents.ts:", error);
  process.exit(1);
});