// scripts/deploy_all.js
const hre = require("hardhat");

async function main() {
  // 1) Deploy MockERC20
  const MockERC20 = await hre.ethers.getContractFactory("MockERC20");
  const token = await MockERC20.deploy("EXE Token", "EXE", hre.ethers.utils.parseEther("1000000"));
  await token.deployed();
  console.log("MockERC20 deployed at:", token.address);

  // 2) Deploy EXETaskManager
  const EXETaskManager = await hre.ethers.getContractFactory("EXETaskManager");
  const taskManager = await EXETaskManager.deploy(token.address);
  await taskManager.deployed();
  console.log("EXETaskManager deployed at:", taskManager.address);

  // 3) Deploy AgentController
  const AgentController = await hre.ethers.getContractFactory("AgentController");
  const agentCtrl = await AgentController.deploy();
  await agentCtrl.deployed();
  console.log("AgentController deployed at:", agentCtrl.address);

  // 4) Deploy GraphSync
  const GraphSync = await hre.ethers.getContractFactory("GraphSync");
  const graphSync = await GraphSync.deploy();
  await graphSync.deployed();
  console.log("GraphSync deployed at:", graphSync.address);

  // 5) Deploy dAppProxyModule
  const ProxyModule = await hre.ethers.getContractFactory("dAppProxyModule");
  const proxy = await ProxyModule.deploy();
  await proxy.deployed();
  console.log("dAppProxyModule deployed at:", proxy.address);

  // 6) Deploy TokenBurner
  const TokenBurner = await hre.ethers.getContractFactory("TokenBurner");
  const burner = await TokenBurner.deploy();
  await burner.deployed();
  console.log("TokenBurner deployed at:", burner.address);

  // 7) Deploy ZKValidator
  const ZKValidator = await hre.ethers.getContractFactory("ZKValidator");
  const zk = await ZKValidator.deploy();
  await zk.deployed();
  console.log("ZKValidator deployed at:", zk.address);

  console.log("\nAll contracts deployed successfully!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});