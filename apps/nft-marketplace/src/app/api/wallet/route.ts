import { prisma } from "@portfolio/nft-marketplace-database";
import { after, type NextRequest, NextResponse } from "next/server";

import { requireUserId, UnauthorizedError } from "../../../lib/session";
import { refreshBalance } from "../../../lib/chain";

import type { SupportedNetwork } from '@portfolio/nft-marketplace-types';

export async function GET(req: NextRequest) {
	let userId: string;
	try {
		userId = requireUserId(req);
	} catch (err) {
		if (err instanceof UnauthorizedError) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		throw err;
	}

	const wallets = await prisma.wallet.findMany({
		where: { userId },
		orderBy: [{ connectedAt: 'asc' }],
		select: {
			id: true,
			address: true,
			network: true,
			provider: true,
			isPrimary: true,
			balanceCache: true,
			balanceUpdateAt: true,
			connectedAt: true,
		},
	});

	after(async () => {
		const results = await Promise.allSettled(
			wallets.map((w) =>
				refreshBalance({ ...w, network: w.network as SupportedNetwork })
			)
		);

		results.forEach((r, i) => {
			if (r.status === 'rejected') {
				console.error('[balance] refresh failed', wallets[i].network, r.reason);
			}
		});
	});

	return NextResponse.json({
		wallets: wallets.map((w) => ({ ...w, balanceCache: w.balanceCache.toString() })),
	});
}