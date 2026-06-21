import { ButtonMain, Heading, NFTCard } from "@portfolio/nft-marketplace";
import { cn } from "@portfolio/nft-marketplace-utils";

export default function Hero() {
	return (
		<section>
			<div className={
				cn(
					"container lg:max-w-[1050] px-[1.875rem] flex flex-col md:flex-row",
					"items-start justify-between gap-y-5 gap-x-[1.875rem] py-10 md:py-20"
				)
			}>
				<div className="flex-[50%] flex flex-col items-start gap-y-5">
					<Heading
						gap="md"
						size="primary"
						title="Discover digital art & Collect NFTs"
						description="NFT marketplace UI created with Anima for Figma. Collect, buy and sell art from more than 20k NFT artists."
					/>
					<ButtonMain icon='rocketlaunch'>Get Started</ButtonMain>
					
				</div>
				<NFTCard
					className="flex-[50%] w-full"
					variant='highlighted'
					src='/assets/images/img.png'
					title='Space Walking'
					authorName='Animakid'
					authorSrc='/assets/images/avatar.png'
				/>
			</div>
		</section>
	);
}