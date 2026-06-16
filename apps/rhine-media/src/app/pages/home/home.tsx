import { ButtonMain } from '@portfolio/rhine-media';
import Hero from './sections/hero';
import Stats from './sections/stats';
import Verticals from './sections/verticals';
import Traffic from './sections/traffic';
import Partners from './sections/partners';

export default function Home() {
	return (
		<>
			<Hero />
			<Stats />
			<Verticals />
			<Traffic />
			<Partners />
		</>
	);
}