import * as React from 'react';

import { Card, CardBadge, CardContent, CardPicture, CardPictureWrapper } from '@portfolio/nft-marketplace';
import type { CategoryCardProps } from '@portfolio/nft-marketplace-types';
import { Icon } from '@portfolio/shared-ui';

export function CategoryCard({ src, icon, label, className }: CategoryCardProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card className={className}>
      <CardPictureWrapper>
        <CardPicture
          src={src}
          width={250}
          height={250}
          className="max-h-35.5 lg:max-h-60"
        />
				<CardBadge>
					<Icon sprite="icons-category" name={icon} className='size-20 lg:size-25' />
				</CardBadge>
      </CardPictureWrapper>
			<CardContent>
				<h3 className="text-h5 font-semibold text-text">{label}</h3>
			</CardContent>
    </Card>
  );
}