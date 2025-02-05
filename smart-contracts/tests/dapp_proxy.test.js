const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("dAppProxyModule", function () {
  let proxy, manager, token;
  let owner, performer;

  before(async function () {
    [owner, performer] = await ethers.getSigners();

    // Развернём токен, используя ethers.parseEther вместо ethers.utils.parseEther
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    token = await MockERC20.deploy("EXE", "EXE", ethers.parseEther("1000000"));

    // Развернём TaskManager
    const TaskManager = await ethers.getContractFactory("EXETaskManager");
    manager = await TaskManager.deploy(token.target); // token.target (в ethers v6 это адрес контракта)
    
    // Развернём прокси-модуль
    const ProxyModule = await ethers.getContractFactory("dAppProxyModule");
    proxy = await ProxyModule.deploy();
  });

  it("should call createTask via proxy", async function () {
    // Проверяем событие ProxyCall (логика оплаты пропущена)
    const tx = await proxy.proxyCreateTask(
      manager.target,
      performer.address,
      ethers.parseEther("500"),
      "<taskXYZ> <hasStatus> <Created>"
    );
    const rcpt = await tx.wait();

    const evt = rcpt.events.find(e => e.event === "ProxyCall");
    expect(evt).to.not.be.undefined;
    expect(evt.args.dapp).to.equal(owner.address);
    expect(evt.args.target).to.equal(manager.target);
  });
});
