import bcrypt from 'bcrypt';

import { NextResponse, type NextRequest } from "next/server";

import { prisma } from '@portfolio/nft-marketplace-database';

import { requireUserId } from '../../../../lib/session';
import { setAuthCookies, createSession, getClientMeta } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
	const userId = await requireUserId(req);
	if (typeof userId !== 'string') return userId;
}