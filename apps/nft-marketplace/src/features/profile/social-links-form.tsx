'use client';

import * as React from 'react';

import { ButtonMain, Heading, InputMain } from "@portfolio/nft-marketplace";
import type { SocialLinks, SocialPlatform } from '@portfolio/nft-marketplace-types';

import { apiFetch } from '../../lib/api';

const FIELDS = [
	{ key: 'website', placeholder: 'https://example.com' },
	{ key: 'twitter', placeholder: 'https://x.com/example' },
	{ key: 'instagram', placeholder: 'https://www.instagram.com/example' },
	{ key: 'discord', placeholder: 'https://discord.gg/example' },
	{ key: 'youtube', placeholder: 'https://www.youtube.com/@example' },
] as const;

type Status = 'idle' | 'pending' | 'done' | 'failed';

export default function SocialLinksForm({ initial }: { initial: SocialLinks }) {
	const [links, setLinks] = React.useState<SocialLinks>(initial);

	const [status, setStatus] = React.useState<Status>('idle');
	const [error, setError] = React.useState<string | null>(null);

	const update = (key: SocialPlatform, value: string) =>
		setLinks(prev => ({ ...prev, [key]: value }));

	async function submit(e: React.FormEvent) {
		e.preventDefault();

		setStatus('pending');
		setError(null);

		try {
			const res = await apiFetch('/api/user/profile/social-links', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(links),
			});

			const data = await res.json().catch(() => null);

			if (!res.ok) {
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

	return (
		<form onSubmit={submit}>
			<Heading
				title="Social links"
				description="Add your social links."
			/>
			<div className="grid gap-x-3 gap-y-4 mt-5 mb-8 lg:grid-cols-2">
				{FIELDS.map(({ key, placeholder }) => (
					<InputMain
						key={key}
						icon={key}
						pholder="sm"
						placeholder={placeholder}
						value={links[key]}
						onChange={e => update(key, e.target.value)}
					/>
				))}
			</div>
			<ButtonMain disabled={status === 'pending'} px='sm' size='md' className="w-full lg:w-60">
				{ status === 'pending' ? 'Saving...' : 'Save' }
			</ButtonMain>
		</form>
	)
}