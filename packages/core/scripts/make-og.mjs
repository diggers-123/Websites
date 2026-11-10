#!/usr/bin/env node
/**
 * Generate a 1200x630 Open Graph image from a photo + SVG overlay.
 * Usage: node make-og.mjs <photo> <out.jpg> '<svg overlay markup>' [darken 0..1]
 */
import sharp from 'sharp';
const [photo, out, svg, darken = '0.45'] = process.argv.slice(2);
const W = 1200, H = 630;
const base = await sharp(photo).resize(W, H, { fit: 'cover', position: 'attention' }).toBuffer();
const shade = Buffer.from(`<svg width="${W}" height="${H}"><rect width="100%" height="100%" fill="black" fill-opacity="${darken}"/></svg>`);
await sharp(base)
  .composite([{ input: shade }, { input: Buffer.from(svg) }])
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(out);
console.log('wrote', out);
