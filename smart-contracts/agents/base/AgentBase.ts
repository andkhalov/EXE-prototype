import {
  JsonRpcProvider,
  Wallet,
  Contract,
  formatEther,
} from "ethers";

// We assume your project uses a localConfig in config.js
import localConfig from "../../../config.js"; 

// Path to your artifact JSON
import abiTaskManager from "../../artifacts/smart-contracts/contracts/EXETaskManager.sol/EXETaskManager.json";

// If the above import complains about "Cannot find module",
// make sure the path is correct. Possibly use ../../../artifacts/... 
// depending on real folder layout.

export class AgentBase {
  protected provider: JsonRpcProvider;
  public signer: Wallet;
  protected taskManager: Contract;

  constructor(privateKey: string) {
    // Ethers v6: new JsonRpcProvider(...)
    this.provider = new JsonRpcProvider(localConfig.local.rpcUrl);

    // Ethers v6: new Wallet(...)
    this.signer = new Wallet(privateKey, this.provider);

    // Address from config
    const taskAddress = localConfig.local.contracts.EXETaskManager;

    // Create a Contract object using the artifact's ABI + address + signer
    this.taskManager = new Contract(taskAddress, abiTaskManager.abi, this.signer);
  }

  /**
   * Example: Return the token balance of this agent's address
   */
  async getBalance(tokenAddress: string): Promise<string> {
    const abiToken = [
      "function balanceOf(address) view returns (uint256)"
    ];
    // Ethers v6: new Contract(...)
    const token = new Contract(tokenAddress, abiToken, this.signer);
    const bal = await token.balanceOf(this.signer.address);
    // With v6, use formatEther(...) from 'ethers'
    return formatEther(bal);
  }

  /**
   * Example helper: get agent's address
   */
  getAddress(): string {
    return this.signer.address;
  }
}
