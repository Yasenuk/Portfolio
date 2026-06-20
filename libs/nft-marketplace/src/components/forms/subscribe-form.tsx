import * as React from "react";

import { ButtonMain, InputMain } from "@portfolio/nft-marketplace";
import { cn } from "@portfolio/nft-marketplace-utils";

interface SubscribeFormProps
	extends React.HTMLAttributes<HTMLFormElement> {
	icon?: string;
};

const SubscribeForm = React.forwardRef<
	HTMLFormElement,
	SubscribeFormProps
>(({ className, icon, ...props }, ref) => {
	return (
		<form
			ref={ref}
			className={
				cn(
					"flex flex-col gap-y-4 lg:flex-row lg:bg-text lg:rounded lg:overflow-hidden",
					className
				)
			}
			{...props}
		>
			<InputMain placeholder="Enter your email address" variant="subscribe" />
			<ButtonMain icon={icon} size="sm">Subscribe</ButtonMain>
		</form>
	)
});
SubscribeForm.displayName = "SubscribeForm";

export { SubscribeForm };