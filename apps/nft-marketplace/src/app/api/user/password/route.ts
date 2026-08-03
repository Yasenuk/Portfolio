import bcrypt from 'bcrypt';

import { NextResponse, type NextRequest } from "next/server";

import { prisma } from '@portfolio/nft-marketplace-database';

import { requireUserId } from '../../../../lib/session';
import { setAuthCookies, createSession, getClientMeta } from '../../../../lib/auth';
import { changePasswordSchema, parseBody, RateLimit } from '@portfolio/nft-marketplace-utils';

export async function POST(req: NextRequest) {
	const userId = requireUserId(req);
	if (typeof userId !== 'string') return userId;

	const rateLimit = await RateLimit('pwd:' + userId, 5, 3600_000);
	if (!rateLimit.ok) {
		return NextResponse.json(
			{ error: 'Too many password change attempts. Please try again later.' },
			{ status: 429, headers: { 'Retry-After': rateLimit.retryAfter?.toString() ?? '' } }
		);
	}

	await parseBody(req, changePasswordSchema);

	const { currentPassword, newPassword } = await req.json();
	
	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (!user || !await bcrypt.compare(currentPassword, user.passwordhash))
		return NextResponse.json(
			{ error: 'Current password is incorrect' },
			{ status: 401 }
		);

	if (user.twoFactorEnabled) {
		return NextResponse.json(
			{ error: 'Two-factor authentication is required but not yet supported.' },
			{ status: 403 }
		);
	}

	if (currentPassword === newPassword) {
		return NextResponse.json(
			{ error: 'New password must be different from the current password' },
			{ status: 400 }
		);
	}

	await prisma.$transaction(async (tx) => {
		await tx.user.update({
			where: { id: userId },
			data: { passwordhash: await bcrypt.hash(newPassword, 12) }
		});

		await tx.refreshToken.deleteMany({ where: { userId } });
		await tx.emailChangeRequest.deleteMany({ where: { userId } });
	});

	const res = NextResponse.json({ ok: true });

	setAuthCookies(res, await createSession(userId, getClientMeta(req)));

	return res;
}