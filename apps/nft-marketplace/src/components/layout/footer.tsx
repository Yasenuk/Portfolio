import { Logo, NavMenu, SubscribeForm } from "@portfolio/nft-marketplace";
import { cn } from "@portfolio/nft-marketplace-utils";
import { Icon } from "@portfolio/shared-ui";
import Link from "next/link";

export function Footer() {
	const headingClass = "text-text text-h5 capitalize mb-5 lg:mb-[25px] font-display font-bold";
	const socialLinkClass = "size-8 hover:text-action transition-colors duration-200";

	return (
		<footer className="bg-bg-secondary">
			<div className="container max-w-[1050px] lg:px-7.5 relative flex flex-col lg:flex-row items-start justify-between py-7.5 md:py-10 text-label-grey text-body gap-7.5">
				<div>
					<Logo  />
					<p className="my-5 lg:mt-7.5 lg:max-w-60">NFT marketplace UI created with Anima for Figma.</p>
					<span className="block mb-[15px]">Join our community</span>
					<nav className="flex items-center gap-x-2.5 text-label">
						<Link href="/"><Icon className={socialLinkClass} name="discordlogo"/></Link>
						<Link href="/"><Icon className={socialLinkClass} name="youtubelogo"/></Link>
						<Link href="/"><Icon className={socialLinkClass} name="twitterlogo"/></Link>
						<Link href="/"><Icon className={socialLinkClass} name="instagramlogo"/></Link>
					</nav>
				</div>
				<div className="md:min-w-52 max-w-52">
					<h2 className={cn("", headingClass)}>Explore</h2>
					<NavMenu className="gap-y-5" linkClassName="text-label-grey" />
				</div>
				<div className="md:min-w-[26.25rem] max-w-[26.25rem]">
					<h2 className={cn("", headingClass)}>Join our weekly digest</h2>
					<p className="mb-5 lg:max-w-[330px]">Get exclusive promotions & updates straight to your inbox.</p>
					<SubscribeForm />
				</div>
			</div>
		</footer>
	);
}