import { Logo, NavMenu, SubscribeForm } from "@portfolio/nft-marketplace";
import { cn } from "@portfolio/nft-marketplace-utils";
import { Icon } from "@portfolio/shared-ui";
import Link from "next/link";

export function Footer() {
	const headingClass = "text-text text-h5 capitalize bm-5 lg:mb-[25rpx]";

	return (
		<footer className="bg-bg-secondary">
			<div className="container max-w-[1050px] relative flex items-start justify-between py-[1.875rem] md:py-10 text-label text-body gap-[1.875rem]">
				<div>
					<Logo />
					<p className="my-5 lg:mt-[1.875rem]">NFT marketplace UI created with Anima for Figma.</p>
					<span className="mb-[15px]">Join our community</span>
					<nav className="flex items-center gap-x-2.5">
						<Link href="/"><Icon className="size-8" name="discordlogo"/></Link>
						<Link href="/"><Icon className="size-8" name="youtubelogo"/></Link>
						<Link href="/"><Icon className="size-8" name="twitterlogo"/></Link>
						<Link href="/"><Icon className="size-8" name="instagramlogo"/></Link>
					</nav>
				</div>
				<div>
					<h2 className={cn("", headingClass)}>Explore</h2>
					<NavMenu className="" />
				</div>
				<div>
					<h2 className={cn("", headingClass)}>Join our weekly digest</h2>
					<SubscribeForm />
				</div>
			</div>
		</footer>
	);
}