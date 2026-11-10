import type { ImageMetadata } from 'astro';
import confetti from '@/assets/photos/confetti.jpg';
import father from '@/assets/photos/father.jpg';
import ceilidh from '@/assets/photos/ceilidh.jpg';
import beach from '@/assets/photos/beach.jpg';
import reading from '@/assets/photos/reading.jpg';
import rings from '@/assets/photos/rings.jpg';
import hillside from '@/assets/photos/hillside.jpg';
import nell from '@/assets/photos/nell.jpg';
import speeches from '@/assets/photos/speeches.jpg';
import bench from '@/assets/photos/bench.jpg';
import buttons from '@/assets/photos/buttons.jpg';
import newborn from '@/assets/photos/newborn.jpg';
export const images: Record<string, ImageMetadata> = { confetti, father, ceilidh, beach, reading, rings, hillside, nell, speeches, bench, buttons, newborn };
export function img(key: string): ImageMetadata {
  const i = images[key];
  if (!i) throw new Error(`Unknown image key "${key}" — add it to src/images.ts`);
  return i;
}
