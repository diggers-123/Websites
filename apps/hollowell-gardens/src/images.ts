/** Image registry: key → import. Config/content refer to keys. Replace files in src/assets/photos. */
import type { ImageMetadata } from 'astro';
import hero from '@/assets/photos/hero.jpg';
import pool from '@/assets/photos/pool.jpg';
import seedheads from '@/assets/photos/seedheads.jpg';
import designer from '@/assets/photos/designer.jpg';
import plan from '@/assets/photos/plan.jpg';
import courtyard from '@/assets/photos/courtyard.jpg';
import build from '@/assets/photos/build.jpg';
import meadow from '@/assets/photos/meadow.jpg';
import before from '@/assets/photos/before.jpg';
import after from '@/assets/photos/after.jpg';
import planting from '@/assets/photos/planting.jpg';
import kitchen from '@/assets/photos/kitchen.jpg';

export const images: Record<string, ImageMetadata> = { hero, pool, seedheads, designer, plan, courtyard, build, meadow, before, after, planting, kitchen };

export function img(key: string): ImageMetadata {
  const i = images[key];
  if (!i) throw new Error(`Unknown image key "${key}" — add it to src/images.ts`);
  return i;
}
