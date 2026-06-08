import { ButtonMain } from "@portfolio/aperture";

export default function Help() {
	return (
		<div className="bg-black">
			<div className="container pt-20 pb-16 md:pt-[7.5rem] md:pb-[6.25rem] flex flex-col gap-y-4 items-center">
				<h2 className="text-center text-primary text-[2.5rem] leading-[2.625rem] bottom-4 max-w-[36rem] mx-auto">Need help with photography or videography?</h2>
				<p className="text-center text-secondary text-2xl">We're here for you!</p>
				<ButtonMain>Get in touch</ButtonMain>
			</div>
		</div>
	);
}