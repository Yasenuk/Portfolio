import { prisma } from "@portfolio/nft-marketplace-database";
import { type NextRequest, NextResponse } from "next/server";

import { requireSession, UnauthorizedError } from "../../../../../lib/session";

type Context = { params: Promise<{ id: string }> };

export async function DELETE(req: NextRequest, { params }: Context) {
	let session;
	try {
		session = requireSession(req);
	} catch (err) {
		if (err instanceof UnauthorizedError) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		throw err;
	}

	const { id } = await params;

	if (id === session.jti) {
		return NextResponse.json(
			{ error: 'Use sign out to end the current session' },
			{ status: 409 }
		);
	}

	const { count } = await prisma.refreshToken.deleteMany({
		where: { id, userId: session.userId },
	});

	if (count === 0) {
		return NextResponse.json({ error: 'Session not found' }, { status: 404 });
	}

	return NextResponse.json({ ok: true });
}
