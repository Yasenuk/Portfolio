import { ButtonMain, Heading, RankingCard } from "@portfolio/nft-marketplace";
import Link from "next/link";

export default function TopCreators() {
	return (
		<section>
			<div className="container lg:max-w-[1050] md:px-7.5 py-10 lg:py-20 grid gap-y-10 lg:gap-y-15">
				<Heading
					title="Trending collections"
					description="Checkout our weekly updated trending collection."
				/>
				<ButtonMain icon='rocketlaunch' variant='outlined' size='md' className="" asChild>
					<Link href='/ranking'>View rankings</Link>
				</ButtonMain>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7.5">
					<RankingCard rank={1} src='/assets/images/avatar.png' title='Dish Studio' sales='34.53' />
					<RankingCard rank={1} src='/assets/images/avatar.png' title='Dish Studio' sales='34.53' />
					<RankingCard rank={1} src='/assets/images/avatar.png' title='Dish Studio' sales='34.53' />
					<RankingCard rank={1} src='/assets/images/avatar.png' title='Dish Studio' sales='34.53' />
				</div>
			</div>
		</section>
	);
}