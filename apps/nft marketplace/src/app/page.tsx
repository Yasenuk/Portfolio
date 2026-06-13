import { Icon } from '@portfolio/shared-ui';
import { ButtonMain, Card, CardBadge, CardContent, CardPicture, CardPictureWrapper, CategoryCard, NFTCard, RankingCard } from '@portfolio/nft marketplace';

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

			<div className='flex gap-10 flex-wrap'>
				<Card className='w-[510px]'>
					<CardPictureWrapper>
						<CardPicture className='max-h-[401px]' src='/assets/images/img.png' />
						<CardBadge>
							<Icon sprite='icons-category' width={100} height={100} name="camera" />
						</CardBadge>
					</CardPictureWrapper>
					<CardContent>
						<h2 className='text-h5 text-text font-semibold'>Space Walking</h2>
					</CardContent>
				</Card>
				<Card className='w-[510px]'>
					<CardPicture className='max-h-[401px]' src='/assets/images/img.png' />
					<CardContent>
						<h2 className='text-h5 text-text font-semibold'>Space Walking</h2>
					</CardContent>
				</Card>
				<Card>
					<CardPicture src='/assets/images/avatar.png' />
					<CardContent>
						<h2 className='text-h5 text-text font-semibold'>Space Walking</h2>
					</CardContent>
				</Card>
			</div>
			<div className='flex items-start gap-10 flex-wrap'>
				<NFTCard src='/assets/images/img.png' title='Space Walking' authorName='NFT Artist' authorSrc='/assets/images/avatar.png' />
				<CategoryCard src='/assets/images/img.png' label='Art' icon='paintbrush' />
				<RankingCard rank={1} src='/assets/images/avatar.png' title='Dish Studio' sales='34.53' />
			</div>
		</div>
	</>);
}