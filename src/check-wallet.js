import { ethers } from "ethers";
import { config } from "./config.js";

const provider = new ethers.JsonRpcProvider(config.rpcUrl);

const address = process.argv[2] || config.watchWallet;

if (!ethers.isAddress(address)) {
  console.error("Please provide a valid wallet address.");
  process.exit(1);
}

const main = async () => {
  const balance = await provider.getBalance(address);
  console.log(`Address: ${address}`);
  console.log(`Balance: ${ethers.formatEther(balance)} ETH`);
  console.log(`Balance (wei): ${balance.toString()}`);
  process.exit(0);
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
