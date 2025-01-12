const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EXETaskManager", function () {
  let TaskManager, taskManager;
  let MockERC20, token;
  let owner, performer;

  before(async () => {
    [owner, performer] = await ethers.getSigners();

    // Deploy token
    MockERC20 = await ethers.getContractFactory("MockERC20");
    token = await MockERC20.deploy("Test Token", "TTK", ethers.utils.parseEther("1000000"));
    await token.deployed();

    // Deploy EXETaskManager
    TaskManager = await ethers.getContractFactory("EXETaskManager");
    taskManager = await TaskManager.deploy(token.address);
    await taskManager.deployed();
  });

  it("should create and emit TaskCreated", async () => {
    const tx = await taskManager.connect(owner).createTask(
      performer.address,
      ethers.utils.parseEther("100"),
      "<task1> <hasStatus> <Created>"
    );
    const rcpt = await tx.wait();
    const event = rcpt.events.find(e => e.event === "TaskCreated");
    expect(event).to.not.be.undefined;
    expect(event.args.taskId).to.equal(1);
  });

  it("should complete task and transfer tokens", async () => {
    // Approve big enough amount
    await token.connect(owner).approve(taskManager.address, ethers.utils.parseEther("1000000"));

    // Performer completes task #1
    const tx2 = await taskManager.connect(performer).completeTask(
      1,
      "<task1> <hasStatus> <Completed>"
    );
    const rcpt2 = await tx2.wait();
    const evt = rcpt2.events.find(e => e.event === "TaskCompleted");
    expect(evt).to.not.be.undefined;

    // Check performer balance
    const bal = await token.balanceOf(performer.address);
    expect(bal.toString()).to.equal(ethers.utils.parseEther("100").toString());
  });
});
