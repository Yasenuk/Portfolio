import * as React from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from '@portfolio/nft-marketplace-utils';
import { Icon } from '@portfolio/shared-ui';

const buttonVariants = cva(
	`border-2 flex items-center justify-center gap-x-3 rounded
	h-11.5 md:h-15 lg:font-semibold capitalize hover:scale-95
	transition-transform duration-200 cursor-pointer`,
	{
		variants: {
			variant: {
				default: "bg-action text-text",
				outlined: "bg-transparent text-action",
				wallet: "bg-bg-secondary h-15 border gap-x-5 px-10 py-3.5 lg:py-4 justify-start"
			},
			size: {
				default: "lg:h-18 lg:text-h5",
				xs: "md:h-11.5 lg:h-11.5",
				sm: "md:h-11.5 lg:h-15",
				md: "h-15",
				none: 'h-auto md:h-auto'
			},
			px: {
				default: "px-12.5",
				sm: "px-7.5",
				none: ""
			},
			accentColor: {
				default: "border-action text-body",
				danger: "border-danger text-danger"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			px: "default",
			accentColor: 'default'
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
	({ className, children, asChild = false, variant, size, px, icon = '', accentColor, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';

		return (
			<Comp 
				ref={ref}
				className={cn(buttonVariants({ variant, size, px, className, accentColor }))}
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