import bcrypt from 'bcrypt';
import { Prisma, prisma } from "@portfolio/nft-marketplace-database";
import { after, type NextRequest, NextResponse } from 'next/server';
import { createSession, getClientMeta, setAuthCookies } from '../../../../lib/auth';
import { createEmailRequest, VERIFY_TTL_MS } from '../../../../lib/email-verification';
import { sendEmailVerification } from '../../../../lib/mail';

export async function POST(req: NextRequest) {
	const { username, email, password } = await req.json();

	if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
		return NextResponse.json(
			{ error: 'Username, email and password are required' },
			{ status: 400 }
		);
	}

	if (password.length < 8) {
		return NextResponse.json(
			{ error: 'Password is too short' },
			{ status: 400 }
		);
	}

	const hashedPassword = await bcrypt.hash(password, 12);

	try {
		const user = await prisma.user.create({
			data: { username, email, passwordhash: hashedPassword, emailVerified: null },
			select: { id: true, username: true },
		});

		const res = NextResponse.json({ user }, { status: 201 });
		setAuthCookies(res, await createSession(user.id, getClientMeta(req)));

		after(async () => {
			try {
				const token = await createEmailRequest(user.id, email, VERIFY_TTL_MS);
				await sendEmailVerification(email, token);
			} catch (err) {
				console.error('[register] verification mail failed', err);
			}
		});

		return res;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
			return NextResponse.json(
				{ error: 'Email or username already in use' },
				{ status: 409 }
			);
		}
		throw error;
	}
}