/**
 * Image registry. Five photos generated for the demo (hero via Figma; the rest via Canva).
 * Keys used across pages: hero, coach, group, hands, client.
 */
import type { ImageMetadata } from 'astro';
import hero from '@/assets/photos/hero.jpg';
import coach from '@/assets/photos/coach.jpg';
import group from '@/assets/photos/group.jpg';
import hands from '@/assets/photos/hands.jpg';
import client from '@/assets/photos/client.jpg';
export const images: Record<string, ImageMetadata> = { hero, coach, group, hands, client };
export function img(key: string): ImageMetadata {
  const i = images[key];
  if (!i) throw new Error(`Unknown image key "${key}" — add it to src/images.ts`);
  return i;
}
