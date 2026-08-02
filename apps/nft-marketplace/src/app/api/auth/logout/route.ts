import jwt from 'jsonwebtoken';
import { prisma } from "@portfolio/nft-marketplace-database";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const accessToken = req.cookies.get('access_token')?.value;

	if (accessToken) {
		try {
			const { userId } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!, {
				ignoreExpiration: true
			}) as { userId: string };
			await prisma.refreshToken.deleteMany({ where: { userId } });
		} catch {}
	}

	const res = NextResponse.json({ ok: true });
	res.cookies.set('access_token', '', { maxAge: 0 });
	res.cookies.set('refresh_token', '', { maxAge: 0, path: '/api/auth/refresh' });

	return res;
}