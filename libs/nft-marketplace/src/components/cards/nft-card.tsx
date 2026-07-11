import * as React from 'react';

import { Card, CardAuthor, CardContent, CardPicture } from '@portfolio/nft-marketplace';
import type { NFTCardProps } from '@portfolio/nft-marketplace-types';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@portfolio/nft-marketplace-utils';

const cardVariants = cva(
	"",
	{
		variants: {
			variant: {
				default: `max-h-[238px] md:max-h-[295px]`,
				highlighted : "h-[206px] md:h-[221px] lg:h-[401px]"
			},
		},
		defaultVariants: {
			variant: "default",
		}
	}
);

export function NFTCard({ src, title, price, bid, authorSrc, authorName, className, variant }: NFTCardProps & React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>) {
	return (
		<Card className={className}>
			<CardPicture
				src={src}
				width={510}
				height={510}
				className={cn(cardVariants({ variant }))}
			/>
			<CardContent>
				<h3 className="text-h5 font-semibold text-text mb-2.5">{title}</h3>
				<CardAuthor authorSrc={authorSrc} authorName={authorName} />

				{(price && bid) && (
					<div className='mt-6.25 flex items-start justify-between'>
						<div className='flex flex-col gap-y-2'>
							<span className='text-caption text-label'>Price</span>
							<span className="text-body text-text font-display">{price} ETH</span>
						</div>
						<div className='text-right flex flex-col gap-y-2'>
							<span className='text-caption text-label'>Highest Bid</span>
							<span className="text-body text-text font-display">{bid} wETH</span>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}