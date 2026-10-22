import { Prisma, prisma } from '@portfolio/nft-marketplace-database';
import { createPublicClient, http, formatUnits } from 'viem';
import { mainnet, polygon, bsc } from 'viem/chains';
import type { SupportedNetwork } from '@portfolio/nft-marketplace-types';

const CLIENTS: Record<SupportedNetwork, ReturnType<typeof createPublicClient>> = {
	ethereum: createPublicClient({ chain: mainnet, transport: http(process.env.RPC_MAINNET) }),
	polygon: createPublicClient({ chain: polygon, transport: http(process.env.RPC_POLYGON) }),
	bnb: createPublicClient({ chain: bsc, transport: http(process.env.RPC_BSC) }),
};

const BALANCE_TTL_MS = 5 * 60 * 1000;

interface CachedWallet {
	id: string;
	address: string;
	network: SupportedNetwork;
	balanceCache: Prisma.Decimal;
	balanceUpdateAt: Date | null;
}

export async function refreshBalance(wallet: CachedWallet) {
	const cached = wallet.balanceCache.toString();

	const isFresh =
		wallet.balanceUpdateAt && Date.now() - +wallet.balanceUpdateAt < BALANCE_TTL_MS;

	if (isFresh) return { balance: cached, refreshed: false };

	const client = CLIENTS[wallet.network];
	if (!client) return { balance: cached, refreshed: false };

	const wei = await client.getBalance({ address: wallet.address as `0x${string}` });
	const balance = formatUnits(wei, 18);

	await prisma.wallet.update({
		where: { id: wallet.id },
		data: { balanceCache: balance, balanceUpdateAt: new Date() },
	});

	return { balance, refreshed: true };
}
