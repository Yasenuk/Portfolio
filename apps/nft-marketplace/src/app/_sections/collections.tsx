import { CollectionCard, Heading } from "@portfolio/nft-marketplace";

export default function Collections() {
	return (
		<section>
			<div className="container lg:max-w-[1050] md:px-[1.875rem] py-10 lg:py-20 flex flex-col gap-y-10 lg:gap-y-[3.75rem]">
				<Heading
					title="Trending collections"
					description="Checkout our weekly updated trending collection."
				/>
				<div className="flex justify-between gap-[1.875rem]">
					<CollectionCard
						src="/assets/images/img.png"
						title='Space Walking'
						authorName='Animakid'
						authorSrc='/assets/images/avatar.png'
					/>
					<CollectionCard
						src="/assets/images/img.png"
						title='Space Walking'
						authorName='Animakid'
						authorSrc='/assets/images/avatar.png'
						className="hidden md:block"
					/>
					<CollectionCard
						src="/assets/images/img.png"
						title='Space Walking'
						authorName='Animakid'
						authorSrc='/assets/images/avatar.png'
						className="hidden lg:block"
					/>
				</div>
			</div>
		</section>
	);
}