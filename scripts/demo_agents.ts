// /agents/demo_agents.ts
import "dotenv/config"; // Load environment variables
import { TaskCreatorAgent } from "../smart-contracts/agents/implementations/TaskCreatorAgent";
import { ValidatorAgent } from "../smart-contracts/agents/implementations/ValidatorAgent";

// Load private keys from environment variables
const CREATOR_KEY = process.env.LOCALNET_PRIVATE_KEY1;
const VALIDATOR_KEY = process.env.LOCALNET_PRIVATE_KEY2;

if (!CREATOR_KEY || !VALIDATOR_KEY) {
  throw new Error("Please set LOCALNET_PRIVATE_KEY1 and LOCALNET_PRIVATE_KEY2 in your .env file");
}

async function main() {
  // Use the non-null assertion operator to tell TypeScript these values are defined.
  const creator = new TaskCreatorAgent(CREATOR_KEY!);
  const validator = new ValidatorAgent(VALIDATOR_KEY!);
  
  // Get the address of the validator agent
  const validatorAddress = await validator.signer.getAddress();
  
  // 1. Creator creates a task and assigns it to the validator
  console.log("TaskCreatorAgent -> createTask");
  await creator.createTask(validatorAddress, "100", "<task1> <hasStatus> <Created>");
  
  // 2. Validator completes the task
  console.log("ValidatorAgent -> completeTask");
  // Here we assume task ID 1 (first task created)
  await validator.completeTask(1, "<task1> <hasStatus> <Completed>");
}

main().catch((error) => {
  console.error("Error in demo_agents.ts:", error);
  process.exit(1);
});
