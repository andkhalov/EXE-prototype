const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenBurner", function () {
  let burner, token, owner;

  before(async function() {
    [owner] = await ethers.getSigners();

    // Развернём TokenBurner
    const TokenBurner = await ethers.getContractFactory("TokenBurner");
    burner = await TokenBurner.deploy();

    // Развернём MockERC20
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    token = await MockERC20.deploy("BurnTest", "BRT", ethers.parseEther("1000"));
  });

  it("should burn tokens by sending to 0xdead", async function() {
    // Approval для TokenBurner
    await token.approve(burner.target, ethers.parseEther("1000"));

    // Вызываем burnTokens
    const tx = await burner.burnTokens(token.target, ethers.parseEther("100"));
    const rcpt = await tx.wait();

    const evt = rcpt.events.find(e => e.event === "TokensBurned");
    expect(evt).to.not.be.undefined;
    expect(evt.args.amount.toString()).to.equal(ethers.parseEther("100").toString());

    const newBal = await token.balanceOf(owner.address);
    expect(newBal.toString()).to.equal(ethers.parseEther("900").toString());
  });
});
