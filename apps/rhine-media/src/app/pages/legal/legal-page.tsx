import * as React from 'react';
import { Link } from 'react-router-dom';
import { Reveal, SectionHeading } from '@portfolio/rhine-media';
import { cn } from '@portfolio/shared-utils';

export type LegalListItem = string | { h: string; body: React.ReactNode };

export type LegalBlock = React.ReactNode | { list: LegalListItem[] };

export interface LegalSection {
	h: string;
	body: LegalBlock[];
}

interface LegalPageProps {
	title: string;
	updated: string;
	sections: LegalSection[];
	meta?: React.ReactNode;
}

function isList(block: LegalBlock): block is { list: LegalListItem[] } {
	return typeof block === 'object' && block !== null && 'list' in block;
}

export function LegalLink({ to, children }: { to: string; children: React.ReactNode }) {
	return (
		<Link to={to} className="text-gold-lt transition-colors hover:text-gold">
			{children}
		</Link>
	);
}

export const LegalPageMeta = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('rounded-bs bg-bg-card px-4 py-3 mb-2 border-l-[3px] border-gold text-text-3 text-[0.83rem]', className)}
		{...props}
	/>
));
LegalPageMeta.displayName = 'LegalPageMeta';

export default function LegalPage({ title, updated, sections, meta }: LegalPageProps) {
	return (
		<>
			<section className="relative overflow-hidden border-b border-line-soft bg-bg-1 pb-16 pt-[148px]">
				<div
					className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px]"
					style={{ background: 'radial-gradient(circle, rgba(62,114,236,0.07) 0%, transparent 70%)' }}
				/>
				<div className="container relative">
					<Reveal>
						<SectionHeading align="left" eyebrow="Правова інформація" title={title} />
						<p className="mt-5 text-[0.82rem] text-text-3">Останнє оновлення: {updated}</p>
					</Reveal>
				</div>
			</section>

			<section className="py-20">
				<div className="container">
					<div className="mx-auto flex max-w-[780px] flex-col gap-9">
						{meta}
						{sections.map((s) => (
							<Reveal key={s.h}>
								<h2 className="mb-3 font-head text-[1.25rem] font-bold text-text-1">{s.h}</h2>
								<div className="flex flex-col gap-3 text-[0.9375rem] leading-[1.75] text-text-2">
									{s.body.map((block, i) =>
										isList(block) ? (
											<ul key={i} className="list-disc space-y-2 pl-[1.15rem]">
												{block.list.map((li, j) => (
													<li key={j} className="pl-1">
														{typeof li === 'string' ? li : <><strong>{li.h}</strong> {li.body}</>}
													</li>
												))}
											</ul>
										) : (
											<p key={i}>{block}</p>
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
