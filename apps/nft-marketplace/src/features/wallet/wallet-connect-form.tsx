'use client';

import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { AuthForm, ButtonMain } from "@portfolio/nft-marketplace";

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
			<div className='gap-y-5 flex flex-col items-start lg:max-w-[350px]'>
				{isConnected ? (
					<>
						<p>{address?.slice(0, 6)}…{address?.slice(-4)}</p>
						<ButtonMain type="button" onClick={() => disconnect()}>Disconnect</ButtonMain>
					</>
				) : (
					<>
						{connectors.map((connector) => (
							<ButtonMain
								type="button"
								key={connector.uid}
								disabled={isPending}
								onClick={() => connect({ connector })}
								className='w-full'
								icon={connector?.name?.toLocaleLowerCase()?.replace(" ", "-")}
								variant="wallet">{connector.name}</ButtonMain>
						))}
					</>
				)}
			</div>
		</AuthForm>
	);
}