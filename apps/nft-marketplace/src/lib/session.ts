import { prisma } from '@portfolio/nft-marketplace-database';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { type NextRequest } from 'next/server';
import { cache } from "react";
import type { SessionPayload } from '@portfolio/nft-marketplace-types';

export const getSessionUser = cache(async () => {
	const token = (await cookies()).get('access_token')?.value;
	if (!token) return null;

	try {
		const { userId } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { userId: string };
		return await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				username: true,
				email: true,
				createdAt: true,
				emailVerified: true,
				twoFactorEnabled: true,
				profile: {
					select: {
						avatarUrl: true,
						backgroundUrl: true,
						bio: true
					}
				}
			}
		});
	} catch {
		return null;
	}
});

export class UnauthorizedError extends Error { };

export function requireSession(req: NextRequest): SessionPayload {
	const accessToken = req.cookies.get('access_token')?.value;
	if (!accessToken) throw new UnauthorizedError();

	try {
		return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as SessionPayload;
	} catch {
		throw new UnauthorizedError();
	}
}

export function requireUserId(req: NextRequest): string {
	return requireSession(req).userId;
}

export const getCurrentSession = cache(async (): Promise<SessionPayload | null> => {
	const token = (await cookies()).get('access_token')?.value;
	if (!token) return null;

	try {
		return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as SessionPayload;
	} catch {
		return null;
	}
});