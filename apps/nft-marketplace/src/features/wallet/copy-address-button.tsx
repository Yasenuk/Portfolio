'use client';

import { ButtonMain } from '@portfolio/nft-marketplace';
import React from 'react';

export function CopyAddressButton({ address, className }: { address: string, className?: string }) {
	const [isCopied, setIsCopied] = React.useState(false);

	const formatAddress = (address?: string) =>
		address ? `0x${address.slice(2, 6).toUpperCase()}...${address.slice(-4).toUpperCase()}` : '';

	const handleCopy = () => {
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 1500);
		return navigator.clipboard.writeText(address);
	};

	return (
		<ButtonMain
			className={className}
			size='md'
			px='sm'
			icon={isCopied ? "" : "copy"}
			onClick={() => handleCopy()}
		>
			{ isCopied ? 'Copied!' : formatAddress(address) }
		</ButtonMain>
	);
}