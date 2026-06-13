import * as React from 'react';

import { Card, CardAuthor, CardContent, CardPicture } from '@portfolio/nft marketplace';
import type { NFTCardProps, TCardAuthor } from '@portfolio/nft marketplace-types';
import { cva } from 'class-variance-authority';

const cardVariants = cva(
	"",
	{
		variants: {
			variant: {
				default: `bg-action text-text`,
				outlined: "bg-transparent text-action"
			}
		},
		defaultVariants: {
			variant: "default",
		}
	}
);

export function NFTCard({ src, title, price, bid, authorSrc, authorName, className }: NFTCardProps & TCardAuthor & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<Card className={className}>
			<CardPicture src={src} className="'max-h-[8.875rem] md:'max-h-60" />
			<CardContent>
				<h3 className="text-h5 font-semibold text-text mb-2.5">{title}</h3>
				<CardAuthor authorSrc={authorSrc} authorName={authorName} />

				{(price && bid) && (
					<div>
						<div>
							<span className='text-caption text-label'>Price</span>
							<span className="text-body text-text font-display">{price}</span>
						</div>
						<div className='text-right'>
							<span className='text-caption text-label'>Highest Bid</span>
							<span className="text-body text-text font-display">{bid}</span>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}