'use client'

import * as React from 'react';

import { useRouter } from 'next/navigation';
import { useSession } from './auth-provider';

import { ButtonMain } from "@portfolio/nft-marketplace";


export function LogoutButton() {
	const router = useRouter();

	const { setUser } = useSession();

	const [error, setError] = React.useState<string | null>(null);
	const [pending, setPending] = React.useState(false);

	async function submit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);

		setPending(true);

		try {
			await fetch('/api/auth/logout', { method: 'POST' });
			setUser(null);
			router.push('/');
			router.refresh();
		} catch {
			setError('Network error, try again');
		} finally {
			setPending(false);
		}
	};

	return (
		<ButtonMain
			onClick={submit}
			disabled={pending}
			accentColor="danger"
			variant='outlined'
			size='sm'
			className="row-span-2 col-end-8"
			icon="arrowleft">
			Logout
		</ButtonMain>
	)
}