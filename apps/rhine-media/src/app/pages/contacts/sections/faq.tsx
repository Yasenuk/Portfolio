import * as React from 'react';
import { Reveal, RevealGroup, RevealItem, SectionHeading } from "@portfolio/rhine-media";
import * as Collapsible from '@radix-ui/react-collapsible';
import { cn } from '@portfolio/shared-utils';
import { faq } from '@portfolio/rhine-media-shared';

function FaqRow({ q, a }: { q: string; a: string }) {
	const [open, setOpen] = React.useState(false);
	return (
		<Collapsible.Root
			open={open}
			onOpenChange={setOpen}
			className="border-b border-line-soft"
		>
			<Collapsible.Trigger className="flex w-full items-center justify-between gap-4 py-[18px] text-left">
				<span className="font-head text-[0.97rem] font-semibold text-text-1">{q}</span>
				<span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border border-line-soft bg-bg-card">
					<svg
						className={cn('h-3.5 w-3.5 text-gold transition-transform', open && 'rotate-180')}
						viewBox="0 0 16 16"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						aria-hidden="true"
					>
						<path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</span>
			</Collapsible.Trigger>
			<Collapsible.Content className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
				<p className="pb-5 text-[0.9rem] leading-[1.7] text-text-2">{a}</p>
			</Collapsible.Content>
		</Collapsible.Root>
	);
}

export default function FAQ() {
	return (
		<section id="faq" className="bg-bg-1 py-section">
			<div className="container">
				<div className="mx-auto max-w-[780px]">
					<Reveal>
						<SectionHeading
							align="center"
							eyebrow="FAQ"
							title="Поширені"
							highlight="питання"
							subtitle="Усе, що потрібно знати перед початком співпраці з Rhine Media."
						/>
					</Reveal>
					<RevealGroup className="mt-10 flex flex-col">
						{faq.map((item) => (
							<RevealItem key={item.q}>
								<FaqRow q={item.q} a={item.a} />
							</RevealItem>
						))}
					</RevealGroup>
				</div>
			</div>
		</section>
	);
}
