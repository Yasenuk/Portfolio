import { after, type NextRequest, NextResponse } from "next/server";
import { prisma } from "@portfolio/nft-marketplace-database";

import { sendEmailVerification } from "../../../../../lib/mail";
import { RateLimit } from "../../../../../lib/rate-limit";
import { requireUserId, UnauthorizedError } from "../../../../../lib/session";
import { createEmailRequest, VERIFY_TTL_MS } from "../../../../../lib/email-verification";

export async function POST(req: NextRequest) {
	let userId: string;
	try {
		userId = requireUserId(req);
	} catch (err) {
		if (err instanceof UnauthorizedError) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		throw err;
	}

	const rateLimit = await RateLimit('verify:' + userId, 3, 3600_000);
	if (!rateLimit.ok) {
		const retryAfter = Math.ceil((+rateLimit.retryAfter! - Date.now()) / 1000);
		return NextResponse.json(
			{ error: 'Too many attempts. Try again later.' },
			{ status: 429, headers: { 'Retry-After': String(retryAfter) } },
		);
	}

	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { id: true, email: true, emailVerified: true }
	});

	if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	if (user.emailVerified) {
		return NextResponse.json({ error: 'Already verified' }, { status: 409 });
	}

	const pending = await prisma.emailChangeRequest.findFirst({
		where: { userId, expiresAt: { gt: new Date() } },
		select: { newEmail: true }
	});

	if (pending && pending.newEmail !== user.email) {
		return NextResponse.json(
			{ error: 'Finish or cancel the pending email change first' },
			{ status: 409 }
		);
	}

	const token = await createEmailRequest(userId, user.email, VERIFY_TTL_MS);

	after(async () => {
		try {
			await sendEmailVerification(user.email, token);
		} catch (err) {
			console.error('[verify] delivery failed', err);
		}
	});

	return NextResponse.json({ ok: true });
}
