const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GraphSync", function () {
  let graphSync;

  before(async function() {
    const GraphSync = await ethers.getContractFactory("GraphSync");
    graphSync = await GraphSync.deploy();
  });

  it("should emit LogRDF", async function() {
    const tx = await graphSync.recordRDF(
      "<task123>",
      "<exe:hasStatus>",
      "<exe:Created>"
    );
    const rcpt = await tx.wait();

    const evt = rcpt.events.find(e => e.event === "LogRDF");
    expect(evt).to.not.be.undefined;
    expect(evt.args.subject).to.equal("<task123>");
    expect(evt.args.predicate).to.equal("<exe:hasStatus>");
    expect(evt.args.obj).to.equal("<exe:Created>");
  });
});
