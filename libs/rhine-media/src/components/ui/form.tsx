import * as React from 'react';

import { ButtonMain, } from '@portfolio/rhine-media';
import { verticalOptions, budgetOptions } from '@portfolio/rhine-media-shared';
import { cn } from '@portfolio/shared-utils';
import { Icon } from '@portfolio/shared-ui';
import { Link } from 'react-router-dom';

const fieldClass = cn(
	'w-full appearance-none rounded-[0.5rem] border border-line bg-bg-2',
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
	const [showErrors, setShowErrors] = React.useState(false);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!e.currentTarget.checkValidity()) {
			setShowErrors(true);
			return;
		}
		setSubmitted(true);
	}

	const field = cn(fieldClass, showErrors && 'invalid:border-[#E87060] invalid:focus:border-[#E87060]');

	return (
		<>
			<form
				noValidate
					onSubmit={handleSubmit}
				className="flex flex-col gap-5 rounded-[1.75rem] border border-line-soft bg-bg-card p-[44px_40px] max-sm:p-[28px_22px]"
			>
				<h3 className="mb-2 font-head text-[1.35rem] font-bold">Надішліть нам повідомлення</h3>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<Field label="Ім'я*">
						<input className={field} name="firstName" required placeholder="Іван" />
					</Field>
					<Field label="Прізвище*">
						<input className={field} name="lastName" required placeholder="Шевченко" />
					</Field>
				</div>

				<Field label="Електронна адреса*">
					<input className={field} type="email" name="email" required placeholder="ivan@company.com" />
				</Field>

				<Field label="Компанія / бренд">
					<input className={field} name="company" placeholder="Назва вашої компанії" />
				</Field>

				<Field label="Telegram / Skype нік">
					<input className={field} name="social" placeholder="@вашеім'якористувача" />
				</Field>

				<Field label="Вертикаль / ніша*">
					<select className={field} name="vertical" required defaultValue="">
						<option value="" disabled>Оберіть вертикаль</option>
						{verticalOptions.map((opt) => (
							<option key={opt} value={opt}>{opt}</option>
						))}
					</select>
				</Field>

				<Field label="Місячний бюджет (USD)">
					<select className={field} name="budget" defaultValue="">
						<option value="" disabled>Оберіть бюджет</option>
						{budgetOptions.map((opt) => (
							<option key={opt} value={opt}>{opt}</option>
						))}
					</select>
				</Field>

				<Field label="Повідомлення*">
					<textarea
						className={cn(field, 'min-h-[130px] resize-y max-h-[15rem]')}
						name="message"
						required
						placeholder="Розкажіть про ваш офер, цілі, GEO та інші деталі, які допоможуть нам зрозуміти ваші потреби…"
					/>
				</Field>

				<div className='flex gap-x-2.5 items-start mb-2'>
					<span className="relative mt-[2px] flex size-[18px] flex-shrink-0">
						<input
							type="checkbox"
							name="agree"
							id="user-agree"
							required
							className={cn(
								'peer size-[18px] cursor-pointer appearance-none rounded-[5px] border border-line bg-bg-2 transition-colors',
								'checked:border-line-gold checked:bg-gold-dim',
								'focus:border-gold focus:outline-none focus:ring-[3px] focus:ring-gold/10',
								showErrors && 'invalid:border-[#E87060]'
							)}
						/>
						<svg
							className="pointer-events-none absolute inset-0 m-auto hidden size-3 text-gold peer-checked:block"
							viewBox="0 0 16 16"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
							<path d="M3.5 8.5l3 3 6-7.5" />
						</svg>
					</span>
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
						<p className="text-text-2">Ваше повідомлення надіслано. Ми звʼяжемося з вами протягом 2–4 робочих годин.</p>
					</div>
				) : (
					<ButtonMain type="submit" className="w-full">Надіслати повідомлення <Icon name='arrow' className='size-[13px]' /></ButtonMain>
				)}
			</form>
		</>
	);
}