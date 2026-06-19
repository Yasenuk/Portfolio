import { motion, type HTMLMotionProps } from 'framer-motion';
import { fadeUp, fadeLeft, fadeRight, stagger, viewport } from '@portfolio/rhine-media-utils';

export function Reveal(props: HTMLMotionProps<'div'>) {
	return <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} {...props} />;
}

export function RevealLeft(props: HTMLMotionProps<'div'>) {
	return <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={viewport} {...props} />;
}

export function RevealRight(props: HTMLMotionProps<'div'>) {
	return <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={viewport} {...props} />;
}

export function RevealGroup(props: HTMLMotionProps<'div'>) {
	return <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewport} {...props} />;
}

export function RevealItem(props: HTMLMotionProps<'div'>) {
	return <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} {...props} />;
}
