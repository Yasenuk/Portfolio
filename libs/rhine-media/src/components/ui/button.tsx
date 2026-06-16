import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@portfolio/shared-utils';

const buttonVariants = cva(
	`inline-flex items-center justify-center gap-x-2
	rounded-full font-semibold text-body
	px-7 py-[0.875rem] transition-all duration-300
	hover:-translate-y-[0.125rem]`,
	{
		variants: {
			variant: {
				default: `
					capitalize
					bg-g-gold text-black bg-gold hover:shadow-glow hover:-translate-y-0.5 hover:brightness-105
				`,
				outlined: `
					border border-line hover:border-line-gold hover:bg-line-soft
					hover:text-gold-lt
				`,
			},
			size: { default: '', sm: 'h-[2.875rem] px-6 text-caption' },
		},
		defaultVariants: { variant: 'default', size: 'default' },
	}
);

interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
	VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const ButtonMain = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				ref={ref}
				className={cn(buttonVariants({ variant, size, className }))}
				{...props}
			/>
		);
	}
);
ButtonMain.displayName = 'ButtonMain';

export { ButtonMain, buttonVariants };