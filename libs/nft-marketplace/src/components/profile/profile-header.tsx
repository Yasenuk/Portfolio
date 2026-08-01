'use client';

import * as React from 'react';
import Image from 'next/image';

import { ButtonMain } from '@portfolio/nft-marketplace';
import { cn } from '@portfolio/nft-marketplace-utils';
import type { ProfileField } from '@portfolio/nft-marketplace-types';

interface ProfileHeaderProps
	extends React.HTMLAttributes<HTMLDivElement> {
	backgroundUrl?: string | null,
	avatarUrl?: string | null,
	onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: ProfileField) => void;
	disabled?: boolean;
	tooltip?: boolean;
}

const ACCEPT = 'image/jpeg,image/png,image/webp,image/avif,image/gif';

const ProfileHeader = React.forwardRef<
	HTMLDivElement,
	ProfileHeaderProps
>(({ className, backgroundUrl, avatarUrl, onFileChange, disabled, tooltip = false, ...props }, ref) => {
	const backgroundInputRef = React.useRef<HTMLInputElement>(null);
	const avatarInputRef = React.useRef<HTMLInputElement>(null);

	const fileInput = (
		r: React.RefObject<HTMLInputElement>,
		field: ProfileField,
	) => (
		<input
			ref={r}
			type="file"
			accept={ACCEPT}
			className='hidden'
			disabled={disabled}
			onChange={(e) => onFileChange?.(e, field)}
		/>
	);

	return (
		<div
			ref={ref}
			className={cn("flex flex-col items-center md:items-start", className)}
			{...props}
		>
			<div className="relative border-2 border-bg-secondary rounded h-62.5 md:h-70 lg:h-80 w-full grid place-content-center after:absolute after:bg-action-fade after:rounded after:inset-0 after:block after:pointer-events-none">
				{backgroundUrl ? (
					<Image
						src={backgroundUrl}
						alt='Background image for user profile'
						fill
						sizes="100vw"
						unoptimized={backgroundUrl.startsWith('blob:')}
						className={cn(
							'object-cover rounded',
							tooltip && 'cursor-pointer'
						)}
						onClick={() => !disabled && backgroundInputRef.current?.click()}
					/>
				) : (
					<ButtonMain
						type='button'
						px='none'
						size='none'
						className='border-2 size-20 aspect-square bg-bg-secondary'
						variant='outlined'
						icon='plus'
						onClick={() => backgroundInputRef.current?.click()}
					/>
				)}
				{fileInput(backgroundInputRef, 'backgroundUrl')}
			</div>

			<div className="relative size-30 aspect-square -translate-y-17.5 md:translate-x-15">
				{avatarUrl ? (
					<Image
						src={avatarUrl}
						alt='Avatar image for user profile'
						fill
						sizes="100vw"
						unoptimized={avatarUrl.startsWith('blob:')}
						className={cn(
							'object-cover rounded',
							tooltip && 'cursor-pointer'
						)}
						onClick={() => !disabled && avatarInputRef.current?.click()}
					/>
				) : (
					<ButtonMain
						type='button'
						px='none'
						size='none'
						className='border-2 size-20 aspect-square bg-bg-secondary'
						variant='outlined'
						icon='plus'
						onClick={() => avatarInputRef.current?.click()}
					/>
				)}
				{fileInput(avatarInputRef, 'avatarUrl')}
			</div>
		</div>
	)
});
ProfileHeader.displayName = 'ProfileHeader';

export { ProfileHeader };
