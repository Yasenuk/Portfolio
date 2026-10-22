import { prisma } from "@portfolio/nft-marketplace-database";
import { type NextRequest, NextResponse } from "next/server";

import { requireSession, UnauthorizedError } from "../../../../lib/session";

export async function DELETE(req: NextRequest) {
	let session;
	try {
		session = requireSession(req);
	} catch (err) {
		if (err instanceof UnauthorizedError) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		throw err;
	}

	const { count } = await prisma.refreshToken.deleteMany({
		where: { userId: session.userId, id: { not: session.jti } },
	});

	return NextResponse.json({ ok: true, revoked: count });
}
