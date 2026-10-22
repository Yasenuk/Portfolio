import { prisma } from '@portfolio/nft-marketplace-database';
import { createPublicClient, http, formatUnits } from 'viem';
import { mainnet, polygon, bsc } from 'viem/chains';

const CLIENTS = {
	ethereum: createPublicClient({ chain: mainnet, transport: http(process.env.RPC_MAINNET) }),
	polygon:  createPublicClient({ chain: polygon, transport: http(process.env.RPC_POLYGON) }),
	bnb:      createPublicClient({ chain: bsc,     transport: http(process.env.RPC_BSC) }),
} as const;

const BALANCE_TTL_MS = 5 * 60 * 1000;

export async function refreshBalance(wallet: { 
	id: string;
	address: string;
	network: string;
	balanceUpdateAt: Date | null
}) {
	if (wallet.balanceUpdateAt && Date.now() - +wallet.balanceUpdateAt < BALANCE_TTL_MS) {
		return null;
	}

	const client = CLIENTS[wallet.network as keyof typeof CLIENTS];
	if (!client) return null;

	const wei = await client.getBalance({ address: wallet.address as `0x${string}` });

	await prisma.wallet.update({
		where: { id: wallet.id },
		data: {
			balanceCache: formatUnits(wei, 18),
			balanceUpdateAt: new Date()
		}
	})
}