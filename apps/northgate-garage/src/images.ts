import type { ImageMetadata } from 'astro';
import workshop from '@/assets/photos/workshop.jpg';
import torque from '@/assets/photos/torque.jpg';
import diagnostics from '@/assets/photos/diagnostics.jpg';
import owner from '@/assets/photos/owner.jpg';
import reception from '@/assets/photos/reception.jpg';
import tyres from '@/assets/photos/tyres.jpg';
import brakes from '@/assets/photos/brakes.jpg';
import exterior from '@/assets/photos/exterior.jpg';
import aircon from '@/assets/photos/aircon.jpg';
export const images: Record<string, ImageMetadata> = { workshop, torque, diagnostics, owner, reception, tyres, brakes, exterior, aircon };
export function img(key: string): ImageMetadata {
  const i = images[key];
  if (!i) throw new Error(`Unknown image key "${key}" — add it to src/images.ts`);
  return i;
}
export const serviceImage: Record<string, string> = { mot: 'workshop', 'interim-service': 'torque', 'full-service': 'workshop', diagnostics: 'diagnostics', brakes: 'brakes', tyres: 'tyres', 'air-con': 'aircon' };
