import jwt from 'jsonwebtoken';
import { prisma } from "@portfolio/nft-marketplace-database";
import { NextResponse } from 'next/server';

export async function createSession(userId: string) {
	const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
	const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

	await prisma.refreshToken.upsert({
		where: { userId },
		update: { token: refreshToken, expiresAt },
		create: { token: refreshToken, expiresAt, userId },
	});

	return { accessToken, refreshToken };
}

export function setAuthCookies(res: NextResponse, tokens: { accessToken: string; refreshToken: string }) {
	const base = {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax' as const,
	};

	res.cookies.set('access_token', tokens.accessToken, { ...base, maxAge: 15 * 60 });
	res.cookies.set('refresh_token', tokens.refreshToken, {
		...base,
		maxAge: 7 * 24 * 60 * 60,
		path: '/api/auth/refresh',
	});
}