import { redirect } from "next/navigation";
import { prisma } from "@portfolio/nft-marketplace-database";

import { getSessionUser } from "../../../../../lib/session";
import WalletConnectForm from "../../../../../features/wallet/wallet-connect-form";
import { Web3Provider } from "../../../../../features/wallet/web3-provider";

export default async function ConnectWalletPage() {
	const user = await getSessionUser();
	if (!user) redirect('/login');

	const linked = await prisma.wallet.findMany({
		where: { userId: user.id },
		select: { address: true },
	});

	return (
		<Web3Provider>
			<WalletConnectForm linkedAddresses={linked.map((w) => w.address)} />
		</Web3Provider>
	);
}
