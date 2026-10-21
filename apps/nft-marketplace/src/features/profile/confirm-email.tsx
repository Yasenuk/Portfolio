'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ButtonMain, Heading } from '@portfolio/nft-marketplace';

import { useSession } from '../auth/auth-provider';

type Status = 'idle' | 'pending' | 'done' | 'failed';

export function ConfirmEmail({ token }: { token: string }) {
	const router = useRouter();
	const { setUser } = useSession();

	const [status, setStatus] = React.useState<Status>('idle');
	const [error, setError] = React.useState<string | null>(null);
	const [email, setEmail] = React.useState<string | null>(null);
	const [isChange, setIsChange] = React.useState(false);

	async function confirm() {
		setStatus('pending');
		setError(null);

		try {
			const res = await fetch('/api/user/email/confirm', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token }),
			});

			const data = await res.json().catch(() => null);

			if (!res.ok) {
				setError(data?.error ?? 'Something went wrong');
				setStatus('failed');
				return;
			}

			const changed = data?.isChange ?? true;

			setEmail(data?.email ?? null);
			setIsChange(changed);
			setStatus('done');

			if (changed) setUser(null);
		} catch {
			setError('Network error, try again');
			setStatus('failed');
		}
	}

	if (status === 'done') {
		return (
			<section className="flex flex-col items-start gap-5">
				<Heading
					title={isChange ? 'Email changed' : 'Email verified'}
					description={
						isChange
							? `Your account email is now ${email ?? 'updated'}. All sessions were ended — sign in again to continue.`
							: 'Your address is confirmed. Nothing else to do.'
					}
				/>
				<ButtonMain
					size="sm"
					onClick={() => router.push(isChange ? '/login' : '/profile/account')}
				>
					{isChange ? 'Go to sign in' : 'Back to profile'}
				</ButtonMain>
			</section>
		);
	}

	return (
		<section className="flex flex-col items-start gap-5">
			<Heading
				title="Confirm your email"
				description="Open the link we sent you to confirm this address."
			/>

			{error && <p className="text-danger text-caption">{error}</p>}

			<ButtonMain size="sm" icon="pen" disabled={status === 'pending'} onClick={confirm}>
				{status === 'pending' ? 'Confirming...' : 'Confirm email'}
			</ButtonMain>
		</section>
	);
}
