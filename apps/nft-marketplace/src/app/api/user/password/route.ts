import bcrypt from 'bcrypt';

import { after, NextResponse, type NextRequest } from "next/server";

import { prisma } from '@portfolio/nft-marketplace-database';

import { requireUserId, UnauthorizedError } from '../../../../lib/session';
import { setAuthCookies, createSession, getClientMeta } from '../../../../lib/auth';
import { changePasswordSchema, parseBody, RateLimit } from '@portfolio/nft-marketplace-utils';
import { sendPasswordChanged } from '../../../../lib/mail';

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

	const rateLimit = await RateLimit('pwd:' + userId, 5, 3600_000);
	if (!rateLimit.ok) {
		const retryAfter = Math.ceil((+rateLimit.retryAfter! - Date.now()) / 1000);
    return NextResponse.json(
      { error: 'Too many attempts. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    );
	}

	const body = await parseBody(req, changePasswordSchema);
		if ('error' in body) return NextResponse.json({ error: body.error }, { status: 400 });

	const { currentPassword, newPassword } = body.data;
	
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			email: true,
			passwordhash: true,
			twoFactorEnabled: true
		}
	});

	if (!user || !await bcrypt.compare(currentPassword, user.passwordhash))
		return NextResponse.json(
			{ error: 'Current password is incorrect' },
			{ status: 401 }
		);

	if (user.twoFactorEnabled) {
		return NextResponse.json(
			{ error: 'Two-factor authentication is required but not yet supported' },
			{ status: 403 }
		);
	}

	if (currentPassword === newPassword) {
		return NextResponse.json(
			{ error: 'New password must be different from the current password' },
			{ status: 400 }
		);
	}

	await prisma.$transaction([
		prisma.user.update({
			where: { id: userId },
			data: { passwordhash: await bcrypt.hash(newPassword, 12) }
		}),
		prisma.refreshToken.deleteMany({ where: { userId } }),
		prisma.emailChangeRequest.deleteMany({ where: { userId } }),
	]);

	const res = NextResponse.json({ ok: true });
	setAuthCookies(res, await createSession(userId, getClientMeta(req)));

	after(async () => {
		try {
			await sendPasswordChanged(user.email);
		} catch (err) {
			console.error('[password] notification failed', err);
		}
	})

	return res;
}