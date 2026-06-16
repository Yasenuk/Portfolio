import type { SectionHeadingProps } from '@portfolio/rhine-media-types';
import { cn } from '@portfolio/shared-utils';

const accentClass = {
	action: 'bg-g-gold',
	azure: 'bg-g-blue',
} as const;

export function SectionHeading({
	eyebrow,
	title,
	titleEnd,
	highlight,
	accent = 'action',
	subtitle,
	align = 'left',
}: SectionHeadingProps) {
	const centered = align === 'center';

	return (
		<div className={cn(centered && 'text-center')}>
			<span className="mb-[18px] inline-flex items-center gap-[9px] text-[0.72rem] font-bold uppercase tracking-[0.14em] text-gold">
				<span className="h-[2px] w-[18px] flex-shrink-0 rounded-[2px] bg-g-gold" />
				{eyebrow}
			</span>

			<h2 className="mb-[18px] font-head text-[clamp(1.85rem,3.5vw,2.75rem)] font-extrabold leading-[1.12] tracking-[-0.025em]">
				{title}{' '}
				<span className={cn('bg-clip-text text-transparent', accentClass[accent])}>
					{highlight}
				</span>{' '}
				{titleEnd}
			</h2>

			{subtitle && (
				<p className={cn('max-w-[32.5rem] text-base leading-[1.75] text-text-2', centered && 'mx-auto')}>
					{subtitle}
				</p>
			)}
		</div>
	);
}