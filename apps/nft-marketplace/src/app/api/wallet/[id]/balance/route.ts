import { prisma } from "@portfolio/nft-marketplace-database";
import { type NextRequest, NextResponse } from "next/server";
import type { SupportedNetwork } from "@portfolio/nft-marketplace-types";

import { requireUserId, UnauthorizedError } from "../../../../../lib/session";
import { refreshBalance } from "../../../../../lib/chain";

type Context = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: Context) {
	let userId: string;
	try {
		userId = requireUserId(req);
	} catch (err) {
		if (err instanceof UnauthorizedError) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		throw err;
	}

	const { id } = await params;

	const wallet = await prisma.wallet.findUnique({
		where: { id },
		select: {
			id: true,
			userId: true,
			address: true,
			network: true,
			balanceCache: true,
			balanceUpdateAt: true,
		},
	});

	if (!wallet || wallet.userId !== userId) {
		return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
	}

	try {
		const { balance, refreshed } = await refreshBalance({
			...wallet,
			network: wallet.network as SupportedNetwork,
		});

		return NextResponse.json({ balance, refreshed });
	} catch (err) {
		console.error('[balance] update failed', wallet.network, err);

		return NextResponse.json({
			balance: wallet.balanceCache.toString(),
			refreshed: false,
			stale: true,
		});
	}
}
