import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from "@portfolio/nft-marketplace-database";
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const { email, password } = await req.json();

	const user = await prisma.user.findUnique({ where: { email } });
	if (!user || !await bcrypt.compare(password, user?.passwordhash)) {
		return NextResponse.json(
			{ error: 'Invalid credentials', },
			{ status: 401 }
		);
	}

	const accessToken = jwt.sign(
		{ userId: user.id },
		process.env.ACCESS_TOKEN_SECRET!,
		{ expiresIn: '15m' }
	);

	const refreshToken = jwt.sign(
		{ userId: user.id },
		process.env.REFRESH_TOKEN_SECRET!,
		{ expiresIn: '7d' }
	);

	await prisma.refreshToken.create({
		data: {
			token: refreshToken,
			userId: user.id,
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
		}
	});

	const res = NextResponse.json({
		user: {
			id: user.id,
			username: user.username,
		},
	});

	res.cookies.set('access_token', accessToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 15 * 60,
	});

	res.cookies.set('refresh_token', refreshToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 7 * 24 * 60 * 60,
		path: '/api/auth/refresh',
	});

	return res;
}