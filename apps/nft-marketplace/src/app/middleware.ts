
import jwt from 'jsonwebtoken';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
	const accessToken = req.cookies.get('access_token')?.value;

	if (!accessToken) {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	try {
		jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
		return NextResponse.next();
	} catch (err) {
		const res = NextResponse.redirect(new URL('/api/auth/refresh', req.url));
		return res;
	}
}