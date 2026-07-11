import * as React from 'react';

import { Card, CardContent, CardPicture, CardPictureWrapper } from '@portfolio/nft-marketplace';
import type { RankingCardProps } from "@portfolio/nft-marketplace-types";
import { cn } from '@portfolio/nft-marketplace-utils';

export function RankingCard({ rank, src, title, sales, className }: RankingCardProps & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<Card className={cn("p-5 flex items-center lg:flex-col gap-5", className)}>
			<CardPictureWrapper className="relative">
				<span className="absolute bg-bg 
				-top-[0.438rem] -left-2
				lg:-top-[0.125rem] lg:left-0 z-10 grid
				size-7.5 place-items-center
        rounded text-text">
					{rank}
				</span>
				<CardPicture
					src={src}
					width={120}
					height={120}
					className="lg:mx-auto aspect-square w-15 lg:w-[7.5rem] rounded-full"
				/>
			</CardPictureWrapper>
			<CardContent className="text-left lg:text-center p-0 text-nowrap">
				<h3 className="text-h5 font-semibold text-text mb-[0.313rem]">{title}</h3>
				<p className="text-cation text-label">
					Total Sales: <span className="text-text ml-2.5">{sales} ETH</span>
				</p>
			</CardContent>
		</Card>
	);
}