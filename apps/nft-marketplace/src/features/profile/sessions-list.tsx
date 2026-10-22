'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { ButtonMain, Heading } from '@portfolio/nft-marketplace';

import { apiFetch } from '../../lib/api';

export interface SessionRow {
	id: string;
	device: string;
	ip: string | null;
	lastUsedAt: Date | null;
	createdAt: Date;
}

function formatLastUsed(date: Date | null) {
	if (!date) return 'never used';

	const minutes = Math.floor((Date.now() - new Date(date).getTime()) / 60_000);
	if (minutes < 2) return 'active now';
	if (minutes < 60) return `${minutes} min ago`;

	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours} h ago`;

	return new Date(date).toLocaleDateString();
}

export function SessionsList({
	sessions,
	currentId,
}: {
	sessions: SessionRow[];
	currentId: string;
}) {
	const router = useRouter();

	const [busy, setBusy] = React.useState<string | null>(null);
	const [error, setError] = React.useState<string | null>(null);

	const others = sessions.filter((s) => s.id !== currentId);

	async function revoke(id: string) {
		setBusy(id);
		setError(null);

		try {
			const res = await apiFetch(`/api/user/sessions/${id}`, { method: 'DELETE' });

			if (!res.ok) {
				const data = await res.json().catch(() => null);
				setError(data?.error ?? 'Something went wrong');
				return;
			}

			router.refresh();
		} catch {
			setError('Network error, try again');
		} finally {
			setBusy(null);
		}
	}

	async function revokeAll() {
		setBusy('all');
		setError(null);

		try {
			const res = await apiFetch('/api/user/sessions', { method: 'DELETE' });

			if (!res.ok) {
				const data = await res.json().catch(() => null);
				setError(data?.error ?? 'Something went wrong');
				return;
			}

			router.refresh();
		} catch {
			setError('Network error, try again');
		} finally {
			setBusy(null);
		}
	}

	return (
		<section className="flex flex-col gap-5">
			<Heading
				title="Active sessions"
				description="Devices that are currently signed in to your account."
			/>

			<ul className="flex flex-col gap-4">
				{sessions.map((item) => {
					const isCurrent = item.id === currentId;

					return (
						<li
							key={item.id}
							className="border border-bg-secondary rounded p-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
						>
							<div className="flex flex-col gap-1">
								<div className="flex items-center gap-3">
									<span className="text-body">{item.device}</span>
									{isCurrent && (
										<span className="text-caption text-action uppercase">this device</span>
									)}
								</div>

								<span className="text-caption text-label">
									{item.ip ?? 'unknown IP'} &middot; {formatLastUsed(item.lastUsedAt)}
								</span>
							</div>

							{!isCurrent && (
								<ButtonMain
									type="button"
									size="none"
									px="sm"
									variant="outlined"
									accentColor="danger"
									disabled={busy !== null}
									onClick={() => revoke(item.id)}
								>
									{busy === item.id ? 'Ending...' : 'End session'}
								</ButtonMain>
							)}
						</li>
					);
				})}
			</ul>

			{error && <p className="text-danger text-caption">{error}</p>}

			{others.length > 0 && (
				<ButtonMain
					type="button"
					size="sm"
					px="sm"
					variant="outlined"
					accentColor="danger"
					className="w-fit"
					disabled={busy !== null}
					onClick={revokeAll}
				>
					{busy === 'all' ? 'Ending...' : `End all other sessions (${others.length})`}
				</ButtonMain>
			)}
		</section>
	);
}
