import { ethers } from "ethers";

export function buildDryRunTransaction({ to, value, note = "simulated transaction" }) {
  const parsedTo = to || "0x2222222222222222222222222222222222222222";
  const parsedValue = value || "0.1";

  const payload = {
    to: parsedTo,
    value: ethers.parseEther(parsedValue).toString(),
    valueEth: parsedValue,
    note,
    wouldBroadcast: false,
    dryRun: true,
    mode: "simulation",
  };

  console.log("[DRY_RUN] Transaction preview created without broadcasting.");
  console.log(JSON.stringify(payload, null, 2));

  return payload;
}
