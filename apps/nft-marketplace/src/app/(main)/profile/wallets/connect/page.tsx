import { redirect } from "next/navigation";

import { getSessionUser } from "../../../../../lib/session";
import WalletConnectForm from "../../../../../features/wallet/wallet-connect-form";
import { Web3Provider } from "../../../../../features/wallet/web3-provider";

export default async function ConnectWalletPage() {
	const user = await getSessionUser();
	if (!user) redirect('/login');

	return <Web3Provider><WalletConnectForm /></Web3Provider>;
}
