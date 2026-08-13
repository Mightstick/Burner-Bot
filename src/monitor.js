import pkg from "ethers";
const { providers, formatEther } = pkg;
import { config } from "./config.js";
import { getMockWalletState } from "./mock-wallet.js";

export class WalletMonitor {
  constructor(rpcUrl = "") {
    this.rpcUrl = rpcUrl;
    this.provider = rpcUrl ? new providers.JsonRpcProvider(rpcUrl) : null;
  }

  async getNetworkInfo() {
    if (!this.provider) {
      return {
        chainId: 0,
        name: "mock-local",
        rpcConnected: false,
      };
    }

    const network = await this.provider.getNetwork();
    return {
      chainId: Number(network.chainId),
      name: network.name,
      rpcConnected: true,
    };
  }

  async getBalance(address) {
    if (!this.provider) {
      const mock = getMockWalletState();
      return {
        address: address || mock.address,
        balanceWei: mock.balanceWei,
        balanceEth: String(mock.balanceEth),
        source: "mock",
      };
    }

    const balance = await this.provider.getBalance(address);
    return {
      address,
      balanceWei: balance.toString(),
      balanceEth: formatEther(balance),
      source: "rpc",
    };
  }

  async getBlockNumber() {
    if (!this.provider) {
      return 0;
    }

    return Number(await this.provider.getBlockNumber());
  }
}

export function createMonitor() {
  return new WalletMonitor(config.rpcUrl);
}
