import { prisma } from '@portfolio/nft-marketplace-database';
import jwt from 'jsonwebtoken';
import { type NextRequest, NextResponse } from "next/server";

export async function GET(res: NextResponse) {
	const accessToken = res.cookies.get('access_token')?.value;

	if (!accessToken) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { userId } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as { userId: string };
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				username: true,
				email: true,
				profile: {
					select: { avatarUrl: true }
				}
			}
		});

		if (!user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		
		return NextResponse.json({ user });
	} catch {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}
}