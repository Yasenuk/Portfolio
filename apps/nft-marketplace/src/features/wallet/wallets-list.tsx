'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ButtonMain, Heading } from '@portfolio/nft-marketplace';
import type { Wallet } from '@portfolio/nft-marketplace-types';

import { apiFetch } from '../../lib/api';
import { CopyAddressButton } from './copy-address-button';

const NETWORK_LABEL: Record<string, { name: string; symbol: string }> = {
	ethereum: { name: 'Ethereum', symbol: 'ETH' },
	polygon: { name: 'Polygon', symbol: 'POL' },
	bnb: { name: 'BNB Chain', symbol: 'BNB' },
};

type Action = 'unlink' | 'primary' | 'balance';

function formatBalance(value: string) {
	const n = Number(value);
	if (!Number.isFinite(n)) return value;
	return n.toFixed(4);
}

function formatUpdatedAt(date: Date | null) {
	if (!date) return 'never updated';

	const minutes = Math.floor((Date.now() - new Date(date).getTime()) / 60_000);
	if (minutes < 1) return 'updated just now';
	if (minutes < 60) return `updated ${minutes} min ago`;

	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `updated ${hours} h ago`;

	return `updated ${new Date(date).toLocaleDateString()}`;
}

export function WalletsList({ wallets }: { wallets: Wallet[] }) {
	const router = useRouter();

	const [busy, setBusy] = React.useState<Record<string, Action | undefined>>({});
	const [error, setError] = React.useState<{ id: string; message: string } | null>(null);

	const [balances, setBalances] = React.useState<Record<string, string>>({});

	async function run(id: string, action: Action, request: () => Promise<Response>) {
		setBusy((prev) => ({ ...prev, [id]: action }));
		setError(null);

		try {
			const res = await request();
			const data = await res.json().catch(() => null);

			if (!res.ok) {
				setError({ id, message: data?.error ?? 'Something went wrong' });
				return;
			}

			if (action === 'balance') {
				setBalances((prev) => ({ ...prev, [id]: data.balance }));
			} else {
				router.refresh();
			}
		} catch {
			setError({ id, message: 'Network error, try again' });
		} finally {
			setBusy((prev) => ({ ...prev, [id]: undefined }));
		}
	}

	const unlink = (id: string) =>
		run(id, 'unlink', () => apiFetch(`/api/wallet/${id}`, { method: 'DELETE' }));

	const makePrimary = (id: string) =>
		run(id, 'primary', () => apiFetch(`/api/wallet/${id}`, { method: 'PATCH' }));

	const refreshBalance = (id: string) =>
		run(id, 'balance', () => apiFetch(`/api/wallet/${id}/balance`, { method: 'POST' }));

	return (
		<section className="flex flex-col gap-5">
			<Heading
				title="Wallets"
				description="Manage the wallets linked to your account."
			/>

			{wallets.length === 0 ? (
				<p className="text-body text-label">
					No wallets linked yet. Connect one to start buying and selling.
				</p>
			) : (
				<ul className="flex flex-col gap-4">
					{wallets.map((wallet) => {
						const network = NETWORK_LABEL[wallet.network] ?? {
							name: wallet.network,
							symbol: '',
						};
						const action = busy[wallet.id];
						const balance = balances[wallet.id] ?? wallet.balanceCache;

						return (
							<li
								key={wallet.id}
								className="border border-bg-secondary rounded p-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
							>
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-3">
										<span className="text-label uppercase">{network.name}</span>
										{wallet.isPrimary && (
											<span className="text-caption text-action uppercase">primary</span>
										)}
									</div>

									<CopyAddressButton address={wallet.address} className="w-fit" />

									<span className="text-caption text-label">
										{formatBalance(balance)} {network.symbol} &middot;{' '}
										{formatUpdatedAt(wallet.balanceUpdateAt)}
									</span>
								</div>

								<div className="flex flex-wrap items-center gap-3">
									<ButtonMain
										type="button"
										size='md'
										px='sm'
										variant="outlined"
										disabled={!!action}
										onClick={() => refreshBalance(wallet.id)}
									>
										{action === 'balance' ? 'Refreshing...' : 'Refresh'}
									</ButtonMain>

									{!wallet.isPrimary && (
										<ButtonMain
											type="button"
											size='md'
											px='sm'
											variant="outlined"
											disabled={!!action}
											onClick={() => makePrimary(wallet.id)}
										>
											{action === 'primary' ? 'Saving...' : 'Make primary'}
										</ButtonMain>
									)}

									<ButtonMain
										type="button"
										size="md"
										px="sm"
										variant="outlined"
										accentColor="danger"
										disabled={!!action}
										onClick={() => unlink(wallet.id)}
									>
										{action === 'unlink' ? 'Removing...' : 'Unlink'}
									</ButtonMain>
								</div>

								{error?.id === wallet.id && (
									<p className="text-danger text-caption md:w-full">{error.message}</p>
								)}
							</li>
						);
					})}
				</ul>
			)}

			<Link href="/profile/wallets/connect" className="w-fit">
				<ButtonMain type="button" size="sm" px="sm" icon="wallet">
					Connect another wallet
				</ButtonMain>
			</Link>
		</section>
	);
}
