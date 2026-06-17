import { Seo } from '@portfolio/shared-ui';

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
			<Seo
        title="Rhine Media — агентство з медіабаїнгу для перформанс-маркетингу"
        description="Rhine Media — преміальне агентство з медіабаїнгу. Закуповуємо трафік для Dating, Nutra, Gambling, Lottery та iGaming по всьому світу."
      />
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