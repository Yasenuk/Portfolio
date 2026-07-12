
import { cn } from '@portfolio/nft-marketplace-utils';
import Image from 'next/image';
import * as React from 'react';
import { ButtonMain } from '../ui/button';

interface ProfileHeaderProps
	extends React.HTMLAttributes<HTMLDivElement> {
	backgroundUrl?: string,
	avatarUrl?: string,
	
}

const ProfileHeader = React.forwardRef<
	HTMLDivElement,
	ProfileHeaderProps
>(({ className, backgroundUrl, avatarUrl, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("relative", className)}
		{...props}
	>
		<div className="border-2 border-bg-secondary rounded bg-action-fade h-62.5 md:h-70 lg:h-80 w-full grid place-content-center">
			{backgroundUrl ? (
				<Image
					src={backgroundUrl}
					fill
					alt='Background image for user profile'
				/>
			) : (
				<ButtonMain px='none' size='none' className='border-2 size-20 aspect-square bg-bg-secondary' variant='outlined' icon='plus' />
			)}

		</div>
		<div className="absolute -translate-y-17.5 translate-x-1/2">
			{avatarUrl ? (
				<Image
					src={avatarUrl}
					fill
					alt='Avater image for user profile'
				/>
			) : (
				<ButtonMain px='none' size='none' className='border-2 size-30 aspect-square bg-bg-secondary' variant='outlined' icon='plus' />
			)}
		</div>
	</div>
));
ProfileHeader.displayName = 'ProfileHeader';

export { ProfileHeader };