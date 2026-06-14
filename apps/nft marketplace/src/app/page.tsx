import { Icon } from '@portfolio/shared-ui';
import {
	ButtonMain,

	CategoryCard,
	NFTCard,
	RankingCard,

	RankingList,
	RankingListHeader,
	RankingListItem,
	RankingListItems
} from '@portfolio/nft marketplace';
import { TRRanckingItem } from '@portfolio/nft marketplace-types';

export default function App() {
	const author: TRRanckingItem = {
		rank: 1,
		avatar: "/assets/images/avatar.png",
		artist: "Dish Studio",
		change: 1.41,
		sold: 602,
		volume: 12.4
	};

	return (<>
		<div className="p-10 bg-bg flex items-start gap-5 flex-col">
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

			<Icon sprite='icons-category' className='size-[6.25rem]' name="paintbrush" />
			<Icon sprite='icons-category' className='size-[6.25rem]' name="musicnotes" />
			<Icon sprite='icons-category' className='size-[6.25rem]' name="camera" />

			<Icon sprite='icons-category' className='size-[6.25rem]' name="videocamera" />
			<Icon sprite='icons-category' className='size-[6.25rem]' name="basketball" />
			<Icon sprite='icons-category' className='size-[6.25rem]' name="magicwand" />

			<Icon sprite='icons-category' className='size-[6.25rem]' name="planet" />
			<Icon sprite='icons-category' className='size-[6.25rem]' name="bookmarkssimple" />
			<Icon sprite='icons-category' className='size-[6.25rem]' name="swatches" />

			<ButtonMain icon='rocketlaunch' size="md">Get Started</ButtonMain>
			<ButtonMain icon='rocketlaunch' variant="outlined">Get Started</ButtonMain>
			<ButtonMain className='w-80' icon='metamask' variant="wallet">Metamask</ButtonMain>

			<div className='flex items-start gap-10 flex-wrap'>
				<NFTCard className='w-[315px] sm:w-[330px] md:w-[510px]' variant='highlighted' src='/assets/images/img.png' title='Space Walking' authorName='Animakid' authorSrc='/assets/images/avatar.png' />
				<NFTCard className='w-[402px] md:w-[468px]' src='/assets/images/img.png' title='Space Walking' authorName='Animakid' authorSrc='/assets/images/avatar.png' price={1.63} bid={0.33} />
				<CategoryCard src='/assets/images/img.png' label='Art' icon='paintbrush' />
				<RankingCard rank={1} src='/assets/images/avatar.png' title='Dish Studio' sales='34.53' />
			</div>

			<RankingList>
				<RankingListHeader />
				<RankingListItems>
					<RankingListItem {...author} />
				</RankingListItems>
			</RankingList>
		</div>
	</>);
}