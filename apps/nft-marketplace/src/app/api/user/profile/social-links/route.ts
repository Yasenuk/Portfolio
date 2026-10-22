import { NextResponse, type NextRequest } from "next/server";

import { prisma } from '@portfolio/nft-marketplace-database';

import { requireUserId, UnauthorizedError } from '../../../../../lib/session';

import { parseBody, socialLinksSchema } from "@portfolio/nft-marketplace-utils";
import type { SocialPlatform } from "@portfolio/nft-marketplace-types";

export async function PUT(req: NextRequest) {
	let userId: string;
	try {
		userId = requireUserId(req);
	} catch (err) {
		if (err instanceof UnauthorizedError) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		throw err;
	}

	const parsed = await parseBody(req, socialLinksSchema);
	if ('error' in parsed) {
		return NextResponse.json({ error: parsed.error }, { status: 400 });
	}

	const entries = Object.entries(parsed.data)
		.filter(([, url]) => url)
		.map(([platform, url]) => ({
			userId,
			platform: platform as SocialPlatform,
			url
		})
	);

	await prisma.$transaction([
		prisma.userSocialLink.deleteMany({ where: { userId } }),
		prisma.userSocialLink.createMany({ data: entries  }),
	]);

	return NextResponse.json({ links: parsed.data });
}