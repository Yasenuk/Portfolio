import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@portfolio/nft-marketplace-database';

export async function POST(req: NextRequest) {
	const refreshToken = req.cookies.get('refresh_token')?.value;
	if (!refreshToken) {
		return NextResponse.json(
			{ error: 'Refresh token not found' },
			{ status: 401 }
		);
	}

	try {
		const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { userId: string };

		const stored = await prisma.refreshToken.findUnique({
			where: {
				token: refreshToken,
				userId: payload.userId,
				expiresAt: { gt: new Date() },
			},
		});
		if (!stored) throw new Error('Invalid token');

		const newRefreshToken = jwt.sign(
			{ userId: payload.userId },
			process.env.REFRESH_TOKEN_SECRET!,
			{ expiresIn: '7d' }
		);

		const res = NextResponse.json({ ok: true });
		res.cookies.set('refresh_token', newRefreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 7 * 24 * 60 * 60,
		});

		return res;
	} catch {
		return NextResponse.json(
			{ error: 'Invalid refresh token' },
			{ status: 401 }
		);
	}
}