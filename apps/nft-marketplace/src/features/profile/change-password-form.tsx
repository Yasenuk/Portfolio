'use client';

import * as React from 'react';
import { ButtonMain, Form, InputPassword } from '@portfolio/nft-marketplace';

import { apiFetch } from '../../lib/api';
import { useSession } from '../auth/auth-provider';

export function ChangePasswordForm() {
	const { refetch } = useSession();

	const [currentPassword, setCurrentPassword] = React.useState('');
	const [newPassword, setNewPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');

	const [error, setError] = React.useState<string | null>(null);
	const [success, setSuccess] = React.useState(false);
	const [pending, setPending] = React.useState(false);

	async function submit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setSuccess(false);

		if (newPassword !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		setPending(true);

		try {
			const res = await apiFetch('/api/user/password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ currentPassword, newPassword }),
			});

			if (!res.ok) {
				const data = await res.json().catch(() => null);
				setError(data?.error ?? 'Something went wrong');
				return;
			}

			setCurrentPassword('');
			setNewPassword('');
			setConfirmPassword('');
			setSuccess(true);

			await refetch();
		} catch {
			setError('Network error, try again');
		} finally {
			setPending(false);
		}
	}

	return (
		<Form className="w-full lg:max-w-none gap-y-4" onSubmit={submit}>
			<InputPassword
				icon="lockkey"
				placeholder="Current password"
				autoComplete="current-password"
				required
				value={currentPassword}
				onChange={(e) => setCurrentPassword(e.target.value)}
			/>
			<InputPassword
				icon="lockkey"
				placeholder="New password"
				autoComplete="new-password"
				required
				minLength={8}
				value={newPassword}
				onChange={(e) => setNewPassword(e.target.value)}
			/>
			<InputPassword
				icon="lockkey"
				placeholder="Repeat new password"
				autoComplete="new-password"
				required
				minLength={8}
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
			/>

			{error && <p className="text-danger text-caption">{error}</p>}
			{success && (
				<p className="text-action text-caption">
					Password updated. All other sessions were signed out.
				</p>
			)}

			<ButtonMain className="w-full md:w-60" size="sm" icon="pen" disabled={pending}>
				{pending ? 'Saving...' : 'Change password'}
			</ButtonMain>
		</Form>
	);
}
