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
				"max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 md:flex-row gap-x-10 lg:gap-x-[3.75rem]",
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
		<div className="px-[1.875rem] pt-[1.875rem] pb-10 md:px-0 md:py-20 lg:py-[6.25rem] text-text">
			<h1 className="text-h3 lg:text-h2 mb-5 capitalize font-semibold lg:max-w-[460px]">{title}</h1>
			<p className="text-body lg:text-h5 mb-[1.875rem] md:mb-10 lg:max-w-[460px]">{description}</p>
			{children}
		</div>
	</div>
));
AuthForm.displayName = "AuthForm";

export { AuthForm };