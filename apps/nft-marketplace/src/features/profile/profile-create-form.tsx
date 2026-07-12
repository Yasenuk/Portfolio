'use client'

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { AuthForm, ButtonMain, ProfileHeader } from '@portfolio/nft-marketplace';
import { useSession } from '../auth/auth-provider';
import { apiFetch } from '../../lib/api';

type ProfileField = 'avatarUrl' | 'backgroundUrl';
type Status = 'idle' | 'uploading' | 'saving';

const MAX_SIZE = 10 * 1024 * 1024;

export default function ProfileCreateForm() {
	const { refetch } = useSession();
	const router = useRouter();

	const [images, setImages] = React.useState<Record<ProfileField, string | null>>({
		avatarUrl: null,
		backgroundUrl: null,
	});
	const [status, setStatus] = React.useState<Status>('idle');
	const [error, setError] = React.useState<string | null>(null);

	async function onFileChange(e: React.ChangeEvent<HTMLInputElement>, field: ProfileField) {
		const file = e.target.files?.[0];
		e.target.value = '';
		if (!file) return;

		setError(null);

		if (!file.type.startsWith('image/')) return setError('Only images are allowed');
		if (file.size > MAX_SIZE) return setError('Max file size is 10 MB');

		const localPreview = URL.createObjectURL(file);
		setImages((prev) => ({ ...prev, [field]: localPreview }));
		setStatus('uploading');

		try {
			const res = await apiFetch('/api/upload', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					contentType: file.type,
					size: file.size,
					folder: 'users',
				}),
			});
			if (!res.ok) throw new Error((await res.json()).error);
			const { uploadUrl, publicUrl } = await res.json();

			const put = await fetch(uploadUrl, {
				method: 'PUT',
				headers: { 'Content-Type': file.type },
				body: file,
			});
			if (!put.ok) throw new Error('Upload to storage failed');

			setStatus('saving');
			const patch = await apiFetch('/api/user/profile', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ [field]: publicUrl }),
			});
			if (!patch.ok) throw new Error((await patch.json()).error);

			setImages((prev) => ({ ...prev, [field]: publicUrl }));
			await refetch();
		} catch (err) {
			setImages((prev) => ({ ...prev, [field]: null })); // відкат прев'ю
			setError(err instanceof Error ? err.message : 'Something went wrong');
		} finally {
			URL.revokeObjectURL(localPreview);
			setStatus('idle');
		}
	}

	return (
		<AuthForm
			title='Create a profile'
			description='Select a background image for your profile and an avatar. Write a bio about yourself.'
			imageSrc='form_img.png'
		>
			<div className='flex flex-col gap-y-5 w-full'>
				<ProfileHeader
					onFileChange={onFileChange}
					backgroundUrl={images.backgroundUrl}
					avatarUrl={images.avatarUrl}
				/>

				{error && <p className='text-danger text-caption'>{error}</p>}

				<ButtonMain
					type='button'
					size='xs'
					disabled={status !== 'idle'}
					onClick={() => router.push('/')}
				>
					{status === 'idle' ? 'Continue' : status === 'uploading' ? 'Uploading…' : 'Saving…'}
				</ButtonMain>
			</div>
		</AuthForm>
	);
}
