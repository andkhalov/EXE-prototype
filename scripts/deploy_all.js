// scripts/deploy_all.js
const hre = require("hardhat");

async function main() {
  // Retrieve ethers from hre
  const { ethers } = hre;
  // In ethers v6, use ethers.parseEther directly
  const parseEther = ethers.parseEther;

  // 1) Deploy MockERC20
  const MockERC20 = await ethers.getContractFactory("MockERC20");
  const token = await MockERC20.deploy("EXE Token", "EXE", parseEther("1000000"));
  await token.waitForDeployment();
  console.log("MockERC20 deployed at:", token.target);

  // 2) Deploy EXETaskManager
  const EXETaskManager = await ethers.getContractFactory("EXETaskManager");
  const taskManager = await EXETaskManager.deploy(token.target);
  await taskManager.waitForDeployment();
  console.log("EXETaskManager deployed at:", taskManager.target);

  // 3) Deploy AgentController
  const AgentController = await ethers.getContractFactory("AgentController");
  const agentCtrl = await AgentController.deploy();
  await agentCtrl.waitForDeployment();
  console.log("AgentController deployed at:", agentCtrl.target);

  // 4) Deploy GraphSync
  const GraphSync = await ethers.getContractFactory("GraphSync");
  const graphSync = await GraphSync.deploy();
  await graphSync.waitForDeployment();
  console.log("GraphSync deployed at:", graphSync.target);

  // 5) Deploy dAppProxyModule
  const ProxyModule = await ethers.getContractFactory("dAppProxyModule");
  const proxy = await ProxyModule.deploy();
  await proxy.waitForDeployment();
  console.log("dAppProxyModule deployed at:", proxy.target);

  // 6) Deploy TokenBurner
  const TokenBurner = await ethers.getContractFactory("TokenBurner");
  const burner = await TokenBurner.deploy();
  await burner.waitForDeployment();
  console.log("TokenBurner deployed at:", burner.target);

  // 7) Deploy ZKValidator
  const ZKValidator = await ethers.getContractFactory("ZKValidator");
  const zk = await ZKValidator.deploy();
  await zk.waitForDeployment();
  console.log("ZKValidator deployed at:", zk.target);

  console.log("\nAll contracts deployed successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
