import bcrypt from 'bcrypt';
import { prisma } from "@portfolio/nft-marketplace-database";
import { type NextRequest, NextResponse } from 'next/server';
import { createSession, getClientMeta, setAuthCookies } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
	const { email, password } = await req.json();

	if (typeof email !== 'string' || typeof password !== 'string') {
		return NextResponse.json(
			{ error: 'Email and password are required' },
			{ status: 409 }
		);
	}

	const user = await prisma.user.findUnique({ where: { email } });
	if (!user || !await bcrypt.compare(password, user.passwordhash)) {
		return NextResponse.json(
			{ error: 'Invalid credentials', },
			{ status: 409 }
		);
	}

	const { accessToken, refreshToken } = await createSession(user.id, getClientMeta(req));

	const res = NextResponse.json({
		user: {
			id: user.id,
			username: user.username,
		},
	});

	setAuthCookies(res, { accessToken, refreshToken });

	return res;
}