import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ButtonMain } from '@portfolio/rhine-media';
import { useScrolled } from '@portfolio/rhine-media-hooks';
import { navLinks } from '@portfolio/rhine-media-shared';
import { cn } from '@portfolio/shared-utils';

export default function Header() {
	const scrolled = useScrolled(20);
	const [open, setOpen] = useState(false);
	const location = useLocation();

	useEffect(() => setOpen(false), [location]);

	useEffect(() => {
		document.body.style.overflow = open ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn(
				'fixed inset-x-0 top-0 z-[900] border-b border-transparent py-[22px] transition-all duration-med',
				scrolled && 'border-line-soft bg-bg-0/[0.88] py-[14px] backdrop-blur-[22px]'
			)}
		>
			<div className="container flex items-center justify-between">
				<Link
					to="/"
					className="flex flex-shrink-0 items-center gap-2.5 font-head text-[1.15rem] font-extrabold tracking-[-0.02em]"
				>
					<span className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-g-gold text-[13px] font-black tracking-[-0.02em] text-black">
						RM
					</span>
					<span>
						Rhine<span className="text-gold">Media</span>
					</span>
				</Link>

				<nav className="hidden items-center gap-[30px] md:flex" aria-label="Головне меню">
					{navLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="text-[0.85rem] font-medium tracking-[0.01em] text-text-2 transition-colors hover:text-text-1"
						>
							{link.label}
						</a>
					))}
				</nav>

				<div className="flex items-center gap-2.5">
					<ButtonMain asChild variant="outlined" size="sm" className="hidden md:inline-flex">
						<a href="https://t.me/rhinemedia" target="_blank" rel="noreferrer">
							Telegram
						</a>
					</ButtonMain>
					<ButtonMain asChild size="sm">
						<Link to="/contacts">Почати співпрацю</Link>
					</ButtonMain>

					<button
						type="button"
						aria-label="Відкрити меню"
						aria-expanded={open}
						onClick={() => setOpen(true)}
						className="flex flex-col gap-[5px] p-1.5 md:hidden"
					>
						<span className="h-[2px] w-[22px] rounded-[2px] bg-text-1" />
						<span className="h-[2px] w-[22px] rounded-[2px] bg-text-1" />
						<span className="h-[2px] w-[22px] rounded-[2px] bg-text-1" />
					</button>
				</div>
			</div>

			<div
				className={cn(
					'fixed inset-0 z-[850] flex-col items-center justify-center gap-[26px] bg-bg-0',
					open ? 'flex' : 'hidden'
				)}
			>
				<button
					type="button"
					aria-label="Закрити меню"
					onClick={() => setOpen(false)}
					className="absolute right-[22px] top-[22px] text-[1.4rem] text-text-2 transition-colors hover:text-text-1"
				>
					✕
				</button>

				<nav className="flex flex-col items-center gap-[26px]" aria-label="Мобільне меню">
					{navLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							onClick={() => setOpen(false)}
							className="font-head text-[1.6rem] font-bold text-text-1 transition-colors hover:text-gold"
						>
							{link.label}
						</a>
					))}
				</nav>

				<ButtonMain asChild>
					<Link to="/contacts" onClick={() => setOpen(false)}>
						Почати співпрацю
					</Link>
				</ButtonMain>
			</div>
		</header>
	);
}