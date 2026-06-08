import { ButtonMain } from "@portfolio/aperture";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@portfolio/shared-ui";
import { cn } from '@portfolio/shared-utils';

const cardClass = cn(
	'bg-cover bg-center flex flex-col h-[25rem] md:h-[32rem] xl:h-[37.5rem]',
	'text-primary text-base rounded-none border-none p-[1.875rem]'
);

const CARD_OPTIONS = [
	{
		title: 'Product photography',
		description: 'Cras commodo consequat orci, in convallis risus egestas non. Nulla efficitur auctor hendrerit. Etiam ut orci varius, faucibus libero ac, cursus quam.',
		picture: 'service-picture_1'
	},
	{
		title: 'Architecture photography',
		description: 'Aenean porta neque eget consequat fringilla. Vestibulum ultrices, orci nec egestas pharetra, ligula est semper enim, nec auctor sapien leo nec purus. Fusce tincidunt aliquet sapien, sit amet rhoncus leo imperdiet nec.',
		picture: 'service-picture_2'
	},
	{
		title: 'Drone photography',
		description: 'Mauris euismod elit et nisi ultrices, ut faucibus orci tincidunt. Duis tristique sed lorem a vestibulum. Cras commodo consequat orci, in convallis risus egestas non. Nulla efficitur auctor hendrerit. Etiam ut orci varius, faucibus libero ac, cursus quam.',
		picture: 'service-picture_3'
	},
	{
		title: 'Wildlife photography',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus. Nulla rhoncus feugiat eros quis consectetur. Morbi neque ex, condimentum dapibus congue et, vulputate ut ligula. Vestibulum sit amet urna turpis.',
		picture: 'service-picture_4'
	}
] as const;

export default function Services() {
	return (
		<div className="bg-black pt-28 pb-24">
			<section className="container">
				<h2 className="text-center text-primary text-[2.5rem] bottom-4">What we do.</h2>
				<p className="text-center text-secondary text-2xl">The areas that we're specialized in.</p>
				<div className="text-primary grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
					{CARD_OPTIONS.map((card) => (
						<Card
							key={card.picture}
							style={{ backgroundImage: `url(/assets/images/${card.picture}.png)` }}
							className={cn("bg-no-repeat bg-cover", cardClass)}
						>
							<CardHeader className="flex flex-col justify-end flex-auto p-0">
								<CardTitle className="tracking-[0.125rem] uppercase">{card.title}</CardTitle>
								<CardDescription className="text-primary">{card.description}</CardDescription>
							</CardHeader>
							<CardFooter className="p-0">
								<ButtonMain className="mt-4">Read more</ButtonMain>
							</CardFooter>
						</Card>
					))}
				</div>
			</section>
		</div>
	);
}