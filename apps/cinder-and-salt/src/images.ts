import type { ImageMetadata } from 'astro';
import hero from '@/assets/photos/hero.jpg';
import pizza from '@/assets/photos/pizza.jpg';
import dough from '@/assets/photos/dough.jpg';
import wedding from '@/assets/photos/wedding.jpg';
import fire from '@/assets/photos/fire.jpg';
import team from '@/assets/photos/team.jpg';
import table from '@/assets/photos/table.jpg';
import corporate from '@/assets/photos/corporate.jpg';
import dessert from '@/assets/photos/dessert.jpg';
import festival from '@/assets/photos/festival.jpg';

export const images: Record<string, ImageMetadata> = { hero, pizza, dough, wedding, fire, team, table, corporate, dessert, festival };
export function img(key: string): ImageMetadata {
  const i = images[key];
  if (!i) throw new Error(`Unknown image key "${key}" — add it to src/images.ts`);
  return i;
}
