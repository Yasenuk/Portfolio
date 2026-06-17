import { Link } from 'react-router-dom';

import { ButtonMain, Reveal, SectionHeading } from '@portfolio/rhine-media';
import { Icon } from '@portfolio/shared-ui';

export default function Cta() {
	return (
		<section className="bg-bg-0 py-[100px]">
			<div className="container">
				<Reveal>
					<div
						className="relative overflow-hidden rounded-[1.75rem] border border-[rgba(201,151,59,0.14)] px-[60px] py-[84px] text-center max-sm:px-6 max-sm:py-12"
						style={{ background: 'linear-gradient(145deg, #0D1630 0%, #09112A 100%)' }}
					>
						<div
							className="pointer-events-none absolute left-1/2 top-[-120px] h-[500px] w-[500px] -translate-x-1/2"
							style={{ background: 'radial-gradient(circle, rgba(201,151,59,0.07) 0%, transparent 65%)' }}
						/>
						<div className="relative">
							<Reveal>
								<SectionHeading
									align="center"
									eyebrow="Масштабуймося разом"
									title="Готові"
									highlight="максимізувати"
									titleEnd="свій ROI?"
									subtitle="Приєднуйтесь до брендів і партнерів, які довіряють Rhine Media забезпечувати результат у масштабі в кожному ключовому ГЕО."
								/>
							</Reveal>
							<div className="flex flex-wrap items-center justify-center gap-[14px] mt-10">
								<ButtonMain asChild>
									<Link to="/contacts">Почати співпрацю <Icon name='arrow' className='size-[13px]' /></Link>
								</ButtonMain>
								<ButtonMain asChild variant="outlined" className='text-gold border-[1.5px] border-line-gold'>
									<Link to="/contacts">Зв'язок</Link>
								</ButtonMain>
							</div>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}