import { cn } from '@portfolio/nft-marketplace-utils';
import * as React from 'react';

const statsValues = [
	{ value: 240, label: "Total sale" },
	{ value: 100, label: "Auctions" },
	{ value: 240, label: "Artists" },
];

interface StatsBarProps
	extends React.HTMLAttributes<HTMLDivElement> {
	stats?: { value: string; label: string }[]
}

const StatsBar = React.forwardRef<
	HTMLDivElement,
	StatsBarProps
>(({ className, stats = statsValues, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("w-full flex justify-between gap-x-7.5", className)}
		{...props}
	>
		{stats.map(stat => (
			<section key={stat.label} className="basis-1/3 flex-shrink">
				<h3 className="text-h5 lg:text-h4 font-semibold">{stat.value}k+</h3>
				<span className="text-body lg:text-body capitalize whitespace-nowrap">{stat.label}</span>
			</section>
		))}
	</div>
));
StatsBar.displayName = "StatsBar";

export { StatsBar };