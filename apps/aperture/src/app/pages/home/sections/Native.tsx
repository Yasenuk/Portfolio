import { ButtonMain, ExifBar } from "@portfolio/aperture";

export default function Native() {
	return (
		<div className="bg-black">
			<div className="max-w-screen-cnt container mx-auto grid grid-cols-1 md:grid-cols-2 items-center relative max-md:px-0 md:pr-0">
				<div className="py-10 max-md:text-center px-4 md:px-0">
					<span className="text-secondary text-base uppercase">The gear cage</span>
					<h2 className="text-primary text-2xl mt-1.5 mb-3.5">The tools that we use.</h2>
					<p className="text-primary text-base max-w-[32rem] max-md:mx-auto">The say that "no place is boring if you've had a good night's sleep and have a pocket full of unexposed film". While we don't shoot (a lot) of film these days — these are the tools that we actually use everyday to capture the amazing things around us.</p>
					<ButtonMain className="mt-5">Check it out</ButtonMain>
				</div>
				<div className="h-[33.75rem]">
					<img className="max-w-full h-full md:w-auto md:h-full object-cover object-center" src="/assets/images/native-picture.png" alt="" />
				</div>
				<ExifBar shutterSpeed='0,8"' aperture="f/5,6" iso="100" location="Sweden" />
			</div>
		</div>
	);
}