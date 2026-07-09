import ConnectWalletForm from "../../../features/wallet/wallet-connect-form";
import { Web3Provider } from "../../../features/wallet/web3-provider";

export const metadata = { title: "Connect wallet" };

export default function ConnectWalletPage() {
	return <Web3Provider><ConnectWalletForm /></Web3Provider>
}