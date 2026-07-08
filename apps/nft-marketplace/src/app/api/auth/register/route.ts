import bcrypt from 'bcrypt';
import { prisma } from "@portfolio/nft-marketplace-database";
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const { username, email, password } = await req.json();

	if (typeof username !== 'string') {
		return NextResponse.json(
			{ error: 'Username is required' },
			{ status: 400 }
		);
	}

	if (typeof email !== 'string' || typeof password !== 'string') {
		return NextResponse.json(
			{ error: 'Email and password are required' },
			{ status: 400 }
		);
	}

	const existingUser = await prisma.user.findUnique({ where: { email } });
	if (existingUser) {
		return NextResponse.json(
			{ error: 'Email already in use' },
			{ status: 400 }
		);
	}

	const hashedPassword = await bcrypt.hash(password, 12);
	const user = await prisma.user.create({
		data: {
			username,
			email,
			passwordhash: hashedPassword
		}
	});

	return NextResponse.json({ user });
}