import { redirect } from "next/navigation";
import { prisma } from "@portfolio/nft-marketplace-database";

import { getSessionUser } from "../../../../lib/session";
import { WalletsList } from "../../../../features/wallet/wallets-list";

export default async function WalletsPage() {
	const user = await getSessionUser();
	if (!user) redirect('/login');

	const wallets = await prisma.wallet.findMany({
		where: { userId: user.id },
		orderBy: [{ isPrimary: 'desc' }, { connectedAt: 'asc' }],
		select: {
			id: true,
			address: true,
			network: true,
			provider: true,
			isPrimary: true,
			balanceCache: true,
			balanceUpdateAt: true,
			connectedAt: true,
		},
	});

	return (
		<WalletsList
			wallets={wallets.map((w) => ({
				...w,
				balanceCache: w.balanceCache.toString(),
			}))}
		/>
	);
}
