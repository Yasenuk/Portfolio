import { prisma } from "@portfolio/nft-marketplace-database";
import { NextResponse } from "next/server";
import { generateSiweNonce } from "viem/siwe";

export async function GET() {
	try {
		const nonce = generateSiweNonce();

		await prisma.walletNonce.create({
			data: {
				nonce,
				expiresAt: new Date(Date.now() + 5 * 60 * 1000),
			},
		});

		await prisma.walletNonce.deleteMany({
			where: { expiresAt: { lt: new Date() } },
		});

		return NextResponse.json({ nonce });
	} catch (err) {
		console.error('[nonce] failed to issue', err);

		return NextResponse.json(
			{ error: 'Could not issue a nonce' },
			{ status: 500 }
		);
	}
}
