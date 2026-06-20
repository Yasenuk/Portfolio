import * as React from "react";

import { cn } from "@portfolio/nft-marketplace-utils";

const Form = React.forwardRef<
	HTMLFormElement,
	React.HTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => {
	return (
		<form
			ref={ref}
			className={
				cn(
					"flex flex-col items-start gap-y-[15px] md:max-w-[330px]",
					className
				)
			}
			{...props}
		/>
	)
});
Form.displayName = "Form";

export { Form };