import { after, type NextRequest, NextResponse } from "next/server";
import { Prisma, prisma } from "@portfolio/nft-marketplace-database";

import { sha256 } from "@portfolio/nft-marketplace-utils";
import { sendEmailChanged } from "../../../../../lib/mail";

export async function POST(req: NextRequest) {
	const { token } = await req.json().catch(() => ({})) as { token?: unknown };
	if (typeof token !== 'string' || !token) return NextResponse.json(
		{ error: 'Invalid confirmation link' },
		{ status: 400 }
	);

	const request = await prisma.emailChangeRequest.findUnique({
		where: { tokenHash: sha256(token) },
		select: {
			id: true,
			userId: true,
			newEmail: true,
			expiresAt: true,
			user: { select: { email: true } }
		}
	});

	if (!request || request.expiresAt < new Date()) {
		if (request) await prisma.emailChangeRequest.delete({ where: { id: request.id } });
		return NextResponse.json(
			{ error: 'This link has expiret or is`n longer valid' },
			{ status: 400 }
		);
	}

	const oldEmail = request.user.email;

	try {
		await prisma.$transaction([
			prisma.user.update({
				where: { id: request.userId },
				data: {
					email: request.newEmail,
					emailVerified: new Date()
				}
			}),
			prisma.emailChangeRequest.deleteMany({ where: { userId: request.userId } }),
			prisma.refreshToken.deleteMany({ where: { userId: request.userId } }),
		]);
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
			await prisma.emailChangeRequest.deleteMany({ where: { userId: request.userId } });
			return NextResponse.json(
				{ error: 'This email address is`n longer avalible' },
				{ status: 409 }
			);
		}
		throw err;
	}

	const res = NextResponse.json({ ok: true, email: request.newEmail });
	res.cookies.set('access_token', '', { maxAge: 0 });
	res.cookies.set('refresh_token', '', { maxAge: 0, path: '/api/auth/refresh' });

	after(async () => {
		try {
			await sendEmailChanged(oldEmail, request.newEmail);
		} catch (err) {
			console.error('[email] notice failed', err);
		}
	});

	return res;
}