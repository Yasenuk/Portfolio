import { SectionHeading, Reveal, RevealGroup, RevealItem } from '@portfolio/rhine-media';
import { verticals } from '@portfolio/rhine-media-shared';

export default function Verticals() {
	return (
		<section id="verticals" className="bg-bg-0 py-section">
			<div className="container">
				<Reveal>
					<SectionHeading
						align="center"
						eyebrow="Наші вертикалі"
						title="Експертиза в найприбутковіших"
						highlight="нішах"
						subtitle="Окремі баєри в кожній вертикалі — з перевіреними воронками, креативами та підходами до compliance."
					/>
				</Reveal>

				<RevealGroup className="mt-[52px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
					{verticals.map((v) => (
						<RevealItem
							key={v.name}
							className="group relative overflow-hidden rounded-[1.25rem] border border-line-soft bg-bg-card p-[30px_24px] transition-all duration-med hover:-translate-y-[7px] hover:border-line-gold hover:bg-bg-card-h hover:shadow-[0_22px_55px_rgba(0,0,0,0.32)]"
						>
							<span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-g-gold transition-transform duration-med group-hover:scale-x-100" />
							<span className="mb-[14px] block text-[1.9rem]">{v.icon}</span>
							<h3 className="mb-[9px] font-head text-[1.05rem] font-bold">{v.name}</h3>
							<p className="text-[0.83rem] leading-[1.62] text-text-2">{v.description}</p>
							<span className="mt-[14px] inline-block rounded-full bg-gold-dim px-[10px] py-[3px] text-[0.69rem] font-bold uppercase tracking-[0.07em] text-gold">
								{v.tag}
							</span>
						</RevealItem>
					))}
				</RevealGroup>
			</div>
		</section>
	);
}