import { lazy } from 'react';


const Hero = lazy(() => import('./sections/Hero'));
const Services = lazy(() => import('./sections/Services'));
const Highlight = lazy(() => import('./sections/Highlight'));
const Native = lazy(() => import('./sections/Native'));
const Brands = lazy(() => import('./sections/Brands'));
const Help = lazy(() => import('./sections/Help'));


export default function Home() {
	return (
		<>
			<Hero />
			<Services />
			<Highlight />
			<Native />
			<Highlight />
			<Brands />
			<Highlight />
			<Help />
		</>
	);
}