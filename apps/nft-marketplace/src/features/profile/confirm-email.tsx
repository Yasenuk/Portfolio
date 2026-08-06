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

			setEmail(data?.email ?? null);
			setStatus('done');
			setUser(null);
		} catch {
			setError('Network error, try again');
			setStatus('failed');
		}
	}

	if (status === 'done') {
		return (
			<section className="flex flex-col items-start gap-5">
				<Heading
					title="Email confirmed"
					description={
						email
							? `Your account email is now ${email}. Sign in again to continue.`
							: 'Your account email was updated. Sign in again to continue.'
					}
				/>
				<ButtonMain size="sm" onClick={() => router.push('/login')}>
					Go to sign in
				</ButtonMain>
			</section>
		);
	}

	return (
		<section className="flex flex-col items-start gap-5">
			<Heading
				title="Confirm your new email"
				description="Confirming will update your account email and sign you out of every device."
			/>

			{error && <p className="text-danger text-caption">{error}</p>}

			<ButtonMain size="sm" icon="pen" disabled={status === 'pending'} onClick={confirm}>
				{status === 'pending' ? 'Confirming...' : 'Confirm email'}
			</ButtonMain>
		</section>
	);
}
