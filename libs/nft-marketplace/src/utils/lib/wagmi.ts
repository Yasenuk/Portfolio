import { http, createConfig } from 'wagmi';
import { mainnet, polygon, bsc } from 'wagmi/chains';
import { metaMask, coinbaseWallet, walletConnect } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
	chains: [mainnet, polygon, bsc],
	connectors: [
		metaMask(),
		coinbaseWallet({ appName: 'NFT Marketplace' }),
		walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID! })
	],
	ssr: true,
	transports: {
		[mainnet.id]: http(),
		[polygon.id]: http(),
		[bsc.id]: http(),
	}
});