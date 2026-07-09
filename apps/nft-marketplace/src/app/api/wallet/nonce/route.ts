import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

export async function GET() {
	const nonce = randomBytes(32).toString('hex');

	const res = NextResponse.json({ nonce });
	res.cookies.set('wallet_nonce', nonce, {
		httpOnly: true,
		secure: process.env.MODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 5 * 60
	});

	return res;
}