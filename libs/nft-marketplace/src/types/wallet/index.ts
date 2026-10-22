export const SUPPORTED_NETWORKS = ['ethereum', 'polygon', 'bnb'] as const;
export type SupportedNetwork = typeof SUPPORTED_NETWORKS[number];

export const WALLET_PROVIDERS = ['metamask', 'coinbase', 'walletconnect'] as const;
export type WalletProviderName = typeof WALLET_PROVIDERS[number];

export const NETWORK_BY_CHAIN: Record<number, SupportedNetwork | undefined> = {
	1: 'ethereum',
	137: 'polygon',
	56: 'bnb',
};

export const isWalletProvider = (value: unknown): value is WalletProviderName =>
	typeof value === 'string' && (WALLET_PROVIDERS as readonly string[]).includes(value);

export type Wallet = {
	id: string;
	address: string;
	network: string;
	provider: string;
	isPrimary: boolean;
	balanceCache: string;
	balanceUpdateAt: Date | null;
	connectedAt: Date;
};