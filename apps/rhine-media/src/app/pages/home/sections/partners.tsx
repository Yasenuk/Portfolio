import { SectionHeading, Reveal } from '@portfolio/rhine-media';
import { partners } from '@portfolio/rhine-media-shared';

export default function Partners() {
	return (
		<section id="partners" className="overflow-hidden bg-bg-0 py-[88px]">
			<div className="container mb-12">
				<Reveal>
					<SectionHeading
						align="center"
						eyebrow="Партнери та мережі"
						title="Працюємо з провідними"
						highlight="CPA-мережами"
						subtitle="Прямі домовленості з топовими рекламодавцями, паблішерами й афіліейт-мережами по всьому світу."
					/>
				</Reveal>
			</div>

			<div
				className="relative"
				style={{
					maskImage: 'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
					WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
				}}
			>
				<div className="flex w-max gap-5 animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
					{[...partners, ...partners].map((p, i) => (
						<div
							key={`${p.name}-${i}`}
							className="flex flex-shrink-0 items-center gap-2.5 rounded-full border border-line-soft bg-bg-card px-5 py-[11px] transition-colors hover:border-line-gold hover:bg-bg-card-h"
						>
							<span className="flex h-[22px] w-[22px] items-center justify-center rounded-[5px] bg-gold-dim text-[0.75rem]">
								{p.icon}
							</span>
							<span className="whitespace-nowrap text-[0.845rem] font-semibold text-text-2">{p.name}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}