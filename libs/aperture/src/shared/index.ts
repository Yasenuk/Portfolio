import { cva } from "class-variance-authority";

export const linkClass = cva(`
	relative py-1
	after:absolute after:content-[''] after:h-0.5 
	after:bottom-0 after:left-0
	after:bg-primary after:w-full after:max-w-0 
	hover:after:max-w-full after:transition-all 
	after:duration-300 after:ease-in-out
`);