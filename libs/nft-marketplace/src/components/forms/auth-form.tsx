import * as React from "react";

import { cn } from "@portfolio/nft-marketplace-utils";
import Image from "next/image";

interface AuthFormProps
	extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	description: string;
	imageSrc: string;
};

const AuthForm = React.forwardRef<
	HTMLDivElement,
	AuthFormProps
>(({ className, children, title, description, imageSrc, ...props }, ref) => (
	<div
		ref={ref}
		className={
			cn(
				"grid grid-cols-1 sm:grid-cols-2 sm:flex-row gap-x-10 md:gap-x-[3.75rem]",
				className
			)
		}
		{...props}
	>
		<div className="relative min-h-[232px]">
			<Image
				loading="lazy"
				src={`/assets/images/${imageSrc}`}
				alt=""
				fill
				className="object-cover object-center h-full w-auto"
			/>
		</div>
		<div className="px-[1.875rem] pt-[1.875rem] pb-10 sm:px-0 sm:py-20 md:py-[6.25rem] text-text">
			<h1 className="text-h3 md:text-h2 mb-5 capitalize font-semibold md:max-w-[460px]">{title}</h1>
			<p className="text-body md:text-h6 mb-[1.875rem] sm:mb-10 md:max-w-[460px]">{description}</p>
			{children}
		</div>
	</div>
));
AuthForm.displayName = "AuthForm";

export { AuthForm };