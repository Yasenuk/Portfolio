import { createSiweMessage, parseSiweMessage, verifySiweMessage } from 'viem/siwe';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

const DOMAIN = new URL(process.env.NEXT_PUBLIC_APP_URL!).host;
const URI = process.env.NEXT_PUBLIC_APP_URL!;

export function buildWalletMessage(params: {
	address: `0x${string}`;
	chainId: number;
	nonce: string;
	statment: string;
}) {
	const now = Date.now();

	return createSiweMessage({
		domain: DOMAIN,
		uri: URI,
		version: '1',
		address: params.address,
		chainId: params.chainId,
		nonce: params.nonce,
		statement: params.statment,
		issuedAt: new Date(now),
		expirationTime: new Date(now + 5 * 60 * 1000),
	});
}

const verifier = createPublicClient({
	chain: mainnet,
	transport: http(process.env.RPC_MAINNET)
});

export async function checkSiwe(message: string, signature: `0x${string}`, nonce: string) {
	const valid = await verifySiweMessage(verifier, {
		message,
		signature,
		domain: DOMAIN,
		nonce,
		time: new Date(),
	});

	return valid ? parseSiweMessage(message) : null;
}