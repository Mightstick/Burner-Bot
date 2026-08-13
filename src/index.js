import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { ethers } from "ethers";
import { config } from "./config.js";
import { createMonitor } from "./monitor.js";
import { buildDryRunTransaction } from "./transaction-simulator.js";
import "log-timestamp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

const monitor = createMonitor();

app.get("/health", async (_req, res) => {
  try {
    const network = await monitor.getNetworkInfo();
    const blockNumber = await monitor.getBlockNumber();

    res.json({
      ok: true,
      dryRun: config.dryRun,
      rpcConfigured: Boolean(config.rpcUrl),
      network,
      blockNumber,
      rpcUrl: config.rpcUrl || "not configured",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      dryRun: config.dryRun,
      error: error.message,
    });
  }
});

app.get("/wallet", async (req, res) => {
  const address = req.query.address || config.watchWalletAddress;

  if (!ethers.isAddress(address)) {
    return res.status(400).json({
      ok: false,
      error: "Invalid Ethereum address",
    });
  }

  try {
    const walletData = await monitor.getBalance(address);
    res.json({ ok: true, wallet: walletData, dryRun: config.dryRun });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.post("/simulate", (req, res) => {
  const { to, value, note } = req.body || {};
  const payload = buildDryRunTransaction({ to, value, note });

  res.json({
    ok: true,
    dryRun: true,
    wouldBroadcast: false,
    transaction: payload,
    message: "Transaction preview created; no network broadcast was performed.",
  });
});

app.get("/api", (_req, res) => {
  res.json({
    name: "Wallet Monitor Service",
    status: "running",
    dryRun: config.dryRun,
    rpcConfigured: Boolean(config.rpcUrl),
    watchWallet: config.watchWalletAddress,
  });
});

async function bootstrap() {
  console.log(`Dry run mode: ${config.dryRun}`);
  console.log(`RPC configured: ${Boolean(config.rpcUrl)}`);
  console.log(`Mock wallet: ${config.watchWalletAddress}`);

  if (config.dryRun) {
    console.log("[SAFE MODE] No private key required. No transaction will be broadcast.");
  }

  app.listen(config.port, () => {
    console.log(`Wallet monitor running on http://localhost:${config.port}`);
  });
}

bootstrap();
