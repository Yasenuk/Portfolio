export function buildWalletMessage(address: string, nonce: string) {
	return `Link wallet ${address} to NFT Marketplace.\nNonce: ${nonce}`;
}
