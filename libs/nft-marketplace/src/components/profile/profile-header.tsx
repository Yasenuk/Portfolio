'use client';

import * as React from 'react';
import Image from 'next/image';

import { ButtonMain } from '@portfolio/nft-marketplace';

import { cn } from '@portfolio/nft-marketplace-utils';

type ProfileField = 'avatarUrl' | 'backgroundUrl';

interface ProfileHeaderProps
	extends React.HTMLAttributes<HTMLDivElement> {
	backgroundUrl?: string | null,
	avatarUrl?: string | null,
	onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: ProfileField) => void;
	tooltip?: boolean;
}

const ACCEPT = 'image/jpeg,image/png,image/webp,image/avif,image/gif';

const ProfileHeader = React.forwardRef<
	HTMLDivElement,
	ProfileHeaderProps
>(({ className, backgroundUrl, avatarUrl, onFileChange, tooltip = false, ...props }, ref) => {
	const backgroundInputRef = React.useRef<HTMLInputElement>(null);
	const avatarInputRef = React.useRef<HTMLInputElement>(null);

	return (
		<div
			ref={ref}
			className={cn("", className)}
			{...props}
		>
			<div className="relative border-2 border-bg-secondary rounded h-62.5 md:h-70 lg:h-80 w-full grid place-content-center after:absolute after:bg-action-fade after:rounded after:inset-0 after:block after:pointer-events-none">
				{backgroundUrl ? (
					<>
						<Image
							src={backgroundUrl}
							alt='Background image for user profile'
							fill
							className={cn(
								'object-cover rounded',
								tooltip && 'cursor-pointer'
							)}
							
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

			<div className="relative size-30 aspect-square -translate-y-17.5 translate-x-15">
				{avatarUrl ? (
					<>
						<Image
							src={avatarUrl}
							alt='Avatar image for user profile'
							fill
							className={cn(
								'object-cover border-2 border-bg-secondary rounded',
								tooltip && 'cursor-pointer'
							)}
						/>
					</>
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
