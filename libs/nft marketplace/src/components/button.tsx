import * as React from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from '@portfolio/shared-utils';
import { Icon } from '@portfolio/shared-ui';

const buttonVariants = cva(
	`px-[3.125rem] border-action border-2 flex items-center gap-x-[0.75rem]`,
	{
		variants: {
			variant: {
				default: `bg-action`,
				outlined: ""
			}
		},
		defaultVariants: {
			variant: "default"
		}
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
	VariantProps<typeof buttonVariants> { };

const ButtonMain = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, variant = 'default', ...props }, ref) => {
		return (
			<button ref={ref} className={cn(buttonVariants({ variant, className }))} {...props}>
				<Icon name="roketLaunch" />
				<span className="relative z-10">{children}</span>
			</button>
		)
	}
);
ButtonMain.displayName = "ButtonMain"

export { ButtonMain };