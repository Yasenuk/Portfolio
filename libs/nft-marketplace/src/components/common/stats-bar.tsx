import { cn } from '@portfolio/nft-marketplace-utils';
import * as React from 'react';

const stats = [
	{ value: 240, label: "Total sale" },
	{ value: 100, label: "Auctions" },
	{ value: 240, label: "Artists" },
];

const StatsBar = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("w-full flex justify-between gap-x-[1.875rem]", className)}
		{...props}
	>
		{stats.map(stat => (
			<section className="basis-1/3 flex-shrink">
				<h3 className="text-h5 lg:text-h4 font-semibold">{stat.value}k+</h3>
				<span className="text-body lg:text-body capitalize">{stat.label}</span>
			</section>
		))}
	</div>
));
StatsBar.displayName = "StatsBar";

export { StatsBar };