import { prisma } from "@portfolio/nft-marketplace-database";
import { NextResponse } from "next/server";
import { generateSiweNonce } from "viem/siwe";

export async function GET() {
	const nonce = generateSiweNonce();

	const { count } = await prisma.walletNonce.updateMany({
		where: { nonce, usedAt: null, expiresAt: { gt: new Date() } },
		data: { usedAt: new Date() },
	});

	if (count === 0) return NextResponse.json(
		{ error: 'Nonce expired or already used' },
		{ status: 400 }
	);

	await prisma.walletNonce.create({
		data: {
			nonce,
			expiresAt: new Date(Date.now() + 5 * 60 * 1000)
		}
	});

	return NextResponse.json({ nonce });
}