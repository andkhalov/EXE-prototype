const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AgentController", function () {
  let AgentController, agentCtrl;
  let owner, bob;

  before(async () => {
    [owner, bob] = await ethers.getSigners();
    AgentController = await ethers.getContractFactory("AgentController");
    agentCtrl = await AgentController.deploy();
    await agentCtrl.deployed();
  });

  it("should register agent with role", async () => {
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
