import * as React from 'react';

import { cn } from '@portfolio/nft-marketplace-utils';
import { cva, VariantProps } from 'class-variance-authority';

const tooltipVariants = cva(
	'absolute transition-all p-10 opacity-0',
	{
		variants: {
			direction: {
				center: 'group-hover:opacity-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
				top: 'group-hover:-translate-y-30 left-1/2 -translate-x-1/2 top-0 group-hover:opacity-100',
				bottom: 'group-hover:translate-y-30 left-1/2 -translate-x-1/2 bottom-0 group-hover:opacity-100',
				left: 'group-hover:-translate-x-30 top-1/2 -translate-y-1/2 right-0 group-hover:opacity-100',
				right: 'group-hover:translate-x-30 top-1/2 -translate-y-1/2 left-0 group-hover:opacity-100',
			}
		},
		defaultVariants: {
			direction: 'center'
		}
	}
);

interface TooltipProps
	extends React.HTMLAttributes<HTMLDivElement>,
	VariantProps<typeof tooltipVariants> {
	icon?: string;
}

const Tooltip = React.forwardRef<
	HTMLDivElement,
	TooltipProps
>(({ className, children, direction, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('absolute inset-0 group grid place-content-center rounded', className)}
		{...props}
	>
		<TooltipItem direction={direction}>
			{children}
		</TooltipItem>
	</div>
));
Tooltip.displayName = 'Tooltip';

const TooltipItem = React.forwardRef<
	HTMLDivElement,
	TooltipProps
>(({ className, direction, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn('', tooltipVariants({ direction }), className)}
			{...props}
		/>
	);
});
TooltipItem.displayName = 'TooltipItem';

export { Tooltip }