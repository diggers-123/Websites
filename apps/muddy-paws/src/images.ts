import type { ImageMetadata } from 'astro';
import hero from '@/assets/photos/hero.jpg';
import drying from '@/assets/photos/drying.jpg';
import muddy from '@/assets/photos/muddy.jpg';
import groomer from '@/assets/photos/groomer.jpg';
import salon from '@/assets/photos/salon.jpg';
import puppy from '@/assets/photos/puppy.jpg';
import retriever from '@/assets/photos/retriever.jpg';
import schnauzer from '@/assets/photos/schnauzer.jpg';
export const images: Record<string, ImageMetadata> = { hero, drying, muddy, groomer, salon, puppy, retriever, schnauzer };
export function img(key: string): ImageMetadata {
  const i = images[key];
  if (!i) throw new Error(`Unknown image key "${key}" — add it to src/images.ts`);
  return i;
}
export const gallery: { key: string; alt: string }[] = [
  { key: 'hero', alt: 'Freshly groomed cockapoo in a bandana on the table' },
  { key: 'muddy', alt: 'A very muddy collie mid-shake in the bath' },
  { key: 'drying', alt: 'Beth blow-drying a bichon frise' },
  { key: 'schnauzer', alt: 'Scissoring a schnauzer\'s beard' },
  { key: 'retriever', alt: 'A gleaming golden retriever outside the salon' },
  { key: 'puppy', alt: 'A labrador puppy\'s first nail trim' },
  { key: 'salon', alt: 'The salon: two tables, a walk-in bath, teal walls' },
];
