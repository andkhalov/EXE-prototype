const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ZKValidator", function () {
  let zk;
  let owner;

  before(async function () {
    [owner] = await ethers.getSigners();

    // Deploy the ZKValidator contract.
    const ZKValidator = await ethers.getContractFactory("ZKValidator");
    zk = await ZKValidator.deploy();
  });

  it("should validate a proof stub", async function () {
    // Create a dummy proof (32 random bytes).
    const dummyProof = ethers.randomBytes(32);

    // Call validateProof with the dummy proof.
    const tx = await zk.connect(owner).validateProof(dummyProof);
    const receipt = await tx.wait();

    // Decode logs using the zk interface.
    const events = receipt.logs
      .map((log) => {
        try {
          return zk.interface.parseLog(log);
        } catch (e) {
          return null;
        }
      })
      .filter((e) => e !== null);

    // Find the ProofValidated event.
    const proofValidatedEvent = events.find((e) => e.name === "ProofValidated");
    expect(proofValidatedEvent).to.not.be.undefined;
    expect(proofValidatedEvent.args.agent).to.equal(owner.address);
    expect(proofValidatedEvent.args.success).to.equal(true);
    expect(proofValidatedEvent.args.details).to.equal("ZK proof stub validated");
  });
});
