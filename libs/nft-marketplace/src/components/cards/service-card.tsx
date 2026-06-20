import * as React from 'react';

import { Card, CardContent, CardPicture, CardPictureWrapper } from '@portfolio/nft-marketplace';
import { cn } from '@portfolio/nft-marketplace-utils';
import { ServiceCardProps } from '@portfolio/nft-marketplace-types';

export function ServiceCard({ src, title, description, className }: ServiceCardProps & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<Card className={cn("p-5 md:pt-2.5 md:pb-[1.875rem] lg:px-[1.875rem] flex items-center md:flex-col gap-5", className)}>
			<CardPictureWrapper>
				<CardPicture
					src={src}
					alt={title}
					width={250}
					height={250}
					className="lg:mx-auto aspect-square min-w-20 w-[6.25rem] md:w-[10rem] lg:w-[15.625rem]"
				/>
			</CardPictureWrapper>
			<CardContent className="text-left md:text-center p-0 text-text">
				<h3 className='text-body lg:text-h5'>{title}</h3>
				<p className='text-caption lg:text-body mt-2.5'>{description}</p>
			</CardContent>
		</Card>
	);
}