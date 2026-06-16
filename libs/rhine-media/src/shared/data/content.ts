import type {
	Vertical, TrafficSource, Partner, Feature, ChecklistItem,
	Stat, StatCardData, FaqItem, ContactDetail
} from '@portfolio/rhine-media-types';

export const navLinks = [
	{ label: 'Вертикалі', href: '/#verticals' },
	{ label: 'Джерела трафіку', href: '/#traffic' },
	{ label: 'Партнери', href: '/#partners' },
	{ label: 'Чому ми', href: '/#why-us' },
];

export const heroStats: Stat[] = [
	{ value: '$12M+', label: 'Рекламний бюджет / місяць' },
	{ value: '340%', label: 'Середній ROI кампаній' },
	{ value: '8+', label: 'Каналів трафіку' },
	{ value: '60+', label: 'GEO по всьому світу' },
];

export const statCards: StatCardData[] = [
	{ value: '4.2B+', title: 'Рекламних показів / місяць', sub: 'За всіма джерелами трафіку' },
	{ value: '340%', title: 'Середній ROI', sub: 'Підтверджено партнерами' },
	{ value: '7', title: 'Опанованих вертикалей', sub: 'Dating, Nutra, Gambling та інші' },
	{ value: '60+', title: 'Глобальних GEO', sub: 'Tier-1 та ринки, що зростають' },
];

export const verticals: Vertical[] = [
	{
		icon: '💘', name: 'Dating', tag: 'ВИСОКІ ОБСЯГИ',
		description: 'Mainstream та adult дейтинг-кампанії. SOI, DOI і trial-офери в tier-1 GEO з перевіреними воронками.'
	},
	{
		icon: '💊', name: 'Nutra', tag: 'ПРЕМІУМ GEO',
		description: 'Схуднення, добавки, догляд за шкірою. Спеціалізація на native та push трафіку з compliant-креативами.'
	},
	{
		icon: '🎰', name: 'Gambling', tag: 'ТОПОВИЙ ROI',
		description: 'Онлайн-казино, ставки на спорт, покер. FTD-орієнтовані воронки з високим LTV та утриманням гравців.'
	},
	{
		icon: '🔞', name: 'Adult', tag: 'СПЕЦІАЛІЗАЦІЯ',
		description: 'Adult-контент і сервіси. Compliant-кампанії через преміум adult-мережі трафіку на масштабі.'
	},
	{
		icon: '🎁', name: 'Sweepstakes', tag: 'МАСОВИЙ МАСШТАБ',
		description: 'CC-submit та SOI розіграші. Push, pop і display трафік з високою конверсією по всьому світу.'
	},
	{
		icon: '₿', name: 'Crypto Offers', tag: 'ЩО ЗРОСТАЄ',
		description: 'Криптотрейдинг-платформи, гаманці та біржові офери. FTD і CPA моделі в регульованих GEO.'
	},
	{
		icon: '📱', name: 'Mainstream', tag: 'УНІВЕРСАЛЬНІСТЬ',
		description: 'Інстали застосунків, e-commerce, утиліти. Performance-кампанії в Google, Meta і TikTok на масштабі.'
	},
	{
		icon: '🎮', name: 'iGaming', tag: 'ШВИДКЕ ЗРОСТАННЯ',
		description: 'Fantasy sports, ставки на кіберспорт і skill-based платформи. Експертиза у вертикалі, що швидко зростає.'
	},
];

export const trafficSources: TrafficSource[] = [
	{
		icon: '🚀', name: 'PropellerAds',
		sub: 'Push / Pop / OnClick'
	},
	{
		icon: '🔍', name: 'Google Ads',
		sub: 'Search / Display / YouTube'
	},
	{
		icon: '🍎', name: 'Apple Search Ads',
		sub: 'Інстали iOS-застосунків'
	},
	{
		icon: '📘', name: 'Meta Ads',
		sub: 'Facebook / Instagram'
	},
	{
		icon: '🎵', name: 'TikTok Ads',
		sub: 'In-Feed / TopView / Spark'
	},
	{
		icon: '📰', name: 'Native Ads',
		sub: 'Taboola / Outbrain'
	},
	{
		icon: '🔔', name: 'Push-сповіщення',
		sub: 'Web та In-App Push'
	},
	{
		icon: '💥', name: 'Pop-трафік',
		sub: 'Popunder / Interstitial'
	},
];

export const partners: Partner[] = [
	{ icon: '🌐', name: 'Ads.com' },
	{ icon: '⚡', name: 'Tonic' },
	{ icon: '🔭', name: 'Visymo' },
	{ icon: '💼', name: 'ClickDealer' },
	{ icon: '🏅', name: 'VortexHub' },
	{ icon: '🎯', name: 'AdVance Pro' },
	{ icon: '💎', name: 'PeakNet CPA' },
	{ icon: '🔗', name: 'LynkAffiliates' },
	{ icon: '🚀', name: 'FluxMedia' },
	{ icon: '🌟', name: 'NorthStar Network' },
	{ icon: '📊', name: 'Афіліейт-мережі' },
	{ icon: '🤝', name: 'CPA-мережі' },
];

export const whyChecklist: ChecklistItem[] = [
	{
		title: 'Оптимізація всієї воронки',
		description: 'Від A/B-тестів креативів до оптимізації лендингів після кліку. Кожна точка контакту відстежується й постійно покращується.'
	},
	{
		title: 'Прямі стосунки з паблішерами',
		description: 'Ми маємо прямі домовленості з топовими паблішерами та мережами — знижуємо витрати й підвищуємо ефективність.'
	},
	{
		title: 'Звіти в реальному часі',
		description: 'Живі дашборди з повною прозорістю щодо витрат, показів, конверсій та атрибуції доходу — 24/7.'
	},
	{
		title: 'Персональний акаунт-менеджер',
		description: 'Кожен партнер отримує окремого менеджера. Жодних черг із тікетів і затримок — прямий зв’язок у Telegram/Skype.'
	},
];

export const whyCards: Feature[] = [
	{
		icon: '📈', title: 'Баїнг на основі даних',
		description: 'Стратегії ставок на реальних даних про конверсії. Жодних здогадок — чиста логіка результату на масштабі.'
	},
	{
		icon: '🛡️', title: 'Безпечний для бренду трафік',
		description: 'Власні списки розміщень та виключення мінус-слів, щоб захищати ваш бренд завжди.'
	},
	{
		icon: '🌍', title: 'Глобальне покриття GEO',
		description: 'Tier-1, LATAM, APAC і MENA — у нас є інфраструктура, щоб миттєво масштабуватися на будь-який регіон.'
	},
	{
		icon: '⚡', title: 'Запуск за 48 годин',
		description: 'Від брифу до запуску менш ніж за 48 годин. Швидкий онбординг — ви ніколи не пропустите вікно трафіку.'
	},
];

export const verticalOptions = ['Dating', 'Nutra / Здоров’я та краса', 'Gambling / Казино', 'iGaming / Беттинг', 'Sweepstakes', 'Adult', 'Crypto-офери', 'Mainstream / Інше'];
export const budgetOptions = ['До $5 000', '$5 000 – $20 000', '$20 000 – $50 000', '$50 000 – $100 000', '$100 000+'];

export const faq: FaqItem[] = [
	{
		q: 'На яких вертикалях спеціалізується Rhine Media?',
		a: 'Dating, Nutra, Gambling, iGaming, Sweepstakes, Adult, Crypto та Mainstream — з окремими баєрами в кожній.'
	},
	{
		q: 'Який мінімальний місячний бюджет для співпраці?',
		a: 'Зазвичай ми починаємо з партнерами від $5 000/місяць рекламного бюджету, масштабуючись у міру підтвердження результатів.'
	},
	{
		q: 'Як швидко ви можете запустити кампанію?',
		a: 'Від брифу до живого трафіку — менш ніж за 48 годин завдяки злагодженому онбордингу та продакшену креативів.'
	},
	{
		q: 'З яких джерел ви закуповуєте трафік?',
		a: 'Google, Meta, TikTok, Apple Search Ads, PropellerAds, native (Taboola/Outbrain), push і pop.'
	},
	{
		q: 'Як ви звітуєте про результати?',
		a: 'Живі дашборди з повною прозорістю щодо витрат, показів, конверсій та атрибуції доходу, 24/7.'
	},
];

export const contactDetails: ContactDetail[] = [
	{ icon: '✈', label: 'Telegram', value: '@rhinemedia' },
	{ icon: '✉️', label: 'Email', value: 'hello@rhine-media.com' },
	{ icon: '💼', label: 'Робочі години', value: 'Пн – Пт · 09:00 – 20:00 CET' },
	{ icon: '⚡', label: 'Час відповіді', value: 'Зазвичай протягом 2–4 робочих годин' },
];