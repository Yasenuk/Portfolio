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

export async function requireUserId(req: NextRequest) {
	const accessToken = req.cookies.get('access_token')?.value;
	if (!accessToken) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	let userId: string;
	try {
		({ userId } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as { userId: string });
	} catch {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}
	
	return userId;
}