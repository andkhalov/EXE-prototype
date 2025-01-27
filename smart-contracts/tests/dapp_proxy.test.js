const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("dAppProxyModule", () => {
  let proxy, manager, token;
  let owner, performer;

  before(async () => {
    [owner, performer] = await ethers.getSigners();

    // Deploy token
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    token = await MockERC20.deploy("EXE", "EXE", ethers.utils.parseEther("1000000"));
    await token.deployed();

    // Deploy manager
    const TaskManager = await ethers.getContractFactory("EXETaskManager");
    manager = await TaskManager.deploy(token.address);
    await manager.deployed();

    // Deploy proxy
    const ProxyModule = await ethers.getContractFactory("dAppProxyModule");
    proxy = await ProxyModule.deploy();
    await proxy.deployed();
  });

  it("should call createTask via proxy", async () => {
    // We skip the payment part, just check the event
    const tx = await proxy.proxyCreateTask(
      manager.address,
      performer.address,
      ethers.utils.parseEther("500"),
      "<taskXYZ> <hasStatus> <Created>"
    );
    const rcpt = await tx.wait();
    const evt = rcpt.events.find(e => e.event === "ProxyCall");
    expect(evt).to.not.be.undefined;
    expect(evt.args.dapp).to.equal(owner.address);
    expect(evt.args.target).to.equal(manager.address);
  });
});
