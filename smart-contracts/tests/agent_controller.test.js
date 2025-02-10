// agent_controller.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AgentController", function () {
  let agentCtrl;
  let owner, bob;

  before(async function () {
    [owner, bob] = await ethers.getSigners();
    // Deploy AgentController (no need for deployed() in ethers v6)
    const AgentController = await ethers.getContractFactory("AgentController");
    agentCtrl = await AgentController.deploy();
  });

  it("should register agent with role", async function () {
    // Call registerAgent as bob
    const tx = await agentCtrl.connect(bob).registerAgent("Validator");
    const rcpt = await tx.wait();

    // Parse raw logs using the contract interface
    const events = rcpt.logs
      .map((log) => {
        try {
          return agentCtrl.interface.parseLog(log);
        } catch (e) {
          return null;
        }
      })
      .filter((e) => e !== null);

    // Find the AgentRegistered event
    const ev = events.find(e => e.name === "AgentRegistered");
    expect(ev).to.not.be.undefined;
    expect(ev.args.agent).to.equal(bob.address);
    expect(ev.args.role).to.equal("Validator");

    // Verify that the agent's role is stored correctly
    const role = await agentCtrl.getRole(bob.address);
    expect(role).to.equal("Validator");
  });
});