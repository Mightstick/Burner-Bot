import "dotenv/config";

export const config = {
  port: Number(process.env.PORT || 3000),
  dryRun: String(process.env.DRY_RUN || "true").toLowerCase() === "true",
  rpcUrl: process.env.NETWORK_RPC_URL || "",
  watchWalletAddress:
    process.env.WATCH_WALLET_ADDRESS || "0x1111111111111111111111111111111111111111",
  mockBalanceEth: Number(process.env.MOCK_BALANCE_ETH || 1.5),
};
