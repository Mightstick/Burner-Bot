import { ethers } from "ethers";

export class WalletMonitor {
  constructor(rpcUrl) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
  }

  async getNetworkInfo() {
    const network = await this.provider.getNetwork();
    return {
      chainId: Number(network.chainId),
      name: network.name,
    };
  }

  async getBalance(address) {
    const balance = await this.provider.getBalance(address);
    return {
      address,
      balanceWei: balance.toString(),
      balanceEth: ethers.formatEther(balance),
    };
  }

  async getBlockNumber() {
    return Number(await this.provider.getBlockNumber());
  }
}
