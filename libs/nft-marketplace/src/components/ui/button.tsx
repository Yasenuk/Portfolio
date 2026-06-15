import * as React from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from '@portfolio/nft-marketplace-utils';
import { Icon } from '@portfolio/shared-ui';

const buttonVariants = cva(
	`px-[3.125rem] border-action border-2 flex items-center justify-center gap-x-3 rounded
	h-[2.875rem] sm:h-[3.75rem] text-body md:text-h5 md:font-semibold
	`,
	{
		variants: {
			variant: {
				default: `bg-action text-text`,
				outlined: "bg-transparent text-action",
				wallet: "bg-bg-secondary h-[3.75rem] border gap-x-5 px-10 py-[0.875rem] md:py-4 justify-start"
			},
			size: {
				default: "md:h-[4.5rem]",
				md: "",
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
	VariantProps<typeof buttonVariants> {
	icon?: string;
	};

const ButtonMain = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, variant, size, icon = '', ...props }, ref) => {
		return (
			<button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props}>
				{icon && <Icon name={icon} className={`${variant === "wallet" ? 'size-8 md:size-10' : ''}`} />}
				<span className="text-text">{children}</span>
			</button>
		)
	}
);
ButtonMain.displayName = "ButtonMain"

export { ButtonMain };