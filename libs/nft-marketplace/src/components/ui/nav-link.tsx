'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { ComponentProps } from 'react';

import { cn } from '@portfolio/nft-marketplace-utils';

export function NavLink({ className, href, children, ...props }: ComponentProps<typeof Link>) {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link
			href={href}
			aria-current={isActive ? 'page' : undefined}
			className={cn("text-body transition-colors duration-200 whitespace-nowrap", isActive ? 'text-action' : 'text-text hover:text-action', className)}
			{...props}
		>
			{children}
		</Link>
	);
}