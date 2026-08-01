import jwt from 'jsonwebtoken';
import { prisma, WalletNetwork, WalletProvider } from "@portfolio/nft-marketplace-database";
import { NextRequest, NextResponse } from "next/server";
import { verifyMessage } from "viem";
import { buildWalletMessage } from '../../../../lib/wallet';

export async function POST(req: NextRequest) {
	const { address, signature, network, provider } = await req.json();
	const nonce = req.cookies.get('wallet_nonce')?.value;

	if (!nonce) return NextResponse.json(
		{ error: 'Nonce expired, try again', },
		{ status: 400 }
	);

	if (typeof address !== 'string' || typeof signature !== 'string') {
		return NextResponse.json(
			{ error: 'Address and signature are required' },
			{ status: 400 }
		);
	}

	if (!Object.values(WalletNetwork).includes(network) || !Object.values(WalletProvider).includes(provider)) {
		return NextResponse.json(
			{ error: 'Unknown network or provider' },
			{ status: 400 }
		);
	}

	const valid = await verifyMessage({
		address: address as `0x${string}`,
		message: buildWalletMessage(address, nonce),
		signature: signature as `0x${string}`
	});
	
	if (!valid) return NextResponse.json(
		{ error: 'Invalid signature' },
		{ status: 401 }
	);

	const accessToken = req.cookies.get('access_token')!.value;
	const { userId } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as { userId: string };

	const normalized = address.toLowerCase();
	const taken = await prisma.wallet.findFirst({
		where: { address: normalized }
	});

	if (taken) return NextResponse.json(
		{ error: 'Wallet already linked' },
		{ status: 409 }
	);

	const hasWallet = await prisma.wallet.count({ where: { userId } });
	const wallet = await prisma.wallet.create({
		data: {
			userId,
			address: normalized,
			network,
			provider,
			isPrimary: hasWallet === 0,
			balanceCache: 0
		}
	});

	const res = NextResponse.json({ wallet }, { status: 201 });
	res.cookies.set('wallet_nonce', '', { maxAge: 0 });

	return res;
}