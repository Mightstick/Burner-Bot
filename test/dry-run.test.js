import test from "node:test";
import assert from "node:assert/strict";

import { buildDryRunTransaction } from "../src/transaction-simulator.js";
import { getMockWalletState } from "../src/mock-wallet.js";
import { WalletMonitor } from "../src/monitor.js";

test("dry-run transaction preview never broadcasts", () => {
  const result = buildDryRunTransaction({
    to: "0x2222222222222222222222222222222222222222",
    value: "0.1",
    note: "sample preview",
  });

  assert.equal(result.wouldBroadcast, false);
  assert.equal(result.dryRun, true);
  assert.equal(result.valueEth, "0.1");
  assert.ok(result.value.length > 0);
});

test("mock wallet state is available without any private key", () => {
  const wallet = getMockWalletState();

  assert.match(wallet.address, /^0x[0-9a-fA-F]{40}$/);
  assert.equal(wallet.balanceEth, 1.5);
  assert.ok(wallet.balanceWei);
  assert.equal(wallet.balanceWei.length > 0, true);
});

test("monitor can run without a live RPC and still provide mock balance data", async () => {
  const monitor = new WalletMonitor();
  const balance = await monitor.getBalance("0x1111111111111111111111111111111111111111");

  assert.equal(balance.source, "mock");
  assert.equal(balance.balanceEth, "1.5");
  assert.equal(balance.address, "0x1111111111111111111111111111111111111111");
});
