import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { brandDescription, footerColumns, socialLinks, legalLinks } from '@portfolio/rhine-media-shared';

const linkClass = 'text-[0.865rem] text-text-2 transition-colors hover:text-gold-lt';

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
	const isRoute = href.startsWith('/') && !href.startsWith('/#');
	if (isRoute) {
		return (
			<Link to={href} className={linkClass}>
				{children}
			</Link>
		);
	}
	const external = href.startsWith('http');
	return (
		<a href={href} className={linkClass} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
			{children}
		</a>
	);
}

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-line-soft bg-bg-0 pb-[34px] pt-[72px]">
			<div className="container">
				<div className="mb-[60px] grid grid-cols-1 gap-7 md:gap-9 md:grid-cols-2 xl:grid-cols-[1.9fr_1fr_1fr_1fr]">
					<div>
						<Link
							to="/"
							className="flex items-center gap-2.5 font-head text-[1.15rem] font-extrabold tracking-[-0.02em]"
						>
							<span className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-g-gold text-[13px] font-black tracking-[-0.02em] text-black">
								RM
							</span>
							<span>
								Rhine<span className="text-gold">Media</span>
							</span>
						</Link>
						<p className="mt-[18px] max-w-[16.25rem] text-[0.875rem] leading-[1.72] text-text-2">
							{brandDescription}
						</p>
						<div className="mt-[26px] flex gap-2.5">
							{socialLinks.map((s) => {
								const external = s.href.startsWith('http');
								return (
									<a
										key={s.label}
										href={s.href}
										aria-label={s.label}
										target={external ? '_blank' : undefined}
										rel={external ? 'noreferrer' : undefined}
										className="flex size-9 items-center justify-center rounded-b-s border border-line-soft bg-bg-card text-[0.85rem] text-text-2 transition-colors hover:border-line-gold hover:bg-gold-dim hover:text-gold"
									>
										{s.icon}
									</a>
								);
							})}
						</div>
					</div>

					{footerColumns.map((col) => (
						<nav key={col.title} aria-label={col.title}>
							<h3 className="mb-5 font-head text-[0.78rem] font-bold uppercase tracking-[0.08em] text-text-1">
								{col.title}
							</h3>
							<ul className="flex flex-col gap-[11px]">
								{col.links.map((link) => (
									<li key={link.label}>
										<FooterLink href={link.href}>{link.label}</FooterLink>
									</li>
								))}
							</ul>
						</nav>
					))}
				</div>

				<div className="flex flex-col items-start gap-3 border-t border-line-soft pt-7 md:flex-row md:items-center md:justify-between">
					<p className="text-[0.8rem] text-text-3">© {year} Rhine Media. Усі права захищено.</p>
					<div className="flex gap-[22px]">
						{legalLinks.map((link) => (
							<a key={link.label} href={link.href} className="text-[0.8rem] text-text-3 transition-colors hover:text-text-2">
								{link.label}
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}