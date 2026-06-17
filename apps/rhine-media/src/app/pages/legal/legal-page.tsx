import { Reveal, SectionHeading } from '@portfolio/rhine-media';

export type LegalBlock = string | { list: string[] };

export interface LegalSection {
	h: string;
	body: LegalBlock[];
}

interface LegalPageProps {
	title: string;
	highlight: string;
	updated: string;
	intro: string;
	sections: LegalSection[];
}

export default function LegalPage({ title, highlight, updated, intro, sections }: LegalPageProps) {
	return (
		<>
			<section className="relative overflow-hidden border-b border-line-soft bg-bg-1 pb-16 pt-[148px]">
				<div
					className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px]"
					style={{ background: 'radial-gradient(circle, rgba(62,114,236,0.07) 0%, transparent 70%)' }}
				/>
				<div className="container relative">
					<Reveal>
						<SectionHeading align="left" eyebrow="Правова інформація" title={title} highlight={highlight} />
						<p className="mt-6 max-w-[680px] text-[0.95rem] leading-[1.75] text-text-2">{intro}</p>
						<p className="mt-5 text-[0.82rem] text-text-3">Останнє оновлення: {updated}</p>
					</Reveal>
				</div>
			</section>

			<section className="bg-bg-1 py-20">
				<div className="container">
					<div className="mx-auto flex max-w-[820px] flex-col gap-9">
						{sections.map((s) => (
							<Reveal key={s.h}>
								<h2 className="mb-3 font-head text-[1.25rem] font-bold text-text-1">{s.h}</h2>
								<div className="flex flex-col gap-3 text-[0.93rem] leading-[1.75] text-text-2">
									{s.body.map((block, i) =>
										typeof block === 'string' ? (
											<p key={i}>{block}</p>
										) : (
											<ul key={i} className="flex flex-col gap-2">
												{block.list.map((li, j) => (
													<li key={j} className="flex gap-2.5">
														<span className="mt-[9px] h-[5px] w-[5px] flex-shrink-0 rounded-full bg-gold" />
														<span>{li}</span>
													</li>
												))}
											</ul>
										)
									)}
								</div>
							</Reveal>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
