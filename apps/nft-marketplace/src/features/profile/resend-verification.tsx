'use client';

import * as React from 'react';
import { ButtonMain } from '@portfolio/nft-marketplace';

type Status = 'idle' | 'pending' | 'done' | 'failed';

export function ResendVerificationButton() {
	const [status, setStatus] = React.useState<Status>('idle');
	const [error, setError] = React.useState<string | null>(null);

	async function requestVerification() {
		setStatus('pending');
		setError(null);

		try {
			const res = await fetch('/api/user/email/verify', { method: 'POST' });

			if (!res.ok) {
				const data = await res.json().catch(() => null);
				setError(data?.error ?? 'Something went wrong');
				setStatus('failed');
				return;
			}

			setStatus('done');
		} catch {
			setError('Network error, try again');
			setStatus('failed');
		}
	}

	if (status === 'done') {
		return (
			<span className="text-action text-caption normal-case">
				Verification email sent — check your inbox.
			</span>
		);
	}

	return (
		<span className="inline-flex flex-col items-start gap-y-2 normal-case">
			<ButtonMain
				size="sm"
				px="sm"
				icon="envelopesimple"
				disabled={status === 'pending'}
				onClick={requestVerification}
			>
				{status === 'pending' ? 'Sending...' : 'Send verification email'}
			</ButtonMain>

			{error && <span className="text-danger text-caption">{error}</span>}
		</span>
	);
}
