'use client'

import { SeoProps } from '@portfolio/shared-types';
import { Helmet } from 'react-helmet-async';

export function Seo({ title, description }: SeoProps) {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}