"use client";

import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from '@portfolio/nft-marketplace-utils';
import { Icon } from "@portfolio/shared-ui";

const inputVariants = cva(
	`flex justify-between items-center gap-x-3 px-5 py-3 bg-text border border-label rounded`,
	{
		variants: {
			variant: {
				default: "",
				subscribe: "md:pr-3 md:bg-transparent md:border-0"
			}
		},
		defaultVariants: {
			variant: "default"
		}
	}
);

interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
	VariantProps<typeof inputVariants> {
	icon?: string;
	trailing?: React.ReactNode;
}

const InputMain = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, icon, variant, trailing, type = "text", ...props }, ref) => (
		<div className={cn(inputVariants({ variant }), className)}>
			{icon && (
				<Icon
					name={icon}
					className="size-5 text-label"
				/>
			)}
			<input
				ref={ref}
				type={type}
				className={
					cn(
						"w-full bg-transparent outline-none text-bg text-body",
						"placeholder:text-bg placeholder:capitalize",
						className
					)
				}
				{...props}
			/>
			{trailing}
		</div>
	)
);
InputMain.displayName = "InputMain";

type InputPasswordProps = Omit<React.ComponentProps<typeof InputMain>, "type" | "trailing" | "variant">;

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
	({ className, ...props }, ref) => {
		const [show, setShow] = React.useState(false);
		const toggle = React.useCallback(() => setShow(p => !p), []);

		return (
			<InputMain
				ref={ref}
				className={className}
				type={show ? "text" : "password"}
				trailing={
					<button
						type="button"
						onClick={toggle}
						aria-label={show ? "Hide password" : "Show password"}
					>
						<Icon name={show ? "eye" : "eyeslash"} className="size-5 text-action" />
					</button>
				}
				{...props}
			/>
		);
	}
);
InputPassword.displayName = "InputPassword";

export { InputMain, InputPassword };