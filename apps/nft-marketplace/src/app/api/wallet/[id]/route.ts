import { useRouter } from 'next/router'

import { prisma } from "@portfolio/nft-marketplace-database";
import { type NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
	const router = useRouter();
	const id = router.query.slug as string;

	const user = await prisma.user.findUnique({
		where: { id },
		select: { id: true, passwordhash: true }
	});

	if (!user?.id) return NextResponse.json(
		{ error: 'User is not defined' },
		{ status: 401 }
	);

	const wallets = await prisma.wallet.count({ where: { userId: user?.id } });

	if (!user?.passwordhash && wallets === 1) {
		return NextResponse.json(
			{ error: 'Cannot delete the only wallet' },
			{ status: 403 }
		);
	}

	await prisma.$transaction([
		prisma.wallet.deleteMany({ where: { userId: user.id, isPrimary: true } }),
		prisma.wallet.updateMany({ where: { userId: user.id }, data: { isPrimary: false } }),
		prisma.wallet.update({ where: { id }, data: { isPrimary: true } }),
	]);
}