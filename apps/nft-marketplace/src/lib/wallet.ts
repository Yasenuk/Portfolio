import { parseSiweMessage, verifySiweMessage } from 'viem/siwe';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

const DOMAIN = new URL(process.env.NEXT_PUBLIC_APP_URL!).host;

const verifier = createPublicClient({
	chain: mainnet,
	transport: http(process.env.RPC_MAINNET),
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
