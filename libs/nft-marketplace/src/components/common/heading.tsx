import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../../shared/utils/src';

const headingVariants = cva(
	"flex flex-col",
	{
		variants: {
			gap: {
				default: "gap-y-5",
				md: "gap-y-2.5 md:gap-y-5",
				sm: "gap-y-2.5"
			}
		},
		defaultVariants: {
			gap: 'default'
		}
	}
);

const headingTitleVariants = cva(
	"text-h4 font-semibold capitalize",
	{
		variants: {
			size: {
				default: "md:text-h3",
				lg: "text-h3 lg:text-h2",
				primary: "md:text-h3 lg:text-h1"
			}
		},
		defaultVariants: {
			size: 'default'
		}
	}
);

interface HeadingProps
	extends React.HTMLAttributes<HTMLDivElement>,
	VariantProps<typeof headingVariants>,
	VariantProps<typeof headingTitleVariants> {
	title: string;
	description?: string;
};

const Heading = React.forwardRef<
	HTMLDivElement,
	HeadingProps
>(({ className, gap, size, title, description, ...props }, ref) => {
	const Title = size === 'primary' ? "h1" : "h2";

	return (
		<div
			ref={ref}
			className={cn(headingVariants({ gap, className }))}
			{...props}
		>
			<Title className={cn(headingTitleVariants({ size, className }))}>{title}</Title>
			<p className='text-body lg:text-h6'>{ description }</p>
		</div>
	)
});
Heading.displayName = "Heading";

export { Heading };