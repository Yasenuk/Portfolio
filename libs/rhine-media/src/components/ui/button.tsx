import * as React from 'react';
import { Link } from 'react-router-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@portfolio/shared-utils';

const buttonVariants = cva(
	`inline-flex items-center justify-center gap-x-2
	rounded-full font-semibold text-body
	px-7 h-[3.25rem] transition-all duration-300`,
	{
		variants: {
			variant: {
				default: 'bg-action-gradient text-black bg-gold shadow-glow hover:-translate-y-0.5 hover:brightness-105',
				outlined: 'border border-line text-text hover:border-action/60',
			},
			size: { default: '', sm: 'h-[2.875rem] px-6 text-caption' },
		},
		defaultVariants: { variant: 'default', size: 'default' },
	}
);

interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
	VariantProps<typeof buttonVariants> {
	to?: string;
	icon?: string;
};

const ButtonMain = React.forwardRef<
	HTMLButtonElement,
	ButtonProps
>(({ className, children, variant, size, to, ...props }, ref) => (
	<button
		ref={ref}
		className={cn(buttonVariants({ variant, size, className }))}
		{...props}
	>
		{to && (<Link to={to} />)}
		{children}
	</button>
));
ButtonMain.displayName = "ButtonMain";

export { ButtonMain };