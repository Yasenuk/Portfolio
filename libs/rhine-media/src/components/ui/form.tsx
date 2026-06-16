import * as React from 'react';

import { ButtonMain, } from '@portfolio/rhine-media';
import { verticalOptions, budgetOptions } from '@portfolio/rhine-media-shared';
import { cn } from '@portfolio/shared-utils';
import { Icon } from '@portfolio/shared-ui';
import { Link } from 'react-router-dom';

const fieldClass = cn(
	'w-full rounded-[0.5rem] border border-line bg-bg-2',
	'px-[15px] py-[13px] text-[0.91rem] text-text-1 outline-none',
	'transition-all placeholder:text-text-3',
	'focus:border-gold focus:ring-[3px] focus:ring-gold/10'
);

const linkClass = "capitalize text-gold-lt";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<label className="block">
			<span className="mb-2 block text-[0.78rem] font-semibold tracking-[0.02em] text-text-2 capitalize">{label}</span>
			{children}
		</label>
	);
}

export function ContactForm() {
	const [submitted, setSubmitted] = React.useState(false);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSubmitted(true);
	}

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-5 rounded-[1.75rem] border border-line-soft bg-bg-card p-[44px_40px] max-sm:p-[28px_22px]"
			>
				<h3 className="mb-2 font-head text-[1.35rem] font-bold">Залишити заявку</h3>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<Field label="Ім'я*">
						<input className={fieldClass} name="firstName" required placeholder="Іван" />
					</Field>
					<Field label="Прізвище*">
						<input className={fieldClass} name="lastName" required placeholder="Шевченко" />
					</Field>
				</div>

				<Field label="Електронна адреса*">
					<input className={fieldClass} name="email" required placeholder="ivan@company.com" />
				</Field>

				<Field label="Компанія / бренд">
					<input className={fieldClass} name="company" placeholder="Назва вашої компанії" />
				</Field>

				<Field label="Telegram / Skype ">
					<input className={fieldClass} name="social" placeholder="@вашеім'якористувача" />
				</Field>

				<Field label="Вертикаль / ніша*">
					<select className={fieldClass} name="vertical" required defaultValue="">
						<option value="" disabled>Оберіть вертикаль</option>
						{verticalOptions.map((opt) => (
							<option key={opt} value={opt}>{opt}</option>
						))}
					</select>
				</Field>

				<Field label="Місячний бюджет (USD)">
					<select className={fieldClass} name="budget" defaultValue="">
						<option value="" disabled>Оберіть бюджет</option>
						{budgetOptions.map((opt) => (
							<option key={opt} value={opt}>{opt}</option>
						))}
					</select>
				</Field>

				<Field label="Повідомлення*">
					<textarea
						className={cn(fieldClass, 'min-h-[130px] resize-y max-h-[15rem]')}
						name="message"
						required
						placeholder="Коротко про офер, GEO та цілі…"
					/>
				</Field>

				<div className='flex gap-x-2.5 items-start mb-2'>
					<input className={cn(fieldClass, "size-3 accent-gold")} type="checkbox" name="agree" id="user-agree" />
					<label htmlFor='user-agree' className='text-text-2 text-[0.8rem] leading-[1.6] '>
						<span>
							Я погоджуюся з <Link className={linkClass} to={''}>Політикою конфіденційності</Link> та <Link className={linkClass} to={''}>Умовами використання</Link>. Я даю згоду на обробку моїх даних компанією Rhine Media для відповіді на цей запит.
						</span>
					</label>
				</div>

				{submitted ? (
					<div className="rounded-[1.75rem] border border-line-gold bg-bg-card p-[44px_40px] text-center">
						<div className="mb-4 text-[2.5rem]">✅</div>
						<h3 className="mb-2 font-head text-[1.35rem] font-bold">Дякуємо!</h3>
						<p className="text-text-2">Вашу заявку отримано. Ми звʼяжемося з вами протягом 2–4 робочих годин.</p>
					</div>
				) : (
					<ButtonMain type="submit" className="w-full">Надіслати заявку <Icon name='arrow' className='size-[13px]' /></ButtonMain>
				)}
			</form>
		</>
	);
}