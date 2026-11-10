import type { ImageMetadata } from 'astro';
import hero from '@/assets/photos/hero.jpg';
import ev from '@/assets/photos/ev.jpg';
import board from '@/assets/photos/board.jpg';
import owner from '@/assets/photos/owner.jpg';
import testing from '@/assets/photos/testing.jpg';
import lighting from '@/assets/photos/lighting.jpg';
import rewire from '@/assets/photos/rewire.jpg';
import emergency from '@/assets/photos/emergency.jpg';
import tools from '@/assets/photos/tools.jpg';
import socket from '@/assets/photos/socket.jpg';
export const images: Record<string, ImageMetadata> = { hero, ev, board, owner, testing, lighting, rewire, emergency, tools, socket };
export function img(key: string): ImageMetadata {
  const i = images[key];
  if (!i) throw new Error(`Unknown image key "${key}" — add it to src/images.ts`);
  return i;
}
