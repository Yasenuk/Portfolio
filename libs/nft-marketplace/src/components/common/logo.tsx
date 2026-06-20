'use client'

import { cn } from '@portfolio/nft-marketplace-utils';
import { Icon } from '@portfolio/shared-ui';
import Link from 'next/link';


export function Logo({ responsibility = false } : { responsibility?: boolean }) {
	return (
		<Link href='/' className='flex gap-x-3 items-center z-50'>
			<Icon name='storefront' className={
				cn("text-action", responsibility ? "size-6 lg:size-8" : "size-8")
			} />
			<span className={
				cn("font-display font-bold text-body text-text hover:text-action transition-colors duration-200",
					responsibility ? "lg:font-bold lg:text-h6" : "text-h6"
				)
			}>NFT Marketplace</span>
		</Link>
	);
}