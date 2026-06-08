import { SVGAttributes } from 'react';

export type TIcon = SVGAttributes<SVGSVGElement> & {
	name: string;
	dir?: string;
};