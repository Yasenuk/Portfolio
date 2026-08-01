'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ProfileHeader } from '@portfolio/nft-marketplace';
import { useProfileImages } from '@portfolio/nft-marketplace-hooks';
import { useSession } from '../auth/auth-provider';

interface ProfileHeaderEditableProps {
	initialAvatarUrl: string | null;
	initialBackgroundUrl: string | null;
}

export function ProfileHeaderEditable({
	initialAvatarUrl,
	initialBackgroundUrl,
}: ProfileHeaderEditableProps) {
	const { refetch } = useSession();
	const router = useRouter();

	const onSaved = React.useCallback(async () => {
		await refetch();
		router.refresh();
	}, [refetch, router]);

	const { images, error, isBusy, onFileChange } = useProfileImages({
		initial: { avatarUrl: initialAvatarUrl, backgroundUrl: initialBackgroundUrl },
		onSaved,
	});

	return (
		<>
			<ProfileHeader
				onFileChange={onFileChange}
				backgroundUrl={images.backgroundUrl}
				avatarUrl={images.avatarUrl}
				disabled={isBusy}
				tooltip
			/>
			{error && <p className='text-danger text-caption'>{error}</p>}
		</>
	);
}