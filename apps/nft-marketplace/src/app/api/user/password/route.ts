import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from '@portfolio/nft-marketplace-database';
import { requireUserId } from '../../../../lib/session';
import { setAuthCookies, createSession, getClientMeta } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
	const userId = await requireUserId(req);
	if (typeof userId !== 'string') return userId;

	const { currentPassword, newPassword } = await req.json();

	if (typeof newPassword !== 'string' || newPassword.length < 8)
		return NextResponse.json(
			{ error: 'New password must be at least 8 characters long' },
			{ status: 400 }
		);
	
	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (!user || !await bcrypt.compare(currentPassword, user.passwordhash))
		return NextResponse.json(
			{ error: 'Current password is incorrect' },
			{ status: 400 }
		);
	
	await prisma.user.update({
		where: { id: userId },
		data: { passwordhash: await bcrypt.hash(newPassword, 12) }
	});

	await prisma.refreshToken.deleteMany({ where: { userId } });
	const res = NextResponse.json({ ok: true });

	setAuthCookies(res, await createSession(userId, getClientMeta(req)));

	return res;
}