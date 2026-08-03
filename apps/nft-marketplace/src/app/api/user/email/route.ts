import bcrypt from 'bcrypt';

import { NextResponse, after, type NextRequest } from "next/server";
import { prisma } from '@portfolio/nft-marketplace-database';

import { requireUserId, UnauthorizedError } from '../../../../lib/session';
import { parseBody, changeEmailSchema } from '@portfolio/nft-marketplace-utils';
import { RateLimit } from '../../../../lib/rate-limit';
import { generateToken } from '../../../../lib/tokens';
import { sendEmailChangeConfirmation, sendEmailChangeRequested, sendEmailTakenWarning } from '../../../../lib/mail';

const TOKEN_TTL_MS = 30 * 60 * 1000;

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

	const rateLimit = await RateLimit('email:' + userId, 5, 3600_000);
	if (!rateLimit.ok) {
		const retryAfter = Math.ceil((+rateLimit.retryAfter! - Date.now()) / 1000);
		return NextResponse.json(
			{ error: 'Too many attempts. Try again later.' },
			{ status: 429, headers: { 'Retry-After': String(retryAfter) } },
		);
	}

	const body = await parseBody(req, changeEmailSchema);
  if ('error' in body) return NextResponse.json({ error: body.error }, { status: 400 });

	const { currentPassword, newEmail } = body.data;

	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			email: true,
			passwordhash: true,
			twoFactorEnabled: true
		}
	});

	if (!user || !(await bcrypt.compare(currentPassword, user.passwordhash))) {
    return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });
  }

	if (user.twoFactorEnabled) {
    return NextResponse.json(
      { error: 'Two-factor authentication is required but not yet supported' },
      { status: 403 },
    );
  }

  if (newEmail === user.email) {
    return NextResponse.json({ error: 'This is already your email address' }, { status: 400 });
  }

	const taken = await prisma.user.findUnique({
    where: { email: newEmail },
    select: { id: true },
  });

	const { token, tokenHash } = generateToken();
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS);

  if (!taken) {
    await prisma.$transaction([
      prisma.emailChangeRequest.deleteMany({ where: { userId } }),
      prisma.emailChangeRequest.create({ data: { userId, newEmail, tokenHash, expiresAt } }),
    ]);
	}
	
	after(async () => {
		try {
			if (taken) {
				await sendEmailTakenWarning(newEmail);
			} else {
				await sendEmailChangeConfirmation(newEmail, token);
				await sendEmailChangeRequested(user.email, newEmail);
			}
		} catch (err) {
      console.error('[email] delivery failed', err);
		}
	});

	return NextResponse.json({ ok: true });
}