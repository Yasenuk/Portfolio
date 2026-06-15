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
				default: `max-h-[14.875rem] md:max-h-[18.438rem]`,
				highlighted : "h-[12.875rem] sm:h-[13.813rem] md:h-[25.063rem]"
			}
		},
		defaultVariants: {
			variant: "default",
		}
	}
);

export function NFTCard({ src, title, price, bid, authorSrc, authorName, className, variant }: NFTCardProps & React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>) {
	return (
		<Card className={className}>
			<CardPicture src={src} className={cn(cardVariants({ variant }))} />
			<CardContent>
				<h3 className="text-h5 font-semibold text-text mb-2.5">{title}</h3>
				<CardAuthor authorSrc={authorSrc} authorName={authorName} />

				{(price && bid) && (
					<div className='mt-[1.563rem] flex items-start justify-between'>
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