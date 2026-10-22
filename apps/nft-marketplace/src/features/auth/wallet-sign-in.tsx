'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAccount, useConnect, useSignMessage } from 'wagmi';

import { ButtonMain } from '@portfolio/nft-marketplace';

import { buildWalletMessage, SIWE_STATEMENTS } from '../../lib/siwe-message';
import { useSession } from './auth-provider';

const PROVIDER_MAP: Record<string, string> = {
	'MetaMask': 'metamask',
	'Coinbase Wallet': 'coinbase',
	'WalletConnect': 'walletconnect',
};

export function WalletSignIn() {
	const router = useRouter();
	const { refetch } = useSession();

	const { connectors, connectAsync, isPending } = useConnect();
	const { address, isConnected, connector, chainId } = useAccount();
	const { signMessageAsync } = useSignMessage();

	const [pending, setPending] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	async function signIn(targetConnector?: (typeof connectors)[number]) {
		setError(null);
		setPending(true);

		try {
			let activeAddress = address;
			let activeChainId = chainId;
			let activeName = connector?.name;

			if (!isConnected && targetConnector) {
				const result = await connectAsync({ connector: targetConnector });
				activeAddress = result.accounts[0];
				activeChainId = result.chainId;
				activeName = targetConnector.name;
			}

			if (!activeAddress || !activeChainId) {
				setError('Connect a wallet first');
				return;
			}

			const provider = PROVIDER_MAP[activeName ?? ''];
			if (!provider) {
				setError('This wallet provider is not supported yet');
				return;
			}

			const nonceRes = await fetch('/api/wallet/nonce');
			const nonceData = await nonceRes.json().catch(() => null);
			const nonce: unknown = nonceData?.nonce;

			if (!nonceRes.ok || typeof nonce !== 'string') {
				console.error('[wallet] bad nonce response', nonceRes.status, nonceData);
				setError('Could not start sign-in, try again');
				return;
			}

			const message = buildWalletMessage({
				address: activeAddress,
				chainId: activeChainId,
				nonce,
				statement: SIWE_STATEMENTS.login,
			});

			const signature = await signMessageAsync({ message });

			const res = await fetch('/api/auth/wallet', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message, signature, provider }),
			});

			if (!res.ok) {
				const data = await res.json().catch(() => null);
				setError(data?.error ?? 'Could not sign in');
				return;
			}

			await refetch();
			router.push('/');
		} catch (err) {
			console.error('[wallet] sign-in failed', err);
			setError('Signature rejected or network error');
		} finally {
			setPending(false);
		}
	}

	const busy = pending || isPending;

	return (
		<div className='flex flex-col gap-y-3 w-full'>
			<span className='text-label uppercase text-caption'>Or sign in with a wallet</span>

			{isConnected ? (
				<ButtonMain
					type='button'
					size='sm'
					px='sm'
					variant='wallet'
					icon={connector?.name.toLowerCase().replace(' ', '-')}
					disabled={busy}
					onClick={() => signIn()}
				>
					{busy ? 'Signing in...' : `Continue with ${connector?.name}`}
				</ButtonMain>
			) : (
				connectors.map((item) => (
					<ButtonMain
						type='button'
						key={item.uid}
						variant='wallet'
						icon={item.name.toLowerCase().replace(' ', '-')}
						disabled={busy}
						onClick={() => signIn(item)}
						className='w-full'
					>
						{item.name}
					</ButtonMain>
				))
			)}

			{error && <p className='text-danger text-caption'>{error}</p>}
		</div>
	);
}
