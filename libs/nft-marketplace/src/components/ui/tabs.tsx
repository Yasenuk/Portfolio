'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@portfolio/nft-marketplace-utils';

interface TabsContextValue {
	value: string;
	setValue: (next: string) => void;
	baseId: string;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabs(component: string) {
	const ctx = React.useContext(TabsContext);
	if (!ctx) throw new Error(`<${component}> must be used inside <Tabs>`);
	return ctx;
}


interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
	value?: string;
	defaultValue: string;
	onValueChange?: (value: string) => void;
}

function Tabs({ className, value, defaultValue, onValueChange, children, ...props }: TabsProps) {
	const [internal, setInternal] = React.useState(defaultValue);
	const baseId = React.useId();

	const isControlled = value !== undefined;
	const active = isControlled ? value : internal;

	const setValue = React.useCallback((next: string) => {
		if (!isControlled) setInternal(next);
		onValueChange?.(next);
	}, [isControlled, onValueChange]);

	const ctx = React.useMemo(
		() => ({ value: active, setValue, baseId }),
		[active, setValue, baseId]
	);

	return (
		<TabsContext.Provider value={ctx}>
			<div className={cn('w-full flex flex-col gap-5', className)} {...props}>
				{children}
			</div>
		</TabsContext.Provider>
	);
}

function TabsList({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	const listRef = React.useRef<HTMLDivElement>(null);

	function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
		const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
		if (!keys.includes(e.key)) return;

		const tabs = Array.from(
			listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])') ?? []
		);
		if (tabs.length === 0) return;

		const current = tabs.findIndex((t) => t === document.activeElement);
		let next = current;

		if (e.key === 'ArrowRight') next = (current + 1) % tabs.length;
		if (e.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
		if (e.key === 'Home') next = 0;
		if (e.key === 'End') next = tabs.length - 1;

		e.preventDefault();
		tabs[next]?.focus();
		tabs[next]?.click();
	}

	return (
		<div
			ref={listRef}
			role="tablist"
			onKeyDown={onKeyDown}
			className={cn('flex items-center gap-x-3 *:flex-auto', className)}
			{...props}
		>
			{children}
		</div>
	);
}

const triggerVariants = cva(
	`h-15 text-h5 font-sans cursor-pointer flex items-center justify-center gap-x-4`,
	{
		variants: {
			state: {
				active: 'text-text border-b-2 border-label focus:outline-none',
				inactive: 'bg-transparent text-label hover:text-text',
			},
		},
		defaultVariants: { state: 'inactive' },
	}
);

interface TabsTriggerProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
	Omit<VariantProps<typeof triggerVariants>, 'state'> {
	value: string;
	valueCount?: number;
}

function TabsTrigger({ className, value, valueCount, children, ...props }: TabsTriggerProps) {
	const { value: active, setValue, baseId } = useTabs('TabsTrigger');
	const isActive = active === value;

	return (
		<button
			type="button"
			role="tab"
			id={`${baseId}-tab-${value}`}
			aria-selected={isActive}
			aria-controls={`${baseId}-panel-${value}`}
			tabIndex={isActive ? 0 : -1}
			onClick={() => setValue(value)}
			className={cn(triggerVariants({ state: isActive ? 'active' : 'inactive' }), className)}
			{...props}
		>
			<span>{children}</span>
			<span className={cn(
				valueCount === undefined && 'hidden',
				'rounded text-body py-1 px-2.5 font-display font-light',
				isActive ? 'bg-label' : 'bg-bg-secondary'
			)}>{ valueCount }</span>
		</button>
	);
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
	value: string;
}

function TabsContent({ className, value, children, ...props }: TabsContentProps) {
	const { value: active, baseId } = useTabs('TabsContent');
	if (active !== value) return null;

	return (
		<div
			role="tabpanel"
			id={`${baseId}-panel-${value}`}
			aria-labelledby={`${baseId}-tab-${value}`}
			tabIndex={0}
			className={cn(className)}
			{...props}
		>
			{children}
		</div>
	);
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
