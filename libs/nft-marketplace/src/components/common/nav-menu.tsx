import * as React from 'react';

import { NavLink } from "../ui/nav-link";
import { cn } from '@portfolio/nft-marketplace-utils';

const links = [
	{ href: '/marketplace', label: 'Marketplace' },
	{ href: '/rankings', label: 'Rankings' },
	{ href: '/wallet/connect', label: 'Connect a wallet' },
];

interface NavMenuProps
	extends React.HTMLAttributes<HTMLDivElement> {
	linkClassName?: string;
}

const NavMenu = React.forwardRef<
	HTMLDivElement,
	NavMenuProps
>(({ className, linkClassName, ...props }, ref) => (
	<nav
		ref={ref}
		className={cn("flex flex-col gap-y-6 gap-x-[3.125rem]", className)}
		{...props}
	>
		{links.map((link) => (
			<NavLink key={link.href} href={link.href} className={linkClassName}>
				{link.label}
			</NavLink>
		))}
	</nav>
));

export { NavMenu }