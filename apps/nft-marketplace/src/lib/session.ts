import { prisma } from '@portfolio/nft-marketplace-database';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from 'next/server';
import { cache } from "react";

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

export function requireUserId(req: NextRequest): string {
	const accessToken = req.cookies.get('access_token')?.value;
	if (!accessToken) throw new UnauthorizedError();

	try {
		const { userId } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as { userId: string };
		return userId;
	} catch {
		throw new UnauthorizedError();
	}
}