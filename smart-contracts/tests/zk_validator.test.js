const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ZKValidator", function () {
  let zk, owner;

  before(async function() {
    [owner] = await ethers.getSigners();

    const ZKValidator = await ethers.getContractFactory("ZKValidator");
    zk = await ZKValidator.deploy();
  });

  it("should validate a proof stub", async function() {
    const dummyProof = ethers.randomBytes(32);
    const tx = await zk.connect(owner).validateProof(dummyProof);
    const rcpt = await tx.wait();

    const evt = rcpt.events.find(e => e.event === "ProofValidated");
    expect(evt).to.not.be.undefined;
    expect(evt.args.agent).to.equal(owner.address);
    expect(evt.args.success).to.equal(true);
  });
});
