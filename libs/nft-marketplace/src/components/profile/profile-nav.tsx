'use client';

import * as React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@portfolio/nft-marketplace-utils';
import { ButtonMain } from '@portfolio/nft-marketplace';
import { Icon } from '@portfolio/shared-ui';

const TABS = [
	{ icon: 'storefront', href: '/profile', label: 'Overview' },
	{ icon: 'user', href: '/profile/account', label: 'Email & Account' },
	{ icon: 'lockkey', href: '/profile/security', label: 'Password & Security' },
	{ icon: 'envelopesimple', href: '/profile/notifications', label: 'Notifications' },
	{ icon: 'wallet', href: '/profile/wallets', label: 'Connected Wallets' },
	{ icon: 'eye', href: '/profile/sessions', label: 'Sessions' },
	{ icon: 'globe', href: '/profile/social', label: 'Social Links' },
	{ icon: 'usercircle', href: '/profile/settings', label: 'Settings' },
];

interface ProfileNavProps
	extends React.HTMLAttributes<HTMLDivElement> { };

const ProfileNav = React.forwardRef<
	HTMLDivElement,
	ProfileNavProps
>(({ className, ...props }, ref) => {
	const pathname = usePathname();

	return (
		<nav
			ref={ref}
			className={cn("sticky top-2.5 flex gap-2 lg:flex-col", className)}
			{...props}
		>
			{TABS.map(({ icon, href, label }) => {
				const active = href === '/profile' ? pathname === href : pathname.startsWith(href);
				return (
					<Link
						key={href}
						href={href}
						className={cn('flex gap-x-2.5 items-center whitespace-nowrap', active ? 'font-bold text-white' : 'text-muted')}
					>
						<Icon name={icon} />
						{label}
					</Link>
				);
			})}
		</nav>
	)
});
ProfileNav.displayName = "ProfileNav";

export { ProfileNav };