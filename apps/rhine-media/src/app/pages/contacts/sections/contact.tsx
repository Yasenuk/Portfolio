import { Reveal } from "@portfolio/rhine-media";
import { ContactForm } from "@portfolio/rhine-media";
import { contactDetails } from "@portfolio/rhine-media-shared";

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
					<Reveal>
						<h3 className="mb-[14px] font-head text-[1.55rem] font-bold">Поговорімо про ваш трафік</h3>
						<p className="mb-10 text-[0.93rem] leading-[1.75] text-text-2">
							Незалежно від вертикалі чи GEO — підкажемо стратегію медіабаїнгу й орієнтовні показники ще до старту.
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
													className="text-[0.92rem] text-text-1 transition-colors hover:text-gold"
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

						<div className="mt-9 flex h-[220px] flex-col items-center justify-center gap-2 rounded-[1.25rem] border border-line-soft bg-bg-card text-center text-[0.85rem] text-text-3">
							<span className="text-[2rem]">🗺️</span>
							Працюємо віддалено · обслуговуємо клієнтів глобально
						</div>
					</Reveal>

					<Reveal>
						<ContactForm />
					</Reveal>
				</div>
			</div>
		</section>
	)
}