import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { prisma } from "@portfolio/nft-marketplace-database";
import type { SessionPayload, SessionMeta  } from "@portfolio/nft-marketplace-types";
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

const ACCESS_TTL_S = 15 * 60;
const REFRESH_TTL_S = 7 * 24 * 60 * 60;
const MAX_SESSIONS = 10;

export const hashToken = (token: string) =>
	crypto.createHash('sha256').update(token).digest('hex');

function signPair(userId: string, jti: string) {
  const payload: SessionPayload = { userId, jti };
  return {
    accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: ACCESS_TTL_S }),
    refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: REFRESH_TTL_S }),
  };
}

export async function createSession(userId: string, meta?: SessionMeta) {
	const jti = crypto.randomUUID();
	const { accessToken, refreshToken } = signPair(userId, jti);

	await prisma.refreshToken.create({
		data: {
			id: jti,
			userId,
			tokenHash: hashToken(refreshToken),
			expiresAt: new Date(Date.now() + REFRESH_TTL_S * 1000),
			lastUsedAt: new Date(),
			...meta
		}
	});

	await pruneSessions(userId);

	return { accessToken, refreshToken };
}

async function pruneSessions(userId: string) {
	await prisma.refreshToken.deleteMany({
		where: { userId, expiresAt: { lt: new Date() } },
	});

	const stale = await prisma.refreshToken.findMany({
		where: { userId },
		orderBy: { lastUsedAt: 'desc' },
		skip: MAX_SESSIONS,
		select: { id: true }
	});

	if (stale.length) {
		await prisma.refreshToken.deleteMany({
			where: { id: { in: stale.map(s => s.id) } }
		});
	}
}

export async function rotateSession(oldToken: string, meta?: SessionMeta) {
	let payload: SessionPayload;
	try {
		payload = jwt.verify(oldToken, process.env.REFRESH_TOKEN_SECRET!) as SessionPayload;
	} catch {
		return null;
	}

	const { userId, jti } = payload;
	const next = signPair(userId, jti);

	const { count } = await prisma.refreshToken.updateMany({
		where: {
			id: jti,
			tokenHash: hashToken(oldToken),
			expiresAt: { gt: new Date() }
		},
		data: {
			tokenHash: hashToken(next.refreshToken),
			expiresAt: new Date(Date.now() + REFRESH_TTL_S * 1000),
			lastUsedAt: new Date(),
			...meta
		}
	});

	if (count === 0) {
		await prisma.refreshToken.deleteMany({ where: { id: jti } });
		return null;
	}

	return next;
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