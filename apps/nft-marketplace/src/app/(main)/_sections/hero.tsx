import { ButtonMain, Heading, NFTCard, StatsBar } from "@portfolio/nft-marketplace";
import { cn } from "@portfolio/nft-marketplace-utils";
import Link from "next/link";

export default function Hero() {
	return (
		<section>
			<div className={
				cn(
					"container lg:max-w-[1050] md:px-[1.875rem] py-10 md:py-20",
					"hero-grid gap-y-5 gap-x-[1.875rem]"
				)
			}>
				<Heading
					className="[grid-area:heading]"
					gap="md"
					size="primary"
					title="Discover digital art & Collect NFTs"
					description="NFT marketplace UI created with Anima for Figma. Collect, buy and sell art from more than 20k NFT artists."
				/>
				<NFTCard
					className="w-full [grid-area:card]"
					variant='highlighted'
					src='/assets/images/img.png'
					title='Space Walking'
					authorName='Animakid'
					authorSrc='/assets/images/avatar.png'
				/>
				<ButtonMain icon='rocketlaunch' className="[grid-area:button]" asChild>
					<Link href='/register'>Get started</Link>
				</ButtonMain>
				<StatsBar className="[grid-area:stats]" />
			</div>
		</section>
	);
}