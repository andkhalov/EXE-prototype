const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenBurner", function () {
  let burner, token;
  let owner;

  before(async function () {
    [owner] = await ethers.getSigners();

    // Deploy the TokenBurner contract.
    const TokenBurner = await ethers.getContractFactory("TokenBurner");
    burner = await TokenBurner.deploy();

    // Deploy a MockERC20 token.
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    token = await MockERC20.deploy("BurnTest", "BRT", ethers.parseEther("1000"));
  });

  it("should burn tokens by sending to 0xdead", async function () {
    // Approve TokenBurner to spend tokens from the owner's account.
    await token.approve(burner.target, ethers.parseEther("1000"));

    // Call burnTokens to burn 100 tokens.
    const tx = await burner.burnTokens(token.target, ethers.parseEther("100"));
    const receipt = await tx.wait();

    // Decode logs using the TokenBurner interface.
    const events = receipt.logs
      .map((log) => {
        try {
          return burner.interface.parseLog(log);
        } catch (e) {
          return null;
        }
      })
      .filter((e) => e !== null);

    // Find the TokensBurned event.
    const tokensBurnedEvent = events.find((e) => e.name === "TokensBurned");
    expect(tokensBurnedEvent).to.not.be.undefined;
    expect(tokensBurnedEvent.args.amount.toString()).to.equal(ethers.parseEther("100").toString());

    // Verify that the owner's token balance has decreased by 100 tokens.
    const ownerBalance = await token.balanceOf(owner.address);
    expect(ownerBalance.toString()).to.equal(ethers.parseEther("900").toString());
  });
});
