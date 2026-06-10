import * as React from "react";
import type { highlightProps } from '@portfolio/aperture-types';
import { cn } from "@portfolio/shared-utils";

const Highlight = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & highlightProps>((
	{ className, pictureSource, ...props },
	ref) => {
	return (
		<div
			ref={ref}
			style={{ backgroundImage: `url(/assets/images/${pictureSource}.png)` }}
			className={cn("h-[37.5rem] bg-cover bg-center", className)}
			{...props} />
	);
});
Highlight.displayName = "Highlight";

const HighlightContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((
	{ className, ...props },
	ref) => {
	return (
		<div
			ref={ref}
			className={cn("container flex flex-col items-end justify-center relative h-full", className)}
			{...props}
		/>
	);
});
HighlightContainer.displayName = "HighlightContainer";

const HighlightContent = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((
	{ className, ...props },
	ref) => {
	return (
		<section
			ref={ref}
			className={cn("md:w-[18.75rem] text-center md:text-left", className)}
			{...props}
		/>
	);
});
HighlightContent.displayName = "HighlightContent";

const HighlightTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>((
	{ className, ...props },
	ref) => {
	return (
		<h3
			ref={ref}
			className={cn("text-primary text-sm tracking-[0.125rem] uppercase mb-2", className)}
			{...props}
		/>
	);
});
HighlightTitle.displayName = "HighlightTitle";

const HighlightDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>((
	{ className, ...props },
	ref) => {
	return (
		<p
			ref={ref}
			className={cn("text-primary text-sm max-w-[18.5rem]", className)}
			{...props}
		/>
	);
});
HighlightDescription.displayName = "HighlightDescription";

export { Highlight, HighlightContainer, HighlightContent, HighlightTitle, HighlightDescription };