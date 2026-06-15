import * as React from "react";
import Image from "next/image";

import type { TCardAuthor, TCardPicture } from '@portfolio/nft-marketplace-types';
import { cn } from "@portfolio/nft-marketplace-utils";

const Card = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<article
		ref={ref}
		className={cn(
			'rounded overflow-hidden bg-bg-secondary',
			className
		)}
		{...props}
	/>
))
Card.displayName = "Card";

const CardPictureWrapper = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("relative w-full", className)} {...props} />
))
CardPictureWrapper.displayName = "CardPictureWrapper";

const CardPicture = React.forwardRef<
	HTMLImageElement,
	React.HTMLAttributes<HTMLImageElement> & TCardPicture
>(({ className, width, height, sizes, src, alt = '', ...props }, ref) => (
	<Image
		ref={ref}
		src={src}
		alt={alt}
		width={width}
		height={height}
		sizes={sizes}
		className={cn("w-full h-auto object-cover object-center", className)}
		{...props}
	/>
))
CardPicture.displayName = "CardPicture";

const CardBadge = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref}
		className={cn(
			"absolute inset-0 grid place-items-center bg-text/10 backdrop-blur text-text",
			className
		)}
		{...props}
	/>
));
CardBadge.displayName = "CardBadge";

const CardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("px-[1.875rem] pt-5 pb-[1.563rem]", className)} {...props} />
))
CardContent.displayName = "CardContent";

const CardAuthor = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & TCardAuthor
>(
	({ className, authorSrc, authorName, ...props }, ref) => (
		<div ref={ref} className={cn("flex items-start gap-x-3", className)} {...props}>
			<img src={authorSrc} alt="" className="size-6 rounded-full object-cover" />
			<span className="text-body text-text font-display">{authorName}</span>
		</div>
	)
);

export { Card, CardPictureWrapper, CardPicture, CardBadge, CardContent, CardAuthor };
