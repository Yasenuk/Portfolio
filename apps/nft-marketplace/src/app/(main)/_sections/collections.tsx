import { CollectionCard, Heading } from "@portfolio/nft-marketplace";

export default function Collections() {
	return (
		<section>
			<div className="container lg:max-w-[1050] md:px-7.5 py-10 lg:py-20 flex flex-col gap-y-10 lg:gap-y-15">
				<Heading
					title="Trending collections"
					description="Checkout our weekly updated trending collection."
				/>
				<div className="flex justify-between gap-7.5">
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