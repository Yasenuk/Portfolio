import jwt from 'jsonwebtoken';
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from '@portfolio/nft-marketplace-database';
import { setAuthCookies } from "@portfolio/nft-marketplace-utils";

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

		const newAccessToken = jwt.sign(
			{ userId: payload.userId },
			process.env.ACCESS_TOKEN_SECRET!,
			{ expiresIn: '15m' }
		);

		const newRefreshToken = jwt.sign(
			{ userId: payload.userId },
			process.env.REFRESH_TOKEN_SECRET!,
			{ expiresIn: '7d' }
		);

		await prisma.refreshToken.update({
			where: { token: refreshToken },
			data: {
				token: newRefreshToken,
				expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
				lastUsedAt: new Date(),
			}
		});

		const res = NextResponse.json({ ok: true });

		await setAuthCookies(res, { accessToken: newAccessToken, refreshToken: newRefreshToken });

		return res;
	} catch {
		return NextResponse.json(
			{ error: 'Invalid refresh token' },
			{ status: 401 }
		);
	}
}