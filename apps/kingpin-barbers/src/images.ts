/**
 * Image registry. site.config.ts refers to images by key (e.g. team[].image.src = 'barber-danny');
 * this file maps keys to real imports so Astro can optimise them.
 * To replace a photo: drop the new file in src/assets/photos and update the import here.
 */
import type { ImageMetadata } from 'astro';
import hero from '@/assets/photos/hero.jpg';
import shop from '@/assets/photos/shop.jpg';
import tools from '@/assets/photos/tools.jpg';
import hotTowel from '@/assets/photos/hot-towel.jpg';
import beard from '@/assets/photos/beard.jpg';
import fade from '@/assets/photos/fade.jpg';
import wash from '@/assets/photos/wash.jpg';
import kids from '@/assets/photos/kids.jpg';
import exterior from '@/assets/photos/exterior.jpg';
import barberDanny from '@/assets/photos/barber-danny.jpg';
import barberMarcus from '@/assets/photos/barber-marcus.jpg';
import barberJess from '@/assets/photos/barber-jess.jpg';
import barberTom from '@/assets/photos/barber-tom.jpg';

export const images: Record<string, ImageMetadata> = {
  hero,
  shop,
  tools,
  'hot-towel': hotTowel,
  beard,
  fade,
  wash,
  kids,
  exterior,
  'barber-danny': barberDanny,
  'barber-marcus': barberMarcus,
  'barber-jess': barberJess,
  'barber-tom': barberTom,
};

export function img(key: string): ImageMetadata {
  const i = images[key];
  if (!i) throw new Error(`Unknown image key "${key}" — add it to src/images.ts`);
  return i;
}

/** Gallery set with alt text. Order matters. */
export const gallery: { key: string; alt: string; wide?: boolean }[] = [
  { key: 'fade', alt: 'Finished skin fade with a crisp razor line, checked in the mirror' },
  { key: 'shop', alt: 'The four chairs at Kingpin, early morning before opening', wide: true },
  { key: 'hot-towel', alt: 'Hot towel going on before a straight-razor shave' },
  { key: 'beard', alt: 'Beard being shaped with trimmers' },
  { key: 'wash', alt: 'Hair wash at the backwash basin' },
  { key: 'kids', alt: 'A young customer grinning mid-haircut' },
  { key: 'tools', alt: 'Clippers, scissors, razor, comb and brush on the counter' },
  { key: 'exterior', alt: 'The shopfront on Call Lane at dusk, barber pole lit', wide: true },
];
