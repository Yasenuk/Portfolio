'use client';

import * as React from "react";
import { cn } from '@portfolio/shared-utils';

interface BurgerMenuProps
	extends React.HTMLAttributes<HTMLDivElement> {
	controlsID?: string;
};

type BurgerMenuContextProps = {
	isOpen: boolean;
	toggle: () => void;
	close: () => void;
} & BurgerMenuProps;

const BurgerMenuContext = React.createContext<BurgerMenuContextProps | null>(null);

const useBurgerMenu = () => {
	const context = React.useContext(BurgerMenuContext);

	if (!context) {
		throw new Error('useBurgerMenu must be used within a <BurgerMenu.Root>');
	}

	return context;
}

const BurgerMenu = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & BurgerMenuProps
>((
	{ children, controlsID, className, ...props },
	ref
) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const burgerMenuRef = React.useRef<HTMLDivElement | null>(null);

	const toggle = React.useCallback(() => setIsOpen(prev => !prev), []);
	const close = React.useCallback(() => setIsOpen(false), []);

	React.useEffect(() => {
		const handler = (e: KeyboardEvent) => e.key === 'Escape' && close();
		document.addEventListener('keydown', handler)
		return () => document.removeEventListener('keydown', handler)
	}, [close])

	React.useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (burgerMenuRef.current && !burgerMenuRef.current.contains(e.target as Node)) close()
		}
		document.addEventListener('mousedown', handler)
		return () => document.removeEventListener('mousedown', handler)
	}, [close])

	React.useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : ''
		return () => { document.body.style.overflow = '' }
	}, [isOpen])

	return (
		<BurgerMenuContext.Provider value={{ isOpen, toggle, close, controlsID }}>
			<div
				ref={(node) => {
					burgerMenuRef.current = node
					if (typeof ref === 'function') ref(node)
					else if (ref) ref.current = node
				}}
				className={cn(className)}
				{...props}>
				{children}
			</div>
		</BurgerMenuContext.Provider>
	);
});

BurgerMenu.displayName = 'BurgerMenu';

const BurgerMenuTrigger = React.forwardRef<
	HTMLButtonElement,
	React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
	const { isOpen, toggle, controlsID } = useBurgerMenu();

	const lineClass = `${isOpen ? 'w-full' : 'group-hover:w-full'} block h-0.5 bg-text rounded-[1px] transition-[width, transform] duration-300`;

	return (
		<button
			ref={ref}
			onClick={toggle}
			aria-label={isOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={isOpen}
			aria-controls={controlsID}
			className={
				cn(
					"relative group z-50 flex size-6 flex-col items-start justify-around lg:hidden",
					"p-[3px]",
					className
				)
			}
			{...props}
		>
			<span className={cn("w-[70%]", lineClass, isOpen && 'translate-y-[6px] rotate-45')}></span>
			<span className={cn("w-full", lineClass, isOpen && 'opacity-0 scale-x-0')}></span>
			<span className={cn("w-[70%]", lineClass, isOpen && '-translate-y-[6px] -rotate-45')}></span>
		</button>
	)
});
BurgerMenuTrigger.displayName = 'BurgerMenuTrigger';

const BurgerMenuBackdrop = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
	const { isOpen, close } = useBurgerMenu()

	return (
		<div
			onClick={close}
			aria-hidden={true}
			className={cn(
				'fixed inset-0 z-30 transition-opacity duration-300 bg-bg',
				isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
				'lg:hidden',
				className
			)}
			{...props}
		/>
	)
}
BurgerMenuBackdrop.displayName = 'BurgerMenuBackdrop';

const BurgerMenuBody = React.forwardRef<
	HTMLDivElement,
	BurgerMenuProps
>(({ children, className, ...props }, ref) => {
	const { isOpen, controlsID } = useBurgerMenu();

	const translateClass = isOpen
		? 'translate-x-0'
		: 'translate-x-full'

	return (
		<div
			ref={ref}
			id={controlsID}
			className={cn(
				'fixed w-full lg:static top-0 right-0 z-40 flex flex-col lg:flex-row lg:translate-x-0',
				'transition-transform duration-200 justify-center items-center gap-x-[1.875rem] gap-y-10',
				'h-dvh lg:h-auto px-10 lg:px-0',
				translateClass,
				className
			)}
			{...props}
		>
			{children}
		</div>
	)
});
BurgerMenuBody.displayName = 'BurgerMenuBody';

export { BurgerMenu, BurgerMenuTrigger, BurgerMenuBackdrop, BurgerMenuBody };