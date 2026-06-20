'use client'

import { cn } from '@portfolio/nft-marketplace-utils';
import { Icon } from '@portfolio/shared-ui';
import Link from 'next/link';
import * as React from 'react';

export function Logo({ className } : React.ComponentProps<typeof Link>) {
	return (
		<Link
			href='/'
			className={cn('flex gap-x-3 items-center z-50', className)}
		>
			<Icon name='storefront' className='text-action size-6 lg:size-8' />
			<span className='font-display text-body lg:font-bold lg:text-h6 hover:text-action transition-colors duration-200'>NFT Marketplace</span>
		</Link>
	);
}