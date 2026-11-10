#!/usr/bin/env node
/**
 * Fetch openly-licensed photography from the Openverse API (https://api.openverse.org)
 * into a site's `src/assets/photos/` folder and record attribution in `CREDITS.md`.
 *
 * Only CC0 / Public Domain / CC BY / CC BY-SA images are accepted. CC BY requires
 * attribution: the generated CREDITS.md satisfies that, and each site's footer links
 * to a /credits page. Replace these with the client's own photography before launch.
 *
 * Usage:
 *   node fetch-images.mjs <appDir> <manifest.json>
 * manifest.json: [{ "name": "hero", "query": "barber shop interior", "min": 1200,
 *                   "orientation": "landscape"|"portrait"|"square", "exclude": ["word"] }]
 *
 * This is a build-time dev tool, not part of the deployed site. It uses a generic
 * User-Agent and the public, unauthenticated Openverse endpoint (rate limited).
 */
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const [appDir, manifestPath] = process.argv.slice(2);
if (!appDir || !manifestPath) {
  console.error('usage: fetch-images.mjs <appDir> <manifest.json>');
  process.exit(1);
}
const manifest = JSON.parse(readFileSync(resolve(manifestPath), 'utf8'));
const outDir = resolve(appDir, 'src/assets/photos');
mkdirSync(outDir, { recursive: true });
const creditsPath = resolve(appDir, 'CREDITS.md');
const credits = existsSync(creditsPath) ? readFileSync(creditsPath, 'utf8') : '# Image credits\n\nPhotography sourced via Openverse. Replace with client photography before launch.\n\n';
const lines = [];
const ACCEPT = new Set(['cc0', 'pdm', 'by', 'by-sa']);

async function search(q, opts) {
  const params = new URLSearchParams({
    q,
    page_size: '20',
    license: 'cc0,pdm,by,by-sa',
    mature: 'false',
  });
  if (opts.orientation) params.set('aspect_ratio', opts.orientation === 'landscape' ? 'wide' : opts.orientation === 'portrait' ? 'tall' : 'square');
  if (opts.source) params.set('source', opts.source);
  const res = await fetch(`https://api.openverse.org/v1/images/?${params}`, {
    headers: { 'User-Agent': 'portfolio-image-fetch/1.0 (build-time tool)' },
  });
  if (!res.ok) throw new Error(`openverse ${res.status}`);
  return (await res.json()).results ?? [];
}

for (const item of manifest) {
  const target = join(outDir, `${item.name}.jpg`);
  if (existsSync(target) && !item.force) {
    console.log(`skip ${item.name} (exists)`);
    continue;
  }
  let results = [];
  for (const q of [item.query, ...(item.alt ?? [])]) {
    results = results.concat(await search(q, item));
    if (results.length > 20) break;
  }
  const min = item.min ?? 1000;
  const excl = (item.exclude ?? []).map((s) => s.toLowerCase());
  const seen = new Set();
  const pick = results
    .filter((r) => (seen.has(r.id) ? false : (seen.add(r.id), true)))
    .filter((r) => ACCEPT.has(r.license))
    .filter((r) => r.width >= min || r.height >= min)
    .filter((r) => !excl.some((w) => `${r.title} ${r.tags?.map((t) => t.name).join(' ')}`.toLowerCase().includes(w)))
    .filter((r) => !/\.(gif|svg)$/i.test(r.url))
    .sort((a, b) => {
      // prefer CC0 / PDM, then larger
      const la = a.license === 'cc0' || a.license === 'pdm' ? 0 : 1;
      const lb = b.license === 'cc0' || b.license === 'pdm' ? 0 : 1;
      return la - lb || b.width * b.height - a.width * a.height;
    })[item.pick ?? 0];
  if (!pick) {
    console.warn(`no result for ${item.name} (${item.query})`);
    continue;
  }
  const img = await fetch(pick.url, { headers: { 'User-Agent': 'portfolio-image-fetch/1.0' } });
  if (!img.ok) {
    console.warn(`download failed ${item.name}: ${img.status}`);
    continue;
  }
  writeFileSync(target, Buffer.from(await img.arrayBuffer()));
  const lic = pick.license.toUpperCase().replace('BY', 'CC BY').replace('PDM', 'Public Domain Mark');
  lines.push(`- **${item.name}.jpg** — "${pick.title ?? 'Untitled'}" by ${pick.creator ?? 'unknown'} (${pick.source}), ${lic}${pick.license_version ? ' ' + pick.license_version : ''}. Source: ${pick.foreign_landing_url}`);
  console.log(`✓ ${item.name}  ${pick.width}x${pick.height}  ${pick.license}  ${pick.source}`);
}
if (lines.length) writeFileSync(creditsPath, credits + lines.join('\n') + '\n');
