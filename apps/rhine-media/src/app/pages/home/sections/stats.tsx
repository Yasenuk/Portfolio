import { RevealGroup, RevealItem } from '@portfolio/rhine-media';
import { statCards } from '@portfolio/rhine-media-shared';

export default function Stats() {
	return (
		<section className="border-y border-line-soft bg-bg-1 py-[52px]">
			<div className="container">
				<RevealGroup className="grid grid-cols-2 lg:grid-cols-4">
					{statCards.map((stat) => (
						<RevealItem
							key={stat.title}
							className="px-6 text-center lg:border-r lg:border-line-soft lg:last:border-r-0"
						>
							<div className="mb-2 bg-g-gold bg-clip-text font-head text-[2.5rem] font-extrabold leading-[1.1] tracking-[-0.04em] text-transparent">
								{stat.value}
							</div>
							<div className="text-[0.82rem] font-semibold text-text-2">{stat.title}</div>
							<div className="mt-[3px] text-[0.72rem] text-text-3">{stat.sub}</div>
						</RevealItem>
					))}
				</RevealGroup>
			</div>
		</section>
	);
}