import { ExifBar } from '@portfolio/aperture';
import { lazy } from 'react';
import {
	Highlight,
	HighlightContainer,
	HighlightContent,
	HighlightDescription,
	HighlightTitle
} from '@portfolio/aperture';


const Hero = lazy(() => import('./sections/Hero'));
const Services = lazy(() => import('./sections/Services'));
const Native = lazy(() => import('./sections/Native'));
const Brands = lazy(() => import('./sections/Brands'));
const Help = lazy(() => import('./sections/Help'));


export default function Home() {
	return (
		<>
			<Hero />
			<Services />
			<Highlight pictureSource='highlight_1'>
				<HighlightContainer>
					<HighlightContent>
						<HighlightTitle>Sunset at Mount Fuji</HighlightTitle>
						<HighlightDescription>Duis tristique sed lorem a vestibulum. Cras commodo consequat orci, in convallis risus egestas non.</HighlightDescription>
					</HighlightContent>
					<ExifBar shutterSpeed='1"' aperture='f/16' iso='400' location='Japan' />
				</HighlightContainer>
			</Highlight>
			<Native />
			<Highlight pictureSource='highlight_2'>
				<HighlightContainer>
					<HighlightContent>
						<HighlightTitle>Monstera Leafs</HighlightTitle>
						<HighlightDescription>Vestibulum sit amet urna turpis. Mauris euismod elit et nisi ultrices, ut faucibus orci tincidunt.</HighlightDescription>
					</HighlightContent>
					<ExifBar shutterSpeed='1/400s' aperture='f/3,5' iso='100' location='Costa Rica' />
				</HighlightContainer>
			</Highlight>
			<Brands />
			<Highlight pictureSource='highlight_3'>
				<HighlightContainer>
					<HighlightContent>
						<HighlightTitle>Star fall in the Himalayas</HighlightTitle>
						<HighlightDescription>Nulla rhoncus feugiat eros quis consectetur. Morbi neque ex, condimentum dapibus congue et, vulputate ut ligula.</HighlightDescription>
					</HighlightContent>
					<ExifBar shutterSpeed='6"' aperture='f/11' iso='800' location='Nepal' />
				</HighlightContainer>
			</Highlight>
			<Help />
		</>
	);
}