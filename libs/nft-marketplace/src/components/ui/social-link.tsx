import * as React from "react";

import { cn } from '@portfolio/nft-marketplace-utils';
import { Icon } from "@portfolio/shared-ui";

interface SocialLinkProps
	extends React.HTMLAttributes<HTMLAnchorElement> {
	platform: string;
	url: string;
}

const SocialLink = React.forwardRef<
	HTMLAnchorElement,
	SocialLinkProps
>(({ className, platform, url, ...props }, ref) => (
	<a
		ref={ref}
		className={cn(
			"text-label hover:text-text transition-colors duration-100",
			className
		)}
		href={url}
		target="_blank"
		rel="noopener noreferrer nofollow"
		{...props}
	>
		<Icon className="size-6 lg:size-8" name={platform} />
	</a>
));
SocialLink.displayName = 'SocialLink';

export { SocialLink };