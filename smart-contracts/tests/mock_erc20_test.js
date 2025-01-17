const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MockERC20", function () {
  let token, owner, alice;

  before(async () => {
    [owner, alice] = await ethers.getSigners();
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    token = await MockERC20.deploy("EXEtest", "EXET", ethers.utils.parseEther("1000000"));
    await token.deployed();
  });

  it("should have correct initial supply", async () => {
    const total = await token.totalSupply();
    expect(total.toString()).to.equal(ethers.utils.parseEther("1000000").toString());
  });

  it("should transfer to alice", async () => {
    await token.transfer(alice.address, ethers.utils.parseEther("100"));
    const bal = await token.balanceOf(alice.address);
    expect(bal.toString()).to.equal(ethers.utils.parseEther("100").toString());
  });
});
