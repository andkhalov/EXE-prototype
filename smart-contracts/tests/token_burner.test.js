const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenBurner", function () {
  let burner, token, owner;

  before(async() => {
    [owner] = await ethers.getSigners();
    const TokenBurner = await ethers.getContractFactory("TokenBurner");
    burner = await TokenBurner.deploy();
    await burner.deployed();

    const MockERC20 = await ethers.getContractFactory("MockERC20");
    token = await MockERC20.deploy("BurnTest", "BRT", ethers.utils.parseEther("1000"));
    await token.deployed();
  });

  it("should burn tokens by sending to 0xdead", async () => {
    // Approve
    await token.approve(burner.address, ethers.utils.parseEther("1000"));
    // Burn
    const tx = await burner.burnTokens(token.address, ethers.utils.parseEther("100"));
    const rcpt = await tx.wait();
    const evt = rcpt.events.find(e => e.event === "TokensBurned");
    expect(evt).to.not.be.undefined;
    expect(evt.args.amount.toString()).to.equal(ethers.utils.parseEther("100").toString());

    const newBal = await token.balanceOf(owner.address);
    expect(newBal.toString()).to.equal(ethers.utils.parseEther("900").toString());
  });
});
