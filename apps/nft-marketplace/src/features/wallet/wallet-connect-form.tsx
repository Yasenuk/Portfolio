'use client';

import * as React from 'react';
import { useConnect, useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { AuthForm, ButtonMain } from "@portfolio/nft-marketplace";
import { useRouter } from 'next/navigation';
import { apiFetch } from '../../lib/api';
import { buildWalletMessage, SIWE_STATEMENTS } from '../../lib/siwe-message';

const PROVIDER_MAP: Record<string, string> = {
	'MetaMask': 'metamask',
	'Coinbase Wallet': 'coinbase',
	'WalletConnect': 'walletconnect',
};

export default function WalletConnectForm({
	linkedAddresses = [],
}: {
	linkedAddresses?: string[];
}) {
	const { connectors, connect, isPending } = useConnect();
	const { address, isConnected, connector, chainId } = useAccount();
	const { disconnect } = useDisconnect();
	const { signMessageAsync } = useSignMessage();

	const [linking, setLinking] = React.useState(false);
	const [switching, setSwitching] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const router = useRouter();

	const isAlreadyLinked =
		!!address && linkedAddresses.includes(address.toLowerCase());

	async function switchAccount() {
		if (!connector) return;
		setSwitching(true);
		setError(null);

		try {
			const provider = await connector.getProvider();

			await (provider as {
				request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
			}).request({
				method: 'wallet_requestPermissions',
				params: [{ eth_accounts: {} }],
			});
		} catch {
			setError('Switch the active account in your wallet, then come back');
		} finally {
			setSwitching(false);
		}
	}

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
			const nonceData = await nonceRes.json().catch(() => null);
			const nonce: unknown = nonceData?.nonce;

			if (!nonceRes.ok || typeof nonce !== 'string') {
				console.error('[wallet] bad nonce response', nonceRes.status, nonceData);
				setError('Could not start linking, try again');
				return;
			}

			const message = buildWalletMessage({ address, nonce, chainId, statement: SIWE_STATEMENTS.link });
			const signature = await signMessageAsync({ message });

			const res = await apiFetch('/api/wallet/connect', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message, signature, provider })
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

	const busy = linking || switching || isPending;

	return (
		<AuthForm
			title='Connect wallet'
			description='Choose a wallet you want to connect. There are several wallet providers.'
			imageSrc='form_img.png'
		>
			<div className='gap-y-5 flex flex-col items-start lg:max-w-[350px] w-full'>
				{isConnected && address && (
					<div className='flex flex-col gap-y-3 w-full'>
						<span className='text-label uppercase text-caption'>
							Active in {connector?.name ?? 'your wallet'}
						</span>
						<p className='text-body'>{address.slice(0, 6)}…{address.slice(-4)}</p>

						{isAlreadyLinked ? (
							<>
								<p className='text-warning text-caption'>
									This address is already linked to your account.
									Pick another one in your wallet to add a different address.
								</p>
								<ButtonMain
									type='button'
									size='sm'
									px='sm'
									disabled={busy}
									onClick={switchAccount}
								>
									{switching ? 'Opening wallet...' : 'Switch account'}
								</ButtonMain>
							</>
						) : (
							<ButtonMain
								type='button'
								size='sm'
								px='sm'
								disabled={busy}
								onClick={linkWallet}
							>
								{linking ? 'Linking...' : 'Link to account'}
							</ButtonMain>
						)}

						<ButtonMain
							type='button'
							size='none'
							px='sm'
							variant='outlined'
							disabled={busy}
							onClick={() => disconnect()}
						>
							Disconnect
						</ButtonMain>
					</div>
				)}

				<div className='flex flex-col gap-y-3 w-full'>
					<span className='text-label uppercase text-caption'>
						{isConnected ? 'Or use another wallet' : 'Choose a wallet'}
					</span>

					{connectors.map((item) => (
						<ButtonMain
							type='button'
							key={item.uid}
							disabled={busy || item.uid === connector?.uid}
							onClick={() => connect({ connector: item })}
							className='w-full'
							icon={item.name.toLowerCase().replace(' ', '-')}
							variant='wallet'
						>
							{item.name}
						</ButtonMain>
					))}
				</div>

				{error && <p className='text-danger text-caption'>{error}</p>}
			</div>
		</AuthForm>
	);
}
