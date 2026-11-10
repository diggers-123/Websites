#!/usr/bin/env node
/**
 * Capture home-page screenshots (desktop viewport + mobile full-height crop) for every built
 * site and save them as JPEGs into apps/portfolio/src/assets/shots/<slug>-{desktop,mobile}.jpg.
 * Run after `pnpm build` at the root. Sites without a dist/ are skipped.
 */
import { existsSync, readdirSync, readFileSync, statSync, mkdirSync } from 'node:fs';
import { join, resolve, extname, dirname } from 'node:path';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const appsDir = join(root, 'apps');
const outDir = join(root, 'apps/portfolio/src/assets/shots');
mkdirSync(outDir, { recursive: true });
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2', '.avif': 'image/avif' };

let pw;
for (const spec of ['playwright', '/opt/node-tools/node_modules/playwright/index.js']) { try { pw = await import(spec); break; } catch {} }
const { chromium } = pw.chromium ? pw : pw.default;
const browser = await chromium.launch();

for (const slug of readdirSync(appsDir)) {
  if (slug === 'portfolio') continue;
  const dist = join(appsDir, slug, 'dist');
  if (!existsSync(join(dist, 'index.html'))) { console.log(`skip ${slug} (no dist)`); continue; }
  const server = createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    let f = join(dist, p);
    if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
    if (!existsSync(f)) f = join(dist, p + '.html');
    if (!existsSync(f)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'Content-Type': MIME[extname(f)] ?? 'application/octet-stream' });
    res.end(readFileSync(f));
  });
  await new Promise((r) => server.listen(0, r));
  const port = server.address().port;
  for (const [name, vp, full] of [['desktop', { width: 1440, height: 900 }, false], ['mobile', { width: 390, height: 844 }, false]]) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
    // hide the demo banner for cleaner thumbnails and settle animations
    await page.addStyleTag({ content: '.demo-banner{display:none!important} *{animation-play-state:paused!important}' });
    await page.waitForTimeout(600);
    const buf = await page.screenshot({ fullPage: full });
    await sharp(buf).jpeg({ quality: 82, mozjpeg: true }).toFile(join(outDir, `${slug}-${name}.jpg`));
    await ctx.close();
  }
  server.close();
  console.log(`✓ ${slug}`);
}
await browser.close();
