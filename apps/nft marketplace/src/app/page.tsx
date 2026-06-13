import { Icon } from '@portfolio/shared-ui';
import { ButtonMain } from '@portfolio/nft marketplace';

export default function App() {
	return (<>
		<div className="p-40 bg-bg flex items-start gap-5 flex-col">
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

			<Icon sprite='icons-category' width={100} height={100} name="paintbrush" />
			<Icon sprite='icons-category' width={100} height={100} name="musicnotes" />
			<Icon sprite='icons-category' width={100} height={100} name="camera" />

			<Icon sprite='icons-category' width={100} height={100} name="videocamera" />
			<Icon sprite='icons-category' width={100} height={100} name="basketball" />
			<Icon sprite='icons-category' width={100} height={100} name="magicwand" />

			<Icon sprite='icons-category' width={100} height={100} name="planet" />
			<Icon sprite='icons-category' width={100} height={100} name="bookmarkssimple" />
			<Icon sprite='icons-category' width={100} height={100} name="swatches" />
			
			<ButtonMain size="md">Button</ButtonMain>
			<ButtonMain variant="outlined">Button</ButtonMain>
		</div>
	</>);
}