import { Icon } from '@portfolio/shared-ui';
import {
	ActionTimer,
	AuthForm,
	ButtonMain,

	CategoryCard,
	Form,
	InputMain,
	InputPassword,
	NFTCard,
	RankingCard,

	RankingList,
	RankingListHeader,
	RankingListItem,
	RankingListItems,
	ServiceCard,
	SubscribeForm
} from '@portfolio/nft-marketplace';
import { TRRanckingItem } from '@portfolio/nft-marketplace-types';
import Hero from './_sections/hero';
import Collections from './_sections/collections';
import TopCreators from './_sections/top-creators';
import Categories from './_sections/categories';
import MoreNFTs from './_sections/more-nfts';
import Highlight from './_sections/highlight';
import HowItWorks from './_sections/how-it-works';
import Subscribe from './_sections/subscribe';

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
		<Hero />
		<Collections />
		<TopCreators />
		<Categories />
		<MoreNFTs />
		<Highlight />
		<HowItWorks />
		<Subscribe />

		<AuthForm
			title='Connect wallet'
			description='Choose a wallet you want to connect. There are several wallet providers.'
			imageSrc='form_img.png'
		>
			<Form className='gap-y-5'>
				<ButtonMain className='w-full' icon='metamask' variant="wallet">Metamask</ButtonMain>
				<ButtonMain className='w-full' icon='metamask' variant="wallet">Metamask</ButtonMain>
				<ButtonMain className='w-full' icon='metamask' variant="wallet">Metamask</ButtonMain>
			</Form>
		</AuthForm>

		

		<div className="container items-start gap-5 flex-col hidden">

			<div className='flex flex-wrap gap-5'>
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

			<div className='flex flex-wrap gap-5'>
				<Icon sprite='icons-category' className='size-[6.25rem]' name="paintbrush" />
				<Icon sprite='icons-category' className='size-[6.25rem]' name="musicnotes" />
				<Icon sprite='icons-category' className='size-[6.25rem]' name="camera" />

				<Icon sprite='icons-category' className='size-[6.25rem]' name="videocamera" />
				<Icon sprite='icons-category' className='size-[6.25rem]' name="basketball" />
				<Icon sprite='icons-category' className='size-[6.25rem]' name="magicwand" />

				<Icon sprite='icons-category' className='size-[6.25rem]' name="planet" />
				<Icon sprite='icons-category' className='size-[6.25rem]' name="bookmarkssimple" />
				<Icon sprite='icons-category' className='size-[6.25rem]' name="swatches" />
			</div>

			<div className='flex flex-wrap gap-5'>
				<ButtonMain>Get Started</ButtonMain>
				<ButtonMain icon='rocketlaunch' size="md">Get Started</ButtonMain>
				<ButtonMain icon='rocketlaunch' variant="outlined">Get Started</ButtonMain>
				<ButtonMain className='w-80' icon='metamask' variant="wallet">Metamask</ButtonMain>
			</div>

			<div className='flex flex-wrap gap-5'>
				<InputMain />
				<InputMain icon='user' />
				<InputPassword />
				<InputPassword icon='user' />
			</div>

			<SubscribeForm icon='envelopesimple' />

			<div className='flex items-start gap-10 flex-wrap'>
				<NFTCard className='w-[315px] md:w-[330px] lg:w-[510px]' variant='highlighted' src='/assets/images/img.png' title='Space Walking' authorName='Animakid' authorSrc='/assets/images/avatar.png' />
				<NFTCard className='w-full lg:w-[468px]' src='/assets/images/img.png' title='Space Walking' authorName='Animakid' authorSrc='/assets/images/avatar.png' price={1.63} bid={0.33} />
				<CategoryCard src='/assets/images/img.png' label='Art' icon='paintbrush' />
				<RankingCard rank={1} src='/assets/images/avatar.png' title='Dish Studio' sales='34.53' />
			</div>

			<div className='flex flex-col md:flex-row md:justify-between gap-x-[1.875rem] gap-y-5'>
				<ServiceCard
					src='/assets/illustrations/wallet.svg'
					title='Setup Your wallet'
					description='Set up your wallet of choice. Connect it to the NFT market by clicking the wallet icon in the top right corner.'
				/>
				<ServiceCard
					src='/assets/illustrations/wallet.svg'
					title='Setup Your wallet'
					description='Set up your wallet of choice. Connect it to the NFT market by clicking the wallet icon in the top right corner.'
				/>
				<ServiceCard
					src='/assets/illustrations/wallet.svg'
					title='Setup Your wallet'
					description='Set up your wallet of choice. Connect it to the NFT market by clicking the wallet icon in the top right corner.'
				/>
			</div>

			<ActionTimer total={215999} />

			<RankingList>
				<RankingListHeader />
				<RankingListItems>
					<RankingListItem {...author} />
					<RankingListItem {...author} />
				</RankingListItems>
			</RankingList>
		</div >
	</>);
}