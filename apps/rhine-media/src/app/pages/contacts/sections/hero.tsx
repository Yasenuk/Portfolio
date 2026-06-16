import { Reveal, SectionHeading } from "@portfolio/rhine-media";

export default function Hero() {
	return (
		<section className="relative overflow-hidden border-b border-line-soft bg-bg-1 pb-20 pt-[148px]">
			<div
				className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px]"
				style={{ background: 'radial-gradient(circle, rgba(62,114,236,0.07) 0%, transparent 70%)' }}
			/>
			<div className="container relative">
				<Reveal>
					<SectionHeading
						align="left"
						eyebrow="Звʼяжіться з нами"
						title="Звʼяжіться з"
						highlight="Rhine Media"
						subtitle="Готові почати? Маєте запитання? Наша команда відповідає протягом 24 годин."
					/>
				</Reveal>
			</div>
		</section>
	);
}