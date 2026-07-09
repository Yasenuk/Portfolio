import jwt from 'jsonwebtoken';
import { type NextRequest, NextResponse } from 'next/server';

export async function proxy(req: NextRequest) {
	const accessToken = req.cookies.get('access_token')?.value;
	const isApiRequest = req.nextUrl.pathname.startsWith('/api');

	const unauthorized = () =>
		isApiRequest
			? NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
			: NextResponse.redirect(new URL('/login', req.url));

	if (!accessToken) {
		return unauthorized();
	}

	try {
		jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
		return NextResponse.next();
	} catch {
		return unauthorized();
	}
}

export const config = {
	matcher: ['/wallet/:path*', '/profile/:path*', '/api/nft/:path*', '/api/collection/:path*', '/api/wallet/:path*'],
};
