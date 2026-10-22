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

	const wallets = await prisma.wallet.findMany({ where: { userId } });

	return NextResponse.json({ wallets });
}