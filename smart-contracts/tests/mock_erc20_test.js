const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MockERC20", function () {
  let token, owner, alice;

  before(async function () {
    [owner, alice] = await ethers.getSigners();

    const MockERC20 = await ethers.getContractFactory("MockERC20");
    token = await MockERC20.deploy("EXEtest", "EXET", ethers.parseEther("1000000"));
  });

  it("should have correct initial supply", async function () {
    const total = await token.totalSupply();
    expect(total.toString()).to.equal(ethers.parseEther("1000000").toString());
  });

  it("should transfer to alice", async function () {
    const tx = await token.transfer(alice.address, ethers.parseEther("100"));
    await tx.wait();

    const bal = await token.balanceOf(alice.address);
    expect(bal.toString()).to.equal(ethers.parseEther("100").toString());
  });
});
