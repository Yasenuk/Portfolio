import jwt from 'jsonwebtoken';
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from '@portfolio/nft-marketplace-database';
import { requireUserId } from '../../../../lib/session';

const R2_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL!;

function validateImageUrl(value: unknown): string | undefined | null {
	if (value === undefined) return undefined;
	if (value === null) return null;
	if (typeof value === 'string' && value.startsWith(`${R2_URL}/`)) return value;
	throw new Error('Invalid image URL');
}

export async function PATCH(req: NextRequest) {
	const userId = await requireUserId(req);
	if (typeof userId !== 'string') return userId;

	const body = await req.json();
	let avatarUrl, backgroundUrl;
	try {
		avatarUrl = validateImageUrl(body.avatarUrl);
		backgroundUrl = validateImageUrl(body.backgroundUrl);
	} catch {
		return NextResponse.json(
			{ error: 'Image URL must be from our storage' },
			{ status: 400 }
		);
	}

	const bio = body.bio === undefined
		? undefined
		: typeof body.bio === 'string' && body.bio.length <= 500
			? body.bio
			: false;

	if (bio === false) {
		return NextResponse.json(
			{ error: 'Bio must be a string up to 500 chars' },
			{ status: 400 }
		);
	}

	const data = { avatarUrl, backgroundUrl, bio };
	const profile = await prisma.userProfile.upsert({
		where: { userId },
		update: data,
		create: { userId, ...data },
		select: {
			avatarUrl: true,
			backgroundUrl: true,
			bio: true
		}
	});

	return NextResponse.json({ profile });
}