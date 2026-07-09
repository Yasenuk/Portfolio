'use client';

import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { AuthForm, ButtonMain, Form } from "@portfolio/nft-marketplace";

export default function WalletConnectForm() {
	const { connectors, connect, isPending } = useConnect();
	const { address, isConnected } = useAccount();
	const { disconnect } = useDisconnect();

	return (
		<AuthForm
			title='Connect wallet'
			description='Choose a wallet you want to connect. There are several wallet providers.'
			imageSrc='form_img.png'
		>
			<Form className='gap-y-5'>
				{connectors.map((connector) => (
					<ButtonMain
						key={connector.uid}
						disabled={isPending}
						onClick={() => connect({ connector })}
						className='w-full'
						icon='metamask'
						variant="wallet">{connector.name}</ButtonMain>
				))}
			</Form>
		</AuthForm>
	);
}