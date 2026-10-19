import { type NextRequest, NextResponse } from "next/server";

import { getClientMeta, rotateSession, setAuthCookies } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
	const refreshToken = req.cookies.get('refresh_token')?.value;

	if (!refreshToken) {
		return NextResponse.json(
			{ error: 'Refresh token not found' },
			{ status: 401 }
		);
	}

	const next = await rotateSession(refreshToken, getClientMeta(req));

	if (!next) {
		const res = NextResponse.json(
			{ error: 'Invalid refresh token' },
			{ status: 401 }
		);

		res.cookies.set('access_token', '', { maxAge: 0 });
		res.cookies.set('refresh_token', '', { maxAge: 0, path: '/api/auth/refresh' });

		return res;
	}

	const res = NextResponse.json({ ok: true });
	setAuthCookies(res, next);

	return res;
}
