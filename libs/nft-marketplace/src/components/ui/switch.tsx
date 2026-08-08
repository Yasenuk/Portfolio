"use client";

import { cn } from '@portfolio/nft-marketplace-utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const switchVariants = cva(
	`relative inline-flex shrink-0 items-center rounded-full border-2 p-1
	transition-colors duration-200 cursor-pointer
	focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action
	disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100`,
	{
		variants: {
			variant: {
				default: 'border-transparent bg-bg-secondary data-[state=checked]:bg-action',
				outlined: 'border-action bg-transparent data-[state=checked]:bg-action/20',
			},
			size: {
				default: 'h-8 w-14',
				sm: 'h-6 w-11',
			},
		},
		defaultVariants: { variant: 'default', size: 'default' },
	}
);

const thumbVariants = cva(
	'pointer-events-none rounded-full bg-white transition-transform duration-200',
	{
		variants: {
			size: {
				default: 'size-5 data-[state=checked]:translate-x-6',
				sm: 'size-4 data-[state=checked]:translate-x-5',
			},
		},
		defaultVariants: { size: 'default' },
	}
);

interface SwitchProps
	extends Omit<React.ComponentProps<'button'>, 'onChange' | 'value'>,
	VariantProps<typeof switchVariants> {
	checked?: boolean;
	defaultChecked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
}

function Switch({
	className,
	variant,
	size,
	checked,
	defaultChecked = false,
	onCheckedChange,
	disabled,
	...props
}: SwitchProps) {
	const [internal, setInternal] = React.useState(defaultChecked);
	
	const isControlled = checked !== undefined;
	const on = isControlled ? checked : internal;
	const state = on ? 'checked' : 'unchecked';

	function toggle() {
		if (!isControlled) setInternal(!on);
		onCheckedChange?.(!on);
	}

	return (
		<button
			type="button"
			role="switch"
			aria-checked={on}
			data-state={state}
			disabled={disabled}
			onClick={toggle}
			className={cn(switchVariants({ variant, size }), className)}
			{...props}
		>
			<span data-state={state} className={thumbVariants({ size })} />
		</button>
	);
}
Switch.displayName = 'Switch';

export { Switch };