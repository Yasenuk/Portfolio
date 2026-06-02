import { ExifBar } from '@portfolio/aperture';

export default function Hero() {
	return (
		<div className="bg-[url('/assets/images/hero-picture.png')] bg-cover bg-center h-[30rem] lg:h-[44.75rem] relative">
			<div className="absolute inset-0 bg-gradient-to-t from-[#000000] from-[18%] to-transparent to-100%"></div>
			<div className="relative container h-full pb-20 flex flex-col items-center justify-end text-secondary text-base ">
				<span className="tracking-[0.125rem] uppercase">Photographer & filmmaker</span>
				<h1 className="text-primary text-[3.375rem] leading-none mb-4">Aperture studios</h1>
				<p className="max-w-[36.25rem] text-center">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Suspendisse varius enim in eros elementum tristique.
					Duis cursus, mi quis viverra ornare, eros dolor interdum
					nulla, ut commodo diam libero vitae erat. Aenean faucibus
					nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem
					vitae risus tristique posuere.</p>
				
					<ExifBar shutterSpeed="1/2000s" aperture="f/11" iso="100" location="Iceland" />
			</div>
		</div>
	);
}