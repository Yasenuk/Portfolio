import * as React from "react";
import type { TCardPicture } from '@portfolio/nft marketplace-types';
import { cn } from "@portfolio/shared-utils";

const Card = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<article
		ref={ref}
		className={cn(
			"rounded overflow-hidden bg-bg-secondary",
			className
		)}
		{...props}
	/>
))
Card.displayName = "Card";

const CardPicture = React.forwardRef<
	HTMLImageElement,
	React.HTMLAttributes<HTMLImageElement> & TCardPicture
>(({ className, src, alt = '', ...props }, ref) => (
	<picture>
		<img ref={ref} src={src} alt={alt} className={cn("w-full h-full object-cover", className)} {...props} />
	</picture>
))
CardPicture.displayName = "CardPicture";

const CardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("px-[1.875rem] pt-5 pb-[1.563rem]", className)} {...props} />
))
CardContent.displayName = "CardContent";


export { Card, CardPicture, CardContent };
