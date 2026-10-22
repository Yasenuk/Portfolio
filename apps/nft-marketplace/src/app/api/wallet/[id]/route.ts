import { prisma } from "@portfolio/nft-marketplace-database";
import { type NextRequest, NextResponse } from "next/server";

import { requireUserId, UnauthorizedError } from "../../../../lib/session";

type Context = { params: Promise<{ id: string }> };

type Authorized =
	| { ok: true; userId: string }
	| { ok: false; response: NextResponse };

function authorize(req: NextRequest): Authorized {
	try {
		return { ok: true, userId: requireUserId(req) };
	} catch (err) {
		if (err instanceof UnauthorizedError) {
			return {
				ok: false,
				response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
			};
		}
		throw err;
	}
}

async function findOwnWallet(id: string, userId: string) {
	const wallet = await prisma.wallet.findUnique({
		where: { id },
		select: { id: true, userId: true, isPrimary: true },
	});

	return wallet && wallet.userId === userId ? wallet : null;
}

export async function DELETE(req: NextRequest, { params }: Context) {
	const auth = authorize(req);
	if (!auth.ok) return auth.response;
	const { userId } = auth;

	const { id } = await params;

	const wallet = await findOwnWallet(id, userId);
	if (!wallet) {
		return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
	}

	const [user, walletCount] = await Promise.all([
		prisma.user.findUnique({ where: { id: userId }, select: { passwordhash: true } }),
		prisma.wallet.count({ where: { userId } }),
	]);

	if (!user?.passwordhash && walletCount === 1) {
		return NextResponse.json(
			{ error: 'Cannot remove your only sign-in method' },
			{ status: 409 }
		);
	}

	await prisma.$transaction(async (tx) => {
		await tx.wallet.delete({ where: { id } });

		if (wallet.isPrimary) {
			const next = await tx.wallet.findFirst({
				where: { userId },
				orderBy: { connectedAt: 'asc' },
				select: { id: true },
			});

			if (next) {
				await tx.wallet.update({ where: { id: next.id }, data: { isPrimary: true } });
			}
		}
	});

	return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest, { params }: Context) {
	const auth = authorize(req);
	if (!auth.ok) return auth.response;
	const { userId } = auth;

	const { id } = await params;

	const wallet = await findOwnWallet(id, userId);
	if (!wallet) {
		return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
	}

	if (wallet.isPrimary) {
		return NextResponse.json({ ok: true });
	}

	await prisma.$transaction([
		prisma.wallet.updateMany({ where: { userId }, data: { isPrimary: false } }),
		prisma.wallet.update({ where: { id }, data: { isPrimary: true } }),
	]);

	return NextResponse.json({ ok: true });
}
