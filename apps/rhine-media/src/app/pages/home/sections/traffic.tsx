import { SectionHeading, Reveal, RevealGroup, RevealItem } from '@portfolio/rhine-media';
import { trafficSources } from '@portfolio/rhine-media-shared';

export default function Traffic() {
	return (
		<section id="traffic" className="bg-bg-1 py-section">
			<div className="container">
				<Reveal>
					<SectionHeading
						align="center"
						accent="azure"
						eyebrow="Джерела трафіку"
						title="Закуповуємо з усіх ключових"
						highlight="платформ"
						subtitle="Прямі інтеграції та оптимізовані звʼязки на 8+ каналах — від tier-1 мереж до push і pop."
					/>
				</Reveal>

				<RevealGroup className="mt-[52px] grid grid-cols-2 gap-4 lg:grid-cols-4">
					{trafficSources.map((src) => (
						<RevealItem
							key={src.name}
							className="flex flex-col items-center gap-[11px] rounded-[0.875rem] border border-line-soft bg-bg-card p-[26px_18px] text-center transition-all hover:-translate-y-[5px] hover:border-blue-lt hover:bg-bg-card-h hover:shadow-[0_14px_36px_rgba(62,114,236,0.14)]"
						>
							<span className="flex h-[52px] w-[52px] items-center justify-center rounded-[13px] bg-blue-dim text-[1.35rem]">
								{src.icon}
							</span>
							<span className="font-head text-[0.88rem] font-bold text-text-1">{src.name}</span>
							<span className="text-[0.72rem] text-text-3">{src.sub}</span>
						</RevealItem>
					))}
				</RevealGroup>
			</div>
		</section>
	);
}