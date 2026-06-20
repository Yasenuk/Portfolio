import * as React from 'react';

import { NavLink } from "../ui/nav-link";
import { cn } from '@portfolio/nft-marketplace-utils';

const links = [
	{ href: '/marketplace', label: 'Marketplace' },
	{ href: '/rankings', label: 'Rankings' },
	{ href: '/connect-wallet', label: 'Connect a wallet' },
];

const NavMenu = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<nav
		ref={ref}
		className={cn("flex gap-x-[3.125rem]", className)}
		{...props}
	>
		{links.map((link) => (
			<NavLink key={link.href} href={link.href}>
				{link.label}
			</NavLink>
		))}
	</nav>
));

export { NavMenu }