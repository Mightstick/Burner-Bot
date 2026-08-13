export function formatBalance(weiValue) {
  return Number(weiValue) / 1e18;
}

export function isValidAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
