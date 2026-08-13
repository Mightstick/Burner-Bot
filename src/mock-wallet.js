export const mockWallet = {
  address: "0x1111111111111111111111111111111111111111",
  balanceEth: 1.5,
  network: "mock-local",
};

export function getMockWalletState() {
  return {
    ...mockWallet,
    balanceWei: String(Math.floor(mockWallet.balanceEth * 1e18)),
  };
}
