import { Icon } from '@portfolio/shared-ui';
import { cn } from '@portfolio/shared-utils';

type ExifData = {
  shutterSpeed: string;
  aperture: string;
  iso: string;
  location: string;
};

const EXIF_ICONS = [
  { name: 'shutter-speed', width: 16, height: 16, key: 'shutterSpeed' },
  { name: 'aperture',      width: 16, height: 16, key: 'aperture' },
  { name: 'iso',           width: 32, height: 16, key: 'iso' },
  { name: 'place-mark',    width: 10, height: 16, key: 'location' },
] as const;

export function ExifBar({ shutterSpeed, aperture, iso, location }: ExifData) {
  const values: Record<string, string> = { shutterSpeed, aperture, iso, location };

  return (
    <ul className={cn(
      'absolute bottom-10 right-0',
      'flex items-center justify-center gap-4',
      'w-full md:w-auto md:right-10',
    )}>
      {EXIF_ICONS.map(({ name, width, height, key }) => (
        <li key={name} className="flex items-start gap-2 text-primary">
          <Icon name={name} width={width} height={height} />
          <span className="text-primary text-xs">{values[key]}</span>
        </li>
      ))}
    </ul>
  );
}