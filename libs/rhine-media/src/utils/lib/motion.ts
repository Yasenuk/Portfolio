import type { Variants } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DURATION = 0.75;

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 28 },
	show:   { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
};

export const fadeLeft: Variants = {
	hidden: { opacity: 0, x: -28 },
	show:   { opacity: 1, x: 0, transition: { duration: DURATION, ease: EASE } },
};

export const fadeRight: Variants = {
	hidden: { opacity: 0, x: 28 },
	show:   { opacity: 1, x: 0, transition: { duration: DURATION, ease: EASE } },
};

export const stagger: Variants = {
	hidden: {},
	show:   { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const viewport = { once: true, margin: '-80px' } as const;
