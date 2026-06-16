import * as React from 'react';

import { Card, CardContent, CardPicture, CardPictureWrapper } from '@portfolio/nft-marketplace';
import { cn } from '@portfolio/nft-marketplace-utils';
import { ServiceCardProps } from '@portfolio/nft-marketplace-types';

export function ServiceCard({ src, title, description, className }: ServiceCardProps & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<Card className={cn("p-5 sm:pt-2.5 sm:pb-[1.875rem] md:px-[1.875rem] flex items-center sm:flex-col gap-5", className)}>
			<CardPictureWrapper>
				<CardPicture
					src={src}
					alt={title}
					width={250}
					height={250}
					className="md:mx-auto aspect-square min-w-20 w-[6.25rem] sm:w-[10rem] md:w-[15.625rem]"
				/>
			</CardPictureWrapper>
			<CardContent className="text-left sm:text-center p-0 text-text">
				<h3 className='text-body md:text-h5'>{title}</h3>
				<p className='text-caption md:text-body mt-2.5'>{description}</p>
			</CardContent>
		</Card>
	);
}