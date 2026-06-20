'use client'

import { Icon } from '@portfolio/shared-ui';
import Link from 'next/link';

export function Logo() {
	return (
		<Link href='/' className='flex gap-x-3 items-center z-50'>
			<Icon name='storefront' className='text-action size-6 lg:size-8' />
			<span className='font-display text-body lg:font-bold lg:text-h6'>NFT Marketplace</span>
		</Link>
	);
}