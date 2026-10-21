import { prisma } from "@portfolio/nft-marketplace-database";
import { NextResponse } from "next/server";
import { generateSiweNonce } from "viem/siwe";

export async function GET() {
	const nonce = generateSiweNonce();

	await prisma.walletNonce.create({
		data: {
			nonce,
			expiresAt: new Date(Date.now() + 5 * 60 * 1000)
		}
	});

	return NextResponse.json({ nonce });
}