import jwt from 'jsonwebtoken';
import { prisma } from "@portfolio/nft-marketplace-database";
import { NextRequest, NextResponse } from 'next/server';

if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
	throw new Error('ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET must be set');
}

export function getClientMeta(req: NextRequest) {
	const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
		?? req.headers.get('x-real-ip') ?? null;

	const userAgent = req.headers.get('user-agent') ?? null;

	return { ip, userAgent }
}

export async function createSession(userId: string, meta?: { ip: string | null; userAgent: string | null }) {
	const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
	const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

	await prisma.refreshToken.upsert({
		where: { userId },
		update: { token: refreshToken, expiresAt, ...meta },
		create: { token: refreshToken, expiresAt, userId, ...meta },
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