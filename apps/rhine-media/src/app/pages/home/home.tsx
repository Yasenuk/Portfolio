import { ButtonMain } from '@portfolio/rhine-media';
import Hero from './sections/hero';
import Stats from './sections/stats';
import Verticals from './sections/verticals';
import Traffic from './sections/traffic';
import Partners from './sections/partners';
import WhyUs from './sections/why-us';
import Cta from './sections/cta';

export default function Home() {
	return (
		<>
			<Hero />
			<Stats />
			<Verticals />
			<Traffic />
			<Partners />
			<WhyUs />
			<Cta />
		</>
	);
}