import * as React from 'react';

import { Card, CardBadge, CardContent, CardPicture, CardPictureWrapper } from '@portfolio/nft marketplace';
import type { CategoryCardProps } from '@portfolio/nft marketplace-types';
import { Icon } from '@portfolio/shared-ui';

export function CategoryCard({ src, icon, label, className }: CategoryCardProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card className={className}>
      <CardPictureWrapper>
        <CardPicture src={src} className="'max-h-[8.875rem] md:'max-h-60" />
				<CardBadge>
					<Icon sprite="icons-category" name={icon} width={100} height={100} />
				</CardBadge>
      </CardPictureWrapper>
			<CardContent>
				<h3 className="text-h5 font-semibold text-text">{label}</h3>
			</CardContent>
    </Card>
  );
}