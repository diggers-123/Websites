/** Image registry. Files are placeholders until generated photos replace them by name. */
import type { ImageMetadata } from 'astro';
import hero from '@/assets/photos/hero.jpg';
import room from '@/assets/photos/room.jpg';
import facialist from '@/assets/photos/facialist.jpg';
import led from '@/assets/photos/led.jpg';
import serum from '@/assets/photos/serum.jpg';
import texture from '@/assets/photos/texture.jpg';
import exterior from '@/assets/photos/exterior.jpg';
import before from '@/assets/photos/before.jpg';
import after from '@/assets/photos/after.jpg';
import hands from '@/assets/photos/hands.jpg';
export const images: Record<string, ImageMetadata> = { hero, room, facialist, led, serum, texture, exterior, before, after, hands };
export function img(key: string): ImageMetadata {
  const i = images[key];
  if (!i) throw new Error(`Unknown image key "${key}" — add it to src/images.ts`);
  return i;
}
export const treatmentImage: Record<string, string> = { 'skin-consultation': 'facialist', 'signature-facial': 'hands', 'chemical-peel': 'serum', microneedling: 'texture', 'led-therapy': 'led', dermaplaning: 'hero' };
