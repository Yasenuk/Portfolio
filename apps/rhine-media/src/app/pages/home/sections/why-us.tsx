import { SectionHeading, Reveal, RevealGroup, RevealItem } from '@portfolio/rhine-media';
import { whyChecklist, whyCards } from '@portfolio/rhine-media-shared';
import { cn } from '@portfolio/shared-utils';

export default function WhyUs() {
	return (
		<section id="why-us" className="bg-bg-1 py-section">
			<div className="container">
				<div className="grid items-center gap-[52px] xl:grid-cols-[1fr_1.15fr] xl:gap-20">
					<Reveal>
						<SectionHeading
							eyebrow="Чому обирають Rhine Media"
							title="Точність. Масштаб."
							highlight="Результат."
							subtitle="Ми не медіамережа — ми ваша власна баїнг-команда. Глибока експертиза, реальна відповідальність і прозора звітність за кожен витрачений долар."
						/>

						<div className="mt-10 flex flex-col gap-[22px]">
							{whyChecklist.map((item) => (
								<div key={item.title} className="flex items-start gap-[15px]">
									<span className="mt-px flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[0.5rem] border border-line-gold bg-gold-dim text-[0.72rem] font-bold text-gold">
										✓
									</span>
									<div>
										<h3 className="mb-[5px] font-head text-[0.97rem] font-bold text-text-1">{item.title}</h3>
										<p className="text-[0.845rem] leading-[1.65] text-text-2">{item.description}</p>
									</div>
								</div>
							))}
						</div>
					</Reveal>

					<RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{whyCards.map((card, i) => (
							<RevealItem
								key={card.title}
								className={cn(
									'rounded-[1.25rem] border border-line-soft bg-bg-card p-[28px_24px] transition-all duration-med hover:-translate-y-[5px] hover:border-line-gold hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]',
									i === 0 && 'lg:-mt-7',
									i === 2 && 'lg:mb-7',
								)}
							>
								<div className="mb-[14px] text-[1.65rem]">{card.icon}</div>
								<h3 className="mb-[9px] font-head text-[0.97rem] font-bold">{card.title}</h3>
								<p className="text-[0.82rem] leading-[1.65] text-text-2">{card.description}</p>
							</RevealItem>
						))}
					</RevealGroup>
				</div>
			</div>
		</section>
	);
}