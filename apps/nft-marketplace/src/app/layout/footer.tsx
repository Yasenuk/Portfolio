import { Logo, NavMenu, SubscribeForm } from "@portfolio/nft-marketplace";
import { cn } from "@portfolio/nft-marketplace-utils";
import { Icon } from "@portfolio/shared-ui";
import Link from "next/link";

export function Footer() {
	const headingClass = "text-text text-h5 capitalize mb-5 lg:mb-[25rpx] font-display font-bold";
	const socialLinkClass = "size-8 hover:text-action transition-colors duration-200";

	return (
		<footer className="bg-bg-secondary">
			<div className="container max-w-[1050px] relative flex flex-col lg:flex-row items-start justify-between py-[1.875rem] md:py-10 text-label-grey text-body gap-[1.875rem]">
				<div>
					<Logo  />
					<p className="my-5 lg:mt-[1.875rem]">NFT marketplace UI created with Anima for Figma.</p>
					<span className="block mb-[15px]">Join our community</span>
					<nav className="flex items-center gap-x-2.5 text-label">
						<Link href="/"><Icon className={socialLinkClass} name="discordlogo"/></Link>
						<Link href="/"><Icon className={socialLinkClass} name="youtubelogo"/></Link>
						<Link href="/"><Icon className={socialLinkClass} name="twitterlogo"/></Link>
						<Link href="/"><Icon className={socialLinkClass} name="instagramlogo"/></Link>
					</nav>
				</div>
				<div>
					<h2 className={cn("", headingClass)}>Explore</h2>
					<NavMenu linkClassName="text-label-grey" />
				</div>
				<div>
					<h2 className={cn("", headingClass)}>Join our weekly digest</h2>
					<p className="mb-5">Get exclusive promotions & updates straight to your inbox.</p>
					<SubscribeForm className="md:min-w-[26.25rem]" />
				</div>
			</div>
		</footer>
	);
}