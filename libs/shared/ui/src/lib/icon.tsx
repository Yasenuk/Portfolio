import { TIcon } from '@portfolio/shared-types';

export default function Icon({ name = '', width = 20, height = 20, className, ...props }: TIcon) {
  return (
    <svg className={className} width={width} height={height} fill="currentColor" {...props} aria-hidden="true">
      <use href={`/assets/icons/icons.svg#icon-${name}`} width={width} height={height} />
    </svg>
  );
}