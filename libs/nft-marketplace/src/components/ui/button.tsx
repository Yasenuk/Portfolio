import * as React from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from '@portfolio/nft-marketplace-utils';
import { Icon } from '@portfolio/shared-ui';

const buttonVariants = cva(
	`border-action border-2 flex items-center justify-center gap-x-3 rounded
	h-[2.875rem] md:h-[3.75rem] text-body lg:font-semibold capitalize hover:scale-95
	transition-transform duration-200`,
	{
		variants: {
			variant: {
				default: "bg-action text-text",
				outlined: "bg-transparent text-action",
				wallet: "bg-bg-secondary h-[3.75rem] border gap-x-5 px-10 py-[0.875rem] lg:py-4 justify-start"
			},
			size: {
				default: "lg:h-[4.5rem] lg:text-h5",
				xs: "md:h-[2.875rem] lg:h-[2.875rem]",
				sm: "md:h-[2.875rem] lg:h-[3.75rem]",
				md: "",
			},
			px: {
				default: "px-[3.125rem]",
				sm: "px-[1.875rem]"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			px: "default"
		}
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
	VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	icon?: string;
};

const ButtonMain = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, asChild = false, variant, size, px, icon = '', ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';

		return (
			<Comp 
				ref={ref}
				className={cn(buttonVariants({ variant, size, px, className }))}
				{...props}
			>
				{icon && <Icon name={icon} className={cn(variant === 'wallet' && 'size-8 lg:size-10')} />}
				<Slottable>{children}</Slottable>
			</Comp>
		)
	}
);
ButtonMain.displayName = "ButtonMain";

export { ButtonMain };