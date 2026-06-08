import React, { forwardRef, HTMLAttributes, ReactElement, useRef } from "react";
import { highlightContext, highlightContextProps, useHighlight } from '@portfolio/aperture';
import { cn } from "@portfolio/shared-utils";

const Highlight = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & highlightContextProps>((
	{ className, pictureSource, ...props },
	ref) => {
	const highlightRef = useRef<HTMLDivElement | null>(null);

	return (
		<highlightContext.Provider value={{ pictureSource }}>
			<div
				ref={(node) => {
					highlightRef.current = node
					if (typeof ref === 'function') ref(node)
					else if (ref) ref.current = node
				}}
				style={{ backgroundImage: `url(assets/images/${pictureSource}.png)` }}
				className={cn("h-[37.5rem] bg-cover bg-center", className)}
				{...props} />
		</highlightContext.Provider>
	);
});
Highlight.displayName = "Highlight";

const HighlightContainer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((
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

const HighlightContent = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((
	{ className, ...props },
	ref) => {
	return (
		<section
			ref={ref}
			className={cn("w-[18.75rem] text-center md:text-left", className)}
			{...props}
		/>
	);
});
HighlightContent.displayName = "HighlightContent";

const HighlightTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>((
	{ className, ...props },
	ref) => {
	return (
		<h2
			ref={ref}
			className={cn("text-primary text-sm tracking-[0.125rem] uppercase", className)}
			{...props}
		/>
	);
});
HighlightTitle.displayName = "HighlightTitle";

const HighlightDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>((
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