/** Image registry. Replace any JPEG by filename to swap a photo site-wide. */
import type { ImageMetadata } from 'astro';
import hero from '@/assets/photos/hero.jpg';
import tutor from '@/assets/photos/tutor.jpg';
import laptop from '@/assets/photos/laptop.jpg';
import flatlay from '@/assets/photos/flatlay.jpg';
import online from '@/assets/photos/online.jpg';
import kitchen from '@/assets/photos/kitchen.jpg';
import whiteboard from '@/assets/photos/whiteboard.jpg';
import papers from '@/assets/photos/papers.jpg';
export const images: Record<string, ImageMetadata> = { hero, tutor, laptop, flatlay, online, kitchen, whiteboard, papers };
export function img(key: string): ImageMetadata {
  const i = images[key];
  if (!i) throw new Error(`Unknown image key "${key}" — add it to src/images.ts`);
  return i;
}
