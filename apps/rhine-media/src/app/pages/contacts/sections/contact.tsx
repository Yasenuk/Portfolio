import { RevealLeft, RevealRight } from "@portfolio/rhine-media";
import { ContactForm } from "@portfolio/rhine-media";
import { contactDetails } from "@portfolio/rhine-media-shared";

const socialChannels = [
	{ label: 'Skype', href: '#' },
	{ label: 'WhatsApp', href: '#' },
	{ label: 'LinkedIn', href: '#' },
];

function contactHref(label: string, value: string) {
	if (label === 'Telegram') return `https://t.me/${value.replace('@', '')}`;
	if (label === 'Email') return `mailto:${value}`;
	return null;
}

export default function Contact() {
	return (
		<section className="py-20">
			<div className="container">
				<div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.5fr] lg:items-start">
					<RevealLeft>
						<h3 className="mb-[14px] font-head text-[1.55rem] font-bold leading-[1.2]">
							Збудуймо щось{' '}
							<span className="bg-g-gold bg-clip-text text-transparent">прибуткове разом</span>
						</h3>
						<p className="mb-10 text-[0.93rem] leading-[1.75] text-text-2">
							Незалежно від того, хто ви — рекламодавець, що прагне масштабувати свої офери, партнерська мережа в пошуку надійної баїнг-команди чи бренд, готовий до глобальної експансії, — ми хочемо почути вас.
						</p>

						<div className="flex flex-col gap-[22px]">
							{contactDetails.map((c) => {
								const href = contactHref(c.label, c.value);
								return (
									<div key={c.label} className="flex items-start gap-[14px]">
										<span className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-[10px] border border-line-soft bg-bg-card text-[1rem]">
											{c.icon}
										</span>
										<div>
											<h4 className="mb-1 text-[0.75rem] font-bold uppercase tracking-[0.07em] text-text-3">
												{c.label}
											</h4>
											{href ? (
												<a
													href={href}
													target={href.startsWith('http') ? '_blank' : undefined}
													rel={href.startsWith('http') ? 'noreferrer' : undefined}
													className="text-[0.92rem] text-text-1 transition-colors duration-200 hover:text-gold"
												>
													{c.value}
												</a>
											) : (
												<p className="text-[0.92rem] text-text-1">{c.value}</p>
											)}
										</div>
									</div>
								);
							})}
						</div>

						<div className="mt-8">
							<p className="mb-2 text-[0.78rem] font-semibold uppercase tracking-[0.05em] text-text-3">
								Також доступні в
							</p>
							<div className="flex flex-wrap gap-[10px]">
								{socialChannels.map((s) => (
									<a
										key={s.label}
										href={s.href}
										className="inline-flex rounded-full border border-line-soft px-[18px] py-[10px] text-[0.8rem] text-text-1 transition-all duration-200 hover:-translate-y-0.5 hover:border-line-gold hover:text-gold"
									>
										{s.label}
									</a>
								))}
							</div>
						</div>

						<div className="relative mt-9 flex h-[220px] flex-col items-center justify-center gap-2 rounded-[1.25rem] border border-line-soft bg-bg-card text-center text-[0.85rem] text-text-3">
							<div className="absolute inset-0 bg-g-grid bg-[length:28px_28px]" />
							<div className="relative mb-1 grid place-items-center size-8 bg-gold-dim rounded-full rounded-ee-none border border-line-gold rotate-45 after:size-3 after:rounded-full after:bg-gold after:block" />
							<span>Rhine Media · Глобальні операції</span>
						</div>
					</RevealLeft>

					<RevealRight id="contact-form" className="scroll-mt-[100px]">
						<ContactForm />
					</RevealRight>
				</div>
			</div>
		</section>
	)
}
