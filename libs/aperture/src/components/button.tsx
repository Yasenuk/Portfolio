import * as React from 'react';
import { cn } from '@portfolio/shared-utils';
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
	`text-sm text-dark bg-primary rounded-[0.875rem] border border-primary p-2.5 relative transition-all duration-300 hover:text-primary`,
	{
		variants: {
			variant: {
				default: `pl-10 hover:px-[1.625rem] hover:after:w-full hover:after:left-0 hover:after:h-full 
				after:transition-all after:absolute after:w-8 after:h-8
				after:bg-dark after:rounded-[0.875rem] after:left-1 after:top-1/2 after:-translate-y-1/2`,
				main: "hover:bg-dark"
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

const ButtonPrimary = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, variant = 'default', ...props }, ref) => {
		return (
			<button ref={ref} className={cn(buttonVariants({ variant, className }))} {...props}>
				<span className="relative z-10">{children}</span>
			</button>
		)
	}
);
ButtonPrimary.displayName = "ButtonPrimary"

export { ButtonPrimary };