const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EXETaskManager", function () {
  let taskManager, token, owner, performer;

  before(async function() {
    [owner, performer] = await ethers.getSigners();

    // Развернём MockERC20
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    token = await MockERC20.deploy("Token", "TKN", ethers.parseEther("1000000"));

    // Развернём TaskManager
    const TaskManager = await ethers.getContractFactory("EXETaskManager");
    taskManager = await TaskManager.deploy(token.target);
  });

  it("should create and emit TaskCreated", async function() {
    const tx = await taskManager.connect(owner).createTask(
      performer.address,
      ethers.parseEther("100"),
      "<task1> <hasStatus> <Created>"
    );
    const rcpt = await tx.wait();

    const event = rcpt.events.find(e => e.event === "TaskCreated");
    expect(event).to.not.be.undefined;
    expect(event.args.taskId).to.equal(1);
  });

  it("should complete task and transfer tokens", async function() {
    // Approval для перевода токенов
    await token.connect(owner).approve(
      taskManager.target,
      ethers.parseEther("1000000")
    );

    // Performer завершает задачу №1
    const tx2 = await taskManager.connect(performer).completeTask(
      1,
      "<task1> <hasStatus> <Completed>"
    );
    const rcpt2 = await tx2.wait();

    const evt = rcpt2.events.find(e => e.event === "TaskCompleted");
    expect(evt).to.not.be.undefined;

    // Проверяем баланс performer
    const bal = await token.balanceOf(performer.address);
    expect(bal.toString()).to.equal(ethers.parseEther("100").toString());
  });
});
