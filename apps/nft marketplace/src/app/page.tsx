import { Icon } from '@portfolio/shared-ui';
import { ButtonMain } from '@portfolio/nft marketplace';
 
export default function App() {
	return (<>
		<div className="p-40 bg-bg flex gap-5 flex-col">
			<Icon name="rocketlaunch" />
			<Icon name="rocket" />
			<Icon name="user" />
			<Icon name="envelopesimple" />
			<Icon name="lockkey" />

			<Icon name="eye" />
			<Icon name="eyeslash" />
			<Icon name="arrowright" />
			<Icon name="arrowleft" />
			<Icon name="globe" />

			<Icon name="trendup" />
			<Icon name="usercircle" />
			<Icon name="plus" />
			<Icon name="magnifyingglass" />
			<Icon name="list" /> 
			
			<Icon name="storefront" />
			<Icon name="wallet" />
			<Icon name="copy" />
			<Icon name="discordlogo" />
			<Icon name="youtubelogo" />

			<Icon name="twitterlogo" />
			<Icon name="instagramlogo" />
			<Icon name="metamask" />
			<Icon name="walletconnect" />
			<Icon name="coinbase" />			
		</div>
		<ButtonMain>Hrello</ButtonMain>
		<ButtonMain variant="outlined">Hrello</ButtonMain>
	</>);
}