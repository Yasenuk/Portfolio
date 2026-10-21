import { Prisma, prisma } from "@portfolio/nft-marketplace-database";
import { NextRequest, NextResponse } from "next/server";
import { parseSiweMessage } from 'viem/siwe';
import { NETWORK_BY_CHAIN, isWalletProvider } from '@portfolio/nft-marketplace-types';

import { checkSiwe } from '../../../../lib/wallet';
import { requireUserId, UnauthorizedError } from '../../../../lib/session';

export async function POST(req: NextRequest) {
	let userId: string;
	try {
		userId = requireUserId(req);
	} catch (err) {
		if (err instanceof UnauthorizedError) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		throw err;
	}

	const body = await req.json().catch(() => null);
	const { message, signature, provider } = body ?? {};

	if (typeof message !== 'string' || typeof signature !== 'string') {
		return NextResponse.json({ error: 'Message and signature are required' }, { status: 400 });
	}

	const { address, nonce, chainId } = parseSiweMessage(message);

	if (!address || !nonce || !chainId) {
		return NextResponse.json({ error: 'Malformed sign-in message' }, { status: 400 });
	}

	const network = NETWORK_BY_CHAIN[chainId];
	if (!network) {
		return NextResponse.json({ error: 'Unsupported network' }, { status: 400 });
	}

	if (!isWalletProvider(provider)) {
		return NextResponse.json({ error: 'Unknown wallet provider' }, { status: 400 });
	}

	const { count } = await prisma.walletNonce.updateMany({
		where: { nonce, usedAt: null, expiresAt: { gt: new Date() } },
		data: { usedAt: new Date() },
	});

	if (count === 0) {
		return NextResponse.json({ error: 'Nonce expired or already used' }, { status: 400 });
	}

	const valid = await checkSiwe(message, signature as `0x${string}`, nonce);
	if (!valid) {
		return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
	}

	const normalized = address.toLowerCase();

	const taken = await prisma.wallet.findUnique({
		where: { address: normalized },
		select: { userId: true },
	});

	if (taken) {
		return NextResponse.json(
			{
				error: taken.userId === userId
					? 'Wallet already linked'
					: 'Wallet belongs to another account',
			},
			{ status: 409 }
		);
	}

	const hasWallet = await prisma.wallet.count({ where: { userId } });

	try {
		const wallet = await prisma.wallet.create({
			data: {
				userId,
				address: normalized,
				network,
				provider,
				isPrimary: hasWallet === 0,
				balanceCache: 0,
			},
			select: {
				id: true,
				address: true,
				network: true,
				provider: true,
				isPrimary: true,
				connectedAt: true,
			},
		});

		return NextResponse.json({ wallet }, { status: 201 });
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
			return NextResponse.json({ error: 'Wallet already linked' }, { status: 409 });
		}
		throw err;
	}
}
