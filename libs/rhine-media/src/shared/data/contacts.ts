import type { ContactDetail } from '@portfolio/rhine-media-types';

export const verticalOptions = ['Dating', 'Nutra / Здоров’я та краса', 'Gambling / Казино', 'iGaming / Беттинг', 'Sweepstakes', 'Adult', 'Crypto-офери', 'Mainstream / Інше'];
export const budgetOptions = ['До $5 000', '$5 000 – $20 000', '$20 000 – $50 000', '$50 000 – $100 000', '$100 000+'];

export const contactDetails: ContactDetail[] = [
	{ icon: '✈', label: 'Telegram', value: '@rhinemedia' },
	{ icon: '✉️', label: 'Email', value: 'hello@rhine-media.com' },
	{ icon: '💼', label: 'Робочі години', value: 'Пн – Пт · 09:00 – 20:00 CET' },
	{ icon: '⚡', label: 'Час відповіді', value: 'Зазвичай протягом 2–4 робочих годин' },
];