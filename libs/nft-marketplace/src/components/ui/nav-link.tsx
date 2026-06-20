'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';

export function NavLink({ href, children, ...props }: ComponentProps<typeof Link>) {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link
			href={href}
			aria-current={isActive ? 'page' : undefined}
			className={isActive ? 'text-action' : 'text-text hover:text-action'}
			{...props}
		>
			{children}
		</Link>
	);
}