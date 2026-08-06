'use client';

import * as React from 'react';
import { ButtonMain, Form, InputMain, InputPassword } from '@portfolio/nft-marketplace';

import { apiFetch } from '../../lib/api';

export function ChangeEmailForm() {
	const [newEmail, setNewEmail] = React.useState('');
	const [currentPassword, setCurrentPassword] = React.useState('');

	const [error, setError] = React.useState<string | null>(null);
	const [sent, setSent] = React.useState(false);
	const [pending, setPending] = React.useState(false);

	async function submit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setSent(false);
		setPending(true);

		try {
			const res = await apiFetch('/api/user/email', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ newEmail, currentPassword }),
			});

			if (!res.ok) {
				const data = await res.json().catch(() => null);
				setError(data?.error ?? 'Something went wrong');
				return;
			}

			setNewEmail('');
			setCurrentPassword('');
			setSent(true);
		} catch {
			setError('Network error, try again');
		} finally {
			setPending(false);
		}
	}

	if (sent) {
		return (
			<p className="text-body col-span-2">
				Check your inbox — if the address is available, a confirmation link is waiting there.
				The link expires in 30 minutes.
			</p>
		);
	}

	return (
		<Form className="w-full lg:max-w-none gap-y-4" onSubmit={submit}>
			<InputMain
				type="email"
				icon="envelopesimple"
				placeholder="Enter Your new email"
				autoComplete="email"
				required
				value={newEmail}
				onChange={(e) => setNewEmail(e.target.value)}
			/>
			<InputPassword
				icon="lockkey"
				placeholder="Confirm with your password"
				autoComplete="current-password"
				required
				value={currentPassword}
				onChange={(e) => setCurrentPassword(e.target.value)}
			/>

			{error && <p className="text-danger text-caption">{error}</p>}

			<ButtonMain className="w-full md:w-60" size="sm" icon="pen" disabled={pending}>
				{pending ? 'Sending...' : 'Change'}
			</ButtonMain>
		</Form>
	);
}
