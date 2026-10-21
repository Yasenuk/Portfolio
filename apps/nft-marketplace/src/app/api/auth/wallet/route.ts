import { type NextRequest, NextResponse } from 'next/server';
import { parseSiweMessage } from 'viem/siwe';
import { Prisma, prisma } from '@portfolio/nft-marketplace-database';
import { NETWORK_BY_CHAIN, isWalletProvider } from '@portfolio/nft-marketplace-types';

import { checkSiwe } from '../../../../lib/wallet';
import { RateLimit } from '../../../../lib/rate-limit';
import { createSession, getClientMeta, setAuthCookies } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
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

	const { ip } = getClientMeta(req);
	const rateLimit = await RateLimit('wallet-login:' + (ip ?? 'unknown'), 10, 3600_000);
	if (!rateLimit.ok) {
		const retryAfter = Math.ceil((+rateLimit.retryAfter! - Date.now()) / 1000);
		return NextResponse.json(
			{ error: 'Too many attempts. Try again later.' },
			{ status: 429, headers: { 'Retry-After': String(retryAfter) } },
		);
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

	const wallet = await prisma.wallet.findUnique({
		where: { address: normalized },
		select: { userId: true },
	});

	if (wallet) {
		const res = NextResponse.json({ ok: true });
		setAuthCookies(res, await createSession(wallet.userId, getClientMeta(req)));
		return res;
	}

	try {
		const user = await prisma.user.create({
			data: {
				username: `user_${normalized.slice(2, 10)}`,
				email: null,
				passwordhash: null,
				wallets: {
					create: {
						address: normalized,
						network,
						provider,
						isPrimary: true,
						balanceCache: 0, 
					},
				},
			},
			select: { id: true, username: true },
		});

		const res = NextResponse.json({ user }, { status: 201 });
		setAuthCookies(res, await createSession(user.id, getClientMeta(req)));
		return res;
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
			return NextResponse.json(
				{ error: 'Could not create account, try again' },
				{ status: 409 }
			);
		}
		throw err;
	}
}
