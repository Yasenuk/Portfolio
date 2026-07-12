'use client';

import { cn } from '@portfolio/nft-marketplace-utils';
import * as React from 'react';
import { ButtonMain } from '../ui/button';

type ProfileField = 'avatarUrl' | 'backgroundUrl';

interface ProfileHeaderProps
	extends React.HTMLAttributes<HTMLDivElement> {
	backgroundUrl?: string | null,
	avatarUrl?: string | null,
	onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: ProfileField) => void;
}

const ACCEPT = 'image/jpeg,image/png,image/webp,image/avif,image/gif';

const ProfileHeader = React.forwardRef<
	HTMLDivElement,
	ProfileHeaderProps
>(({ className, backgroundUrl, avatarUrl, onFileChange, ...props }, ref) => {
	const backgroundInputRef = React.useRef<HTMLInputElement>(null);
	const avatarInputRef = React.useRef<HTMLInputElement>(null);

	return (
		<div
			ref={ref}
			className={cn("", className)}
			{...props}
		>
			<div className="relative overflow-hidden border-2 border-bg-secondary rounded h-62.5 md:h-70 lg:h-80 w-full grid place-content-center after:absolute after:bg-action-fade after:inset-0 after:block">
				{backgroundUrl ? (
					<img
						src={backgroundUrl}
						alt='Background image for user profile'
						className='absolute inset-0 size-full object-cover'
					/>
				) : (
					<>
						<ButtonMain
							type='button'
							px='none'
							size='none'
							className='border-2 size-20 aspect-square bg-bg-secondary'
							variant='outlined'
							icon='plus'
							onClick={() => backgroundInputRef.current?.click()}
						/>
						<input
							ref={backgroundInputRef}
							type="file"
							accept={ACCEPT}
							className='hidden'
							onChange={(e) => onFileChange?.(e, 'backgroundUrl')}
						/>
					</>
				)}
			</div>

			<div className="relative overflow-hidden size-30 aspect-square -translate-y-17.5 translate-x-15">
				{avatarUrl ? (
					<img
						src={avatarUrl}
						alt='Avatar image for user profile'
						className='absolute inset-0 size-full object-cover border-2 border-bg-secondary rounded'
					/>
				) : (
					<>
						<ButtonMain
							type='button'
							px='none'
							size='none'
							className='border-2 size-30 aspect-square bg-bg-secondary'
							variant='outlined'
							icon='plus'
							onClick={() => avatarInputRef.current?.click()}
						/>
						<input
							ref={avatarInputRef}
							type="file"
							accept={ACCEPT}
							className='hidden'
							onChange={(e) => onFileChange?.(e, 'avatarUrl')}
						/>
					</>
				)}
			</div>
		</div>
	)
});
ProfileHeader.displayName = 'ProfileHeader';

export { ProfileHeader };
