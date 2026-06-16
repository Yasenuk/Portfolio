import clsx, { type ClassValue } from 'clsx';
import { extendTailwindMerge, twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createCn(config: Parameters<typeof extendTailwindMerge>[0]) {
  const merge = extendTailwindMerge(config);
  return (...inputs: ClassValue[]) => merge(clsx(inputs));
}