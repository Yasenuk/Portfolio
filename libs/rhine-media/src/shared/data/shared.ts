import type {
	NavLink, SocialLink, FooterColumn
} from '@portfolio/rhine-media-types';

export const navLinks: NavLink[] = [
	{ label: 'Вертикалі', href: '/#verticals' },
	{ label: 'Джерела трафіку', href: '/#traffic' },
	{ label: 'Партнери', href: '/#partners' },
	{ label: 'Чому ми', href: '/#why-us' },
	{ label: 'Контакти', href: '/contacts' },
];

export const socialLinks: SocialLink[] = [
	{ label: 'Telegram', icon: '✈', href: '#' },
	{ label: 'LinkedIn', icon: 'in', href: '#' },
	{ label: 'Twitter', icon: '𝕏', href: '#' },
	{ label: 'Skype', icon: '☁', href: '#' },
];

export const footerColumns: FooterColumn[] = [
	{
		title: 'Вертикалі',
		links: [
			{ label: 'Трафік під дейтинг', href: '/#verticals' },
			{ label: 'Нутра-кампанії', href: '/#verticals' },
			{ label: 'Гемблінг / онлайн-ігри', href: '/#verticals' },
			{ label: 'Конкурси з призами', href: '/#verticals' },
			{ label: 'Крипто-офери', href: '/#verticals' },
			{ label: 'Дорослий контент', href: '/#verticals' },
		]
	},
	{
		title: 'Джерела трафіку',
		links: [
			{ label: 'Реклама в Google', href: '/#traffic' },
			{ label: 'Реклама в соцмережах', href: '/#traffic' },
			{ label: 'Реклама в TikTok', href: '/#traffic' },
			{ label: 'PropellerAds', href: '/#traffic' },
			{ label: 'Нативна реклама', href: '/#traffic' },
			{ label: 'Пуш- та поп-реклама', href: '/#traffic' },
		]
	},
	{
		title: 'Компанія',
		links: [
			{ label: 'Про компанію', href: '/#why-us' },
			{ label: 'Контакти', href: '/contacts' },
			{ label: 'Партнери', href: '/#partners' },
			{ label: 'Умови використання', href: '/terms' },
			{ label: 'Політика конфіденційності', href: '/privacy-policy' },
		],
	},
];

export const legalFooterColumns: FooterColumn[] = [
	{
		title: 'Послуги',
		links: [
			{ label: 'Ніші', href: '/#verticals' },
			{ label: 'Джерела трафіку', href: '/#traffic' },
			{ label: 'Патерни', href: '/#partners' },
		]
	},
	{
		title: 'Компанія',
		links: [
			{ label: 'Про компанію', href: '/#why-us' },
			{ label: 'Контакти', href: '/contacts' },
		],
	},
	{
		title: 'Правова інформація',
		links: [
			{ label: 'Умови використання', href: '/terms' },
			{ label: 'Політика конфіденційності', href: '/privacy-policy' },
		],
	},
];

export const legalLinks: NavLink[] = [
	{ label: 'Умови', href: '/terms' },
	{ label: 'Політика', href: '/privacy-policy' },
	{ label: 'Контакти', href: '/contacts' },
];

export const brandDescription =
	'Преміальний performance-медіабаїнг для найамбітніших рекламодавців і партнерів світу. Створено для масштабу. Оптимізовано під ROI.';
