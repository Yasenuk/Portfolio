'use client';

import * as React from 'react';
import { useConnect, useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { AuthForm, ButtonMain, NavLink } from "@portfolio/nft-marketplace";
import { useRouter } from 'next/navigation';
import { apiFetch } from '../../lib/api';
import { buildWalletMessage, SIWE_STATEMENTS } from '../../lib/siwe-message';

const PROVIDER_MAP: Record<string, string> = {
	'MetaMask': 'metamask',
	'Coinbase Wallet': 'coinbase',
	'WalletConnect': 'walletconnect',
};

export default function WalletConnectForm() {
	const { connectors, connect, isPending, error: connectError } = useConnect();
	const { address, isConnected, connector, chainId } = useAccount();
	const { disconnect } = useDisconnect();
	const { signMessageAsync } = useSignMessage();

	const [linking, setLinking] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const router = useRouter();

	async function linkWallet() {
		if (!address || !chainId) return;
		setError(null);
		setLinking(true);

		const provider = PROVIDER_MAP[connector?.name ?? ''];
		if (!provider) {
			setError('This wallet provider is not supported yet');
			setLinking(false);
			return;
		}

		try {
			const nonceRes = await apiFetch('/api/wallet/nonce');
			const { nonce } = await nonceRes.json();

			const message = buildWalletMessage({ address, nonce, chainId, statement: SIWE_STATEMENTS.link });
			const signature = await signMessageAsync({ message });

			const res = await apiFetch('/api/wallet/connect', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					message,
					signature,
					provider,
				})
			});

			if (!res.ok) {
				const data = await res.json().catch(() => null);
				setError(data?.error ?? 'Failed to link wallet');
				return;
			}

			router.push('/profile/wallets');
		} catch (err) {
			console.error('[wallet] link failed', err);
			setError('Signature rejected or network error');
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