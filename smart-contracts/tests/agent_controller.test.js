const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AgentController", function () {
  let agentCtrl;
  let owner, bob;

  before(async function () {
    [owner, bob] = await ethers.getSigners();

    const AgentController = await ethers.getContractFactory("AgentController");
    // В ethers v6 объект уже развернут – вызов deployed() не нужен.
    agentCtrl = await AgentController.deploy();
  });

  it("should register agent with role", async function () {
    const tx = await agentCtrl.connect(bob).registerAgent("Validator");
    const rcpt = await tx.wait();

    const ev = rcpt.events.find(e => e.event === "AgentRegistered");
    expect(ev).to.not.be.undefined;
    expect(ev.args.agent).to.equal(bob.address);
    expect(ev.args.role).to.equal("Validator");

    const role = await agentCtrl.getRole(bob.address);
    expect(role).to.equal("Validator");
  });
});
