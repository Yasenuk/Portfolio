import { lazy, Suspense } from 'react';
import { Seo } from '@portfolio/shared-ui';

import Hero from './sections/hero';

const Stats = lazy(() => import('./sections/stats'));
const Verticals = lazy(() => import('./sections/verticals'));
const Traffic = lazy(() => import('./sections/traffic'));
const Partners = lazy(() => import('./sections/partners'));
const WhyUs = lazy(() => import('./sections/why-us'));
const Cta = lazy(() => import('./sections/cta'));

export default function Home() {
	return (
		<>
			<Seo
        title="Rhine Media — агентство з медіабаїнгу для перформанс-маркетингу"
        description="Rhine Media — преміальне агентство з медіабаїнгу. Закуповуємо трафік для Dating, Nutra, Gambling, Lottery та iGaming по всьому світу."
      />
			<Hero />

      <Suspense fallback={null}>
        <Stats />
        <Verticals />
        <Traffic />
        <Partners />
        <WhyUs />
        <Cta />
      </Suspense>
		</>
	);
}