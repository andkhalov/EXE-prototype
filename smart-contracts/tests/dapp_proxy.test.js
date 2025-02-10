// dapp_proxy.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("dAppProxyModule", function () {
  let proxy, manager, token;
  let owner, performer;

  before(async function () {
    [owner, performer] = await ethers.getSigners();

    // Deploy MockERC20 token
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    token = await MockERC20.deploy("EXE", "EXE", ethers.parseEther("1000000"));

    // Deploy EXETaskManager with the token address (use .target for contract address in ethers v6)
    const TaskManager = await ethers.getContractFactory("EXETaskManager");
    manager = await TaskManager.deploy(token.target);

    // Deploy dAppProxyModule
    const ProxyModule = await ethers.getContractFactory("dAppProxyModule");
    proxy = await ProxyModule.deploy();
  });

  it("should call createTask via proxy", async function () {
    // Call proxyCreateTask which should forward the call to TaskManager
    const tx = await proxy.proxyCreateTask(
      manager.target,
      performer.address,
      ethers.parseEther("500"),
      "<taskXYZ> <hasStatus> <Created>"
    );
    const rcpt = await tx.wait();

    // Parse raw logs using the proxy contract interface
    const events = rcpt.logs
      .map((log) => {
        try {
          return proxy.interface.parseLog(log);
        } catch (e) {
          return null;
        }
      })
      .filter((e) => e !== null);

    // Find the ProxyCall event
    const evt = events.find(e => e.name === "ProxyCall");
    expect(evt).to.not.be.undefined;
    expect(evt.args.dapp).to.equal(owner.address);
    expect(evt.args.target).to.equal(manager.target);
  });
});