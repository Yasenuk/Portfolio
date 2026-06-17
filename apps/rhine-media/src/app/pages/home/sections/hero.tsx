import { Link } from 'react-router-dom';

import { ButtonMain, Reveal, RevealGroup, RevealItem } from '@portfolio/rhine-media';
import { heroStats } from '@portfolio/rhine-media-shared';
import { Icon } from '@portfolio/shared-ui';

export default function Hero() {
	return (
		<section className="relative flex min-h-[700px] md:min-h-screen items-center overflow-hidden pb-[60px] pt-[90px]">
			<div
				className="pointer-events-none absolute inset-0 bg-g-grid hidden sm:block"
				style={{
					backgroundSize: '64px 64px',
				}}
			/>
			<div
				className="pointer-events-none absolute -right-40 -top-56 h-[680px] w-[680px] rounded-full blur-[40px] md:blur-[90px]"
				style={{ background: 'radial-gradient(circle, rgba(30,65,170,0.22) 0%, transparent 68%)' }}
			/>
			<div
				className="pointer-events-none absolute bottom-20 left-[5%] h-[420px] w-[420px] rounded-full blur-[40px] md:blur-[90px]"
				style={{ background: 'radial-gradient(circle, rgba(201,151,59,0.10) 0%, transparent 70%)' }}
			/>
			<div
				className="pointer-events-none absolute left-[38%] top-1/2 h-[280px] w-[280px] rounded-full blur-[40px] md:blur-[90px]"
				style={{ background: 'radial-gradient(circle, rgba(62,114,236,0.12) 0%, transparent 70%)' }}
			/>

			<div className='absolute right-0 top-0 bottom-0 opacity-[0.12] w-[46%] overflow-hidden hidden md:block'>
				<img
					loading="lazy"
					decoding="async"
					width={600}
					height={800}
					src="/assets/images/illustration.svg"
					alt="Векторна ілюстрація"
				/>
			</div>

			<div className="container relative max-w-[820px]">
				<Reveal className="max-w-[780px]">
					<span className="mb-[30px] inline-flex items-center gap-[9px] rounded-full border border-line-gold bg-gold-dim px-4 py-[7px] text-[0.72rem] font-bold uppercase tracking-[0.1em] text-gold">
						<span className="h-[7px] w-[7px] animate-pulse rounded-full bg-gold" />
						Команда закупівель Performance Media
					</span>

					<h1 className="mb-[26px] font-head text-[clamp(2.7rem,5.5vw,5rem)] font-extrabold capitalize leading-[1.08] tracking-[-0.032em]">
						Команда закупівель Performance Media |{' '}
						<span className="bg-g-gold bg-clip-text text-transparent">Rhine Media</span>
					</h1>

					<p className="mb-[42px] max-w-[580px] text-[clamp(1rem,1.8vw,1.15rem)] leading-[1.75] text-text-2">
						Ми закуповуємо трафік для ніш{' '}
						<strong className="font-medium text-text-1 capitalize">дейтинг, нутра, гемблінг, свіпстейки, iGaming</strong>{' '}
						та інших — на всіх основних майданчиках, у всіх ключових ГЕО, у преміум-масштабах.
					</p>
				</Reveal>
				<Reveal className="max-w-[780px]">
					<div className="mb-14 flex flex-wrap gap-3">
						<ButtonMain asChild>
							<Link to="/contacts">Почати співпрацю <Icon name='arrow' className='size-[13px]' /></Link>
						</ButtonMain>
						<ButtonMain asChild variant="outlined">
							<Link to="/contacts">Зв'язок</Link>
						</ButtonMain>
					</div>
				</Reveal>

				<RevealGroup className="flex flex-wrap gap-9 border-t border-line-soft pt-9">
					{heroStats.map((kpi) => (
						<RevealItem key={kpi.label} className="flex flex-col gap-[3px]">
							<span className="bg-g-gold bg-clip-text font-head text-[1.75rem] font-extrabold leading-none tracking-[-0.03em] text-transparent">
								{kpi.value}
							</span>
							<span className="text-[0.78rem] font-medium text-text-3">{kpi.label}</span>
						</RevealItem>
					))}
				</RevealGroup>
			</div>
		</section>
	);
}