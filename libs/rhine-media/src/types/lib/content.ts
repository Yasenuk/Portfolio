import type { ReactNode } from 'react';

export type Vertical = {
	icon: string;
	name: string;
	tag: string;
	description: string
};

export type TrafficSource = {
	icon: string;
	name: string;
	sub: string
};

export type Partner = {
	icon: string;
	name: string
};

export type Feature = {
	icon: string;
	title: string;
	description: string
};

export type ChecklistItem = {
	title: string;
	description: string
};

export type Stat = {
	value: string;
	label: string
};

export type StatCardData = {
	value: string;
	title: string;
	sub: string
};

export type FaqItem = {
	q: string;
	a: string
};

export type ContactDetail = {
	icon: string;
	label: string;
	value: string
};

export type SectionHeadingProps = {
	eyebrow: string;
	title: ReactNode;
	titleEnd?: ReactNode;
	highlight: string;
	accent?: 'action' | 'azure';
	subtitle?: string;
	align?: 'center' | 'left';
};

export type NavLink = {
	label: string;
	href: string;
};

export type SocialLink = {
	label: string;
	icon: string;
	href: string;
};

export type FooterColumn = {
	title: string;
	links: NavLink[];
};