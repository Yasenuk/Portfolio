export type TCardPicture = {
	src: string;
	alt?: string;
	width: number;
	height: number;
	sizes?: string;
};

export type TCardAuthor = {
	authorSrc?: string;
	authorName?: string;
};

export type NFTCardProps = {
	src: string;
	title: string;
	price?: number;
	bid?: number;
} & TCardAuthor;

export type CategoryCardProps = {
	src: string;
	label: string;
	icon: string;
};

export type RankingCardProps = {
	rank: number;
	src: string;
	title: string;
	sales: string;
};

export type ServiceCardProps = {
	src: string;
	title: string;
	description: string;
};