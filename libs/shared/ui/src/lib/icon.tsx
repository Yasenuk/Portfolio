import { TIcon } from '@portfolio/shared-types';
import { cn } from '@portfolio/shared-utils';

export default function Icon({ name = '', sprite = 'icons', width, height, className, ...props }: TIcon) {
  return (
    <svg  className={cn('size-5', className)} width={width} height={height} fill="currentColor" {...props} aria-hidden="true">
      <use href={`/assets/icons/${sprite}.svg#icon-${name}`} width={width} height={height} />
    </svg>
  );
}