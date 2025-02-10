const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GraphSync", function () {
  let graphSync;

  before(async function () {
    // Deploy the GraphSync contract.
    const GraphSync = await ethers.getContractFactory("GraphSync");
    graphSync = await GraphSync.deploy();
  });

  it("should emit LogRDF", async function () {
    // Call recordRDF with a sample RDF triple.
    const tx = await graphSync.recordRDF("<task123>", "<exe:hasStatus>", "<exe:Created>");
    const receipt = await tx.wait();

    // Decode logs using the GraphSync interface.
    const events = receipt.logs
      .map((log) => {
        try {
          return graphSync.interface.parseLog(log);
        } catch (e) {
          return null;
        }
      })
      .filter((e) => e !== null);

    // Find the LogRDF event.
    const logRDFEvent = events.find((e) => e.name === "LogRDF");
    expect(logRDFEvent).to.not.be.undefined;
    expect(logRDFEvent.args.subject).to.equal("<task123>");
    expect(logRDFEvent.args.predicate).to.equal("<exe:hasStatus>");
    expect(logRDFEvent.args.obj).to.equal("<exe:Created>");
  });
});
