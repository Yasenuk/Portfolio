import jwt from 'jsonwebtoken';
import { type NextRequest, NextResponse } from 'next/server';

// Публічні ендпоінти всередині захищених префіксів.
// Нонс потрібен ДО автентифікації — вимагати для нього токен означає
// «щоб залогінитись, спершу залогінься».
const PUBLIC_PATHS = [
	'/api/wallet/nonce',
	// лінк із листа відкривають у будь-якому браузері, зокрема без сесії —
	// токен у тілі запиту і є доказом
	'/api/user/email/confirm',
];

export async function proxy(req: NextRequest) {
	const { pathname } = req.nextUrl;

	if (PUBLIC_PATHS.includes(pathname)) {
		return NextResponse.next();
	}

	const accessToken = req.cookies.get('access_token')?.value;
	const isApiRequest = pathname.startsWith('/api');

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
	matcher: ['/wallet/:path*', '/profile/:path*', '/api/upload', '/api/user/:path*', '/api/nft/:path*', '/api/collection/:path*', '/api/wallet/:path*'],
};
