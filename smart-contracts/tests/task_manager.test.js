const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EXETaskManager", function () {
  let taskManager, token;
  let owner, performer;

  before(async function () {
    [owner, performer] = await ethers.getSigners();

    // Deploy a MockERC20 token.
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    token = await MockERC20.deploy("Token", "TKN", ethers.parseEther("1000000"));

    // Deploy EXETaskManager with the token address.
    const TaskManager = await ethers.getContractFactory("EXETaskManager");
    taskManager = await TaskManager.deploy(token.target);
  });

  it("should create and emit TaskCreated", async function () {
    // Owner creates a task assigned to performer.
    const tx = await taskManager.connect(owner).createTask(
      performer.address,
      ethers.parseEther("100"),
      "<task1> <hasStatus> <Created>"
    );
    const receipt = await tx.wait();

    // Decode logs using the taskManager interface.
    const events = receipt.logs
      .map((log) => {
        try {
          return taskManager.interface.parseLog(log);
        } catch (e) {
          return null;
        }
      })
      .filter((e) => e !== null);

    // Find the TaskCreated event.
    const taskCreatedEvent = events.find((e) => e.name === "TaskCreated");
    expect(taskCreatedEvent).to.not.be.undefined;
    expect(taskCreatedEvent.args.taskId).to.equal(1);
  });

  it("should complete task and transfer tokens", async function () {
    // Approve token spending for the taskManager from the owner (task creator).
    await token.connect(owner).approve(taskManager.target, ethers.parseEther("1000000"));

    // Performer completes the task.
    const tx = await taskManager.connect(performer).completeTask(
      1,
      "<task1> <hasStatus> <Completed>"
    );
    const receipt = await tx.wait();

    // Decode logs using the taskManager interface.
    const events = receipt.logs
      .map((log) => {
        try {
          return taskManager.interface.parseLog(log);
        } catch (e) {
          return null;
        }
      })
      .filter((e) => e !== null);

    // Find the TaskCompleted event.
    const taskCompletedEvent = events.find((e) => e.name === "TaskCompleted");
    expect(taskCompletedEvent).to.not.be.undefined;

    // Verify that the performer received the tokens.
    const performerBalance = await token.balanceOf(performer.address);
    expect(performerBalance.toString()).to.equal(ethers.parseEther("100").toString());
  });
});
