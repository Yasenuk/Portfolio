import * as React from 'react';

import { Card, CardContent, CardPicture, CardPictureWrapper } from '@portfolio/nft-marketplace';
import type { RankingCardProps } from "@portfolio/nft-marketplace-types";
import { cn } from '@portfolio/nft-marketplace-utils';

export function RankingCard({ rank, src, title, sales, className }: RankingCardProps & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<Card className={cn("p-5 flex items-center md:flex-col gap-5", className)}>
			<CardPictureWrapper className="relative">
				<span className="absolute bg-bg 
				-top-[0.438rem] -left-2
				md:-top-[0.125rem] md:left-0 z-10 grid
				size-[1.875rem] place-items-center
        rounded text-text">
					{rank}
				</span>
				<CardPicture
					src={src}
					className="md:mx-auto aspect-square w-[3.75rem] md:w-[7.5rem] rounded-full"
				/>
			</CardPictureWrapper>
			<CardContent className="text-center md:text-center p-0 text-nowrap">
				<h3 className="text-h5 font-semibold text-text mb-[0.313rem]">{title}</h3>
				<p className="text-cation text-label">
					Total Sales: <span className="text-text ml-2.5">{sales} ETH</span>
				</p>
			</CardContent>
		</Card>
	);
}