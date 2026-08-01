'use client'

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { AuthForm, ButtonMain, ProfileHeader } from '@portfolio/nft-marketplace';
import { useProfileImages } from '@portfolio/nft-marketplace-hooks';
import { useSession } from '../auth/auth-provider';

export default function ProfileCreateForm() {
	const { refetch } = useSession();
	const router = useRouter();
	const { images, status, error, isBusy, onFileChange } = useProfileImages({ onSaved: refetch });

	const label = isBusy
		? status.avatarUrl === 'saving' || status.backgroundUrl === 'saving'
			? 'Saving...'
			: 'Uploading...'
		: 'Continue';

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
					disabled={isBusy}
				/>

				{error && <p className='text-danger text-caption'>{error}</p>}

				<ButtonMain
					type='button'
					size='xs'
					disabled={isBusy}
					onClick={() => router.push('/')}
				>
					{label}
				</ButtonMain>
			</div>
		</AuthForm>
	);
}
