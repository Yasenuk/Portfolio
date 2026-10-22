import { prisma } from "@portfolio/nft-marketplace-database";
import { type NextRequest, NextResponse } from "next/server";
import { requireUserId, UnauthorizedError } from "../../../lib/session";

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
		orderBy: [{ isPrimary: 'desc' }, { connectedAt: 'asc' }],
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

	return NextResponse.json({
		wallets: wallets.map((w) => ({ ...w, balanceCache: w.balanceCache.toString() })),
	});
}