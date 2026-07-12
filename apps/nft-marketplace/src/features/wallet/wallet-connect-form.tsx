'use client';

import * as React from 'react';
import { useConnect, useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { AuthForm, ButtonMain, NavLink } from "@portfolio/nft-marketplace";
import { apiFetch } from '../../lib/api';
import { buildWalletMessage } from '../../lib/wallet';
import { useRouter } from 'next/navigation';

const PROVIDER_MAP: Record<string, string> = {
	'MetaMask': 'metamask',
	'Coinbase Wallet': 'coinbase',
	'WalletConnect': 'walletconnect',
};

export default function WalletConnectForm() {
	const { connectors, connect, isPending, error: connectError } = useConnect();
	const { address, isConnected, connector } = useAccount();
	const { disconnect } = useDisconnect();
	const { signMessageAsync } = useSignMessage();

	const [linking, setLinking] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const router = useRouter();

	async function linkWallet() {
		if (!address) return;
		setError(null);
		setLinking(true);

		try {
			const nonceRes = await apiFetch('/api/wallet/nonce');
			const { nonce } = await nonceRes.json();

			const message = buildWalletMessage(address, nonce);
			const signature = await signMessageAsync({ message });

			const res = await apiFetch('/api/wallet/connect', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					address,
					signature,
					network: 'ethereum',
					provider: PROVIDER_MAP[connector?.name ?? ''],
				})
			});

			if (!res.ok) {
				const { error } = await res.json();
				setError(error ?? 'Failed to link wallet');
				return;
			}

			router.push('/profile/wallets');
		} catch (err) {
			setError('Signature rejected');
		} finally {
			setLinking(false);
		}
	}

	return (
		<AuthForm
			title='Connect wallet'
			description='Choose a wallet you want to connect. There are several wallet providers.'
			imageSrc='form_img.png'
		>
			<div className='gap-y-5 flex flex-col items-start lg:max-w-[350px]'>
				{isConnected ? (
					<>
						<p>{address?.slice(0, 6)}…{address?.slice(-4)}</p>
						<ButtonMain type="button" disabled={linking} onClick={linkWallet}>Link to account</ButtonMain>
						<ButtonMain type="button" variant="wallet" onClick={() => disconnect()}>Disconnect</ButtonMain>
					</>
				) : (
					<>
						{connectors.map((connector) => (
							<ButtonMain
								type="button"
								key={connector.uid}
								disabled={isPending}
								onClick={() => connect({ connector })}
								className='w-full'
								icon={connector?.name?.toLocaleLowerCase()?.replace(" ", "-")}
								variant="wallet">{connector.name}</ButtonMain>
						))}
						<NavLink href='/profile/create'></NavLink>
					</>
				)}
			</div>
		</AuthForm>
	);
}