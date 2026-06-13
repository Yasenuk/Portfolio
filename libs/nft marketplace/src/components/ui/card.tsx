import * as React from "react";
import type { TCardAuthor, TCardPicture } from '@portfolio/nft marketplace-types';
import { cn } from "@portfolio/shared-utils";

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
>(({ className, src, alt = '', ...props }, ref) => (
	<picture>
		<img ref={ref} loading="lazy" src={src} alt={alt} className={cn("w-full max-h-full object-cover", className)} {...props} />
	</picture>
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
  ({ className, src, name, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-x-2", className)} {...props}>
      <img src={src} alt="" className="size-7 rounded-full object-cover" />
      <span className="text-body text-text">{name}</span>
    </div>
  )
);
CardAuthor.displayName = "CardAuthor";


export { Card, CardPictureWrapper, CardPicture, CardBadge, CardContent, CardAuthor };
