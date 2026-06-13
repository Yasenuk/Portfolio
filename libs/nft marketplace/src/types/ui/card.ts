export type TCardPicture = {
	src: string;
	alt?: string;
};

export type TCardAuthor = {
	src: string;
	name: string;
};

export type NFTCardProps = {
	src: string;
	title: string;
	price?: number;
	bid?: number;
};

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