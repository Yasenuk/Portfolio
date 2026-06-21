import * as React from 'react';

import { Card, CardAuthor, CardContent, CardPicture, CardPictureWrapper } from '@portfolio/nft-marketplace';
import type { NFTCardProps } from '@portfolio/nft-marketplace-types';
import { cn } from '@portfolio/nft-marketplace-utils';

export function CollectionCard({ src, title, authorSrc, authorName, className }: React.HTMLAttributes<HTMLDivElement> & Omit<NFTCardProps, 'price' | 'bid'>) {
	return (
		<Card className={cn("bg-transparent rounded-none", className)}>
			<CardPictureWrapper className='collection-card-grid mb-[15px]'>
				<CardPicture
					src={src}
					width={330}
					height={330}
					className="aspect-square [grid-area:highlighted] rounded"
				/>
				<CardPicture
					src={src}
					width={95}
					height={95}
					className="aspect-square [grid-area:sec-1] rounded"
				/>
				<CardPicture
					src={src}
					width={95}
					height={95}
					className="aspect-square [grid-area:sec-2] rounded"
				/>
				<div className='aspect-square [grid-area:sec-3] rounded bg-action grid place-content-center'>
					<span className='text-body md:text-h5 font-semibold font-display'>1250+</span>
				</div>
			</CardPictureWrapper>
			<CardContent className='p-0'>
				<h3 className="text-h5 font-semibold text-text mb-2.5">{title}</h3>
				<CardAuthor authorSrc={authorSrc} authorName={authorName} />
			</CardContent>
		</Card>
	);
}