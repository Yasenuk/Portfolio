import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

import { type NextRequest, NextResponse } from "next/server";

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { R2_BUCKET } from './../../../lib/r2';

const ALLOWED_TYPES: Record<string, string> = {
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/webp': 'webp',
	'image/avif': 'avif',
	'image/gif': 'gif',
};
const ALLOWED_FLOADERS = ['users', 'NFTs'];
const MAX_SIZE = 10 * 1024 * 1024;

export async function POST(req: NextRequest) {
	const accessToken = req.cookies.get('access_token')?.value;
	if (!accessToken) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	let userId: string;
	try {
		({ userId } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as { userId: string });
	} catch {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { contentType, size, floder } = await req.json();

	const ext = ALLOWED_TYPES[contentType];
	if (!ext) return NextResponse.json(
		{ error: 'Unsuported file type' },
		{ status: 400 }
	);
	if (typeof size !== 'number' || size <= 0 || size >= MAX_SIZE) return NextResponse.json(
		{ error: 'File is too large (max 10 MB)' },
		{ status: 400 }
	);
	if (!ALLOWED_FLOADERS.includes(floder)) return NextResponse.json(
		{ error: 'Unknown upload floader' },
		{ status: 400 }
	);
	
	const key = `${floder}/${userId}/${randomBytes(16).toString('hex')}.${ext}`;
	const uploadUrl = await getSignedUrl(
		r2,
		new PutObjectCommand({
			Bucket: R2_BUCKET,
			Key: key,
			ContentType: contentType,
			ContentLength: size
		}),
		{ expiresIn: 5 * 60 }
	);

	return NextResponse.json({
		uploadUrl,
		publicUrl: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`
	})
}