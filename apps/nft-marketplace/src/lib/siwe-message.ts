import { createSiweMessage } from 'viem/siwe';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;
const DOMAIN = new URL(APP_URL).host;

export const SIWE_STATEMENTS = {
	login: 'Sign in to NFT Marketplace.',
	link: 'Link this wallet to your NFT Marketplace account.',
} as const;

export function buildWalletMessage(params: {
	address: `0x${string}`;
	chainId: number;
	nonce: string;
	statement: string;
}) {
	const now = Date.now();

	return createSiweMessage({
		domain: DOMAIN,
		uri: APP_URL,
		version: '1',
		address: params.address,
		chainId: params.chainId,
		nonce: params.nonce,
		statement: params.statement,
		issuedAt: new Date(now),
		expirationTime: new Date(now + 5 * 60 * 1000),
	});
}
