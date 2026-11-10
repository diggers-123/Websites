#!/usr/bin/env node
/**
 * Smoke test for a built Astro site (static `dist/`):
 *  1. Crawls every HTML page, checks internal links & asset refs resolve.
 *  2. Checks every page has <title>, <meta name="description">, exactly one <h1>, <html lang>.
 *  3. Checks every <img> has alt.
 *  4. Serves dist/ and loads each page in headless Chromium at mobile + desktop widths,
 *     failing on console errors / uncaught exceptions. (Skipped with --no-browser.)
 *
 * Usage: node smoke.mjs ./dist [--no-browser] [--screens <dir>]
 */
import { readdirSync, readFileSync, statSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname, extname } from 'node:path';
import { createServer } from 'node:http';

const args = process.argv.slice(2);
const distDir = resolve(args[0] ?? './dist');
const noBrowser = args.includes('--no-browser');
const screensIdx = args.indexOf('--screens');
const screensDir = screensIdx > -1 ? resolve(args[screensIdx + 1]) : null;

if (!existsSync(distDir)) {
  console.error(`dist not found: ${distDir}`);
  process.exit(1);
}

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const files = walk(distDir);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const fileSet = new Set(files.map((f) => f.slice(distDir.length).replace(/\\/g, '/')));

function resolveLink(href, fromFile) {
  // strip query/hash
  let h = href.split('#')[0].split('?')[0];
  if (!h) return true; // same-page anchor
  if (/^(https?:|mailto:|tel:|sms:|data:|javascript:)/i.test(h)) return true;
  let path;
  if (h.startsWith('/')) path = h;
  else {
    const fromDir = dirname(fromFile.slice(distDir.length)).replace(/\\/g, '/');
    path = resolve('/', fromDir, h);
  }
  const candidates = [path, path.replace(/\/$/, '') + '/index.html', path + '/index.html', path + '.html'];
  if (path.endsWith('/')) candidates.push(path + 'index.html');
  return candidates.some((c) => fileSet.has(c));
}

let failures = 0;
const warn = (msg) => console.warn('  ⚠ ' + msg);
const fail = (msg) => {
  failures++;
  console.error('  ✗ ' + msg);
};

console.log(`Smoke testing ${htmlFiles.length} pages in ${distDir}`);
for (const f of htmlFiles) {
  const rel = f.slice(distDir.length);
  const html = readFileSync(f, 'utf8');
  const problems = [];
  if (!/<html[^>]*\slang=/i.test(html)) problems.push('missing <html lang>');
  if (!/<title>[^<]+<\/title>/i.test(html)) problems.push('missing <title>');
  if (!/<meta\s+name="description"\s+content="[^"]+"/i.test(html) && !/<meta\s+content="[^"]+"\s+name="description"/i.test(html))
    problems.push('missing meta description');
  const h1s = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1s !== 1) problems.push(`expected 1 <h1>, found ${h1s}`);
  if (!/<link\s+rel="canonical"/i.test(html)) problems.push('missing canonical');
  const imgs = html.match(/<img\b[^>]*>/gi) || [];
  for (const img of imgs) if (!/\salt=/i.test(img)) problems.push(`img without alt: ${img.slice(0, 80)}`);
  const hrefs = [...html.matchAll(/\s(?:href|src|srcset)="([^"]+)"/gi)].map((m) => m[1]);
  for (const href of hrefs) {
    if (href.includes(',') && / \d+w/.test(href)) {
      for (const part of href.split(',')) {
        const url = part.trim().split(' ')[0];
        if (url && !resolveLink(url, f)) problems.push(`broken srcset ref: ${url}`);
      }
      continue;
    }
    if (!resolveLink(href, f)) problems.push(`broken link: ${href}`);
  }
  if (problems.length) {
    console.log(rel);
    problems.forEach(fail);
  }
}

if (!noBrowser) {
  const MIME = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.mjs': 'text/javascript',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ico': 'image/x-icon',
    '.xml': 'application/xml',
    '.txt': 'text/plain',
    '.webmanifest': 'application/manifest+json',
  };
  const server = createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    let file = join(distDir, p);
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    if (!existsSync(file)) file = join(distDir, p + '.html');
    if (!existsSync(file)) file = join(distDir, '404.html');
    if (!existsSync(file)) {
      res.writeHead(404);
      res.end('not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' });
    res.end(readFileSync(file));
  });
  await new Promise((r) => server.listen(0, r));
  const port = server.address().port;
  let pw;
  for (const spec of ['playwright', '/opt/node-tools/node_modules/playwright/index.js']) {
    try { pw = await import(spec); break; } catch {}
  }
  if (!pw) { console.error('playwright not found; run with --no-browser or install playwright'); process.exit(1); }
  const { chromium } = pw.chromium ? pw : pw.default;
  const browser = await chromium.launch();
  const pages = htmlFiles.map((f) => f.slice(distDir.length).replace(/index\.html$/, '').replace(/\.html$/, '') || '/');
  const viewports = [
    { name: 'mobile', width: 390, height: 844 },
    { name: 'desktop', width: 1440, height: 900 },
  ];
  if (screensDir) mkdirSync(screensDir, { recursive: true });
  for (const vp of viewports) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(`${m.text()}`);
    });
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
    page.on('requestfailed', (r) => errors.push(`requestfailed: ${r.url()}`));
    for (const p of pages) {
      errors.length = 0;
      await page.goto(`http://localhost:${port}${p}`, { waitUntil: 'networkidle' });
      // horizontal overflow check
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (overflow > 1) fail(`[${vp.name}] ${p} horizontal overflow ${overflow}px`);
      if (errors.length) {
        console.log(`[${vp.name}] ${p}`);
        errors.forEach(fail);
      }
      if (screensDir) {
        // Scroll through the page so lazy images and scroll reveals fire, then back to top.
        await page.evaluate(async () => {
          const h = document.documentElement.scrollHeight;
          for (let y = 0; y < h; y += 600) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 80)); }
          window.scrollTo({ top: 0, behavior: 'instant' });
        });
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(400);
        const name = (p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '_')) + `-${vp.name}.png`;
        await page.screenshot({ path: join(screensDir, name), fullPage: true });
      }
    }
    await ctx.close();
  }
  await browser.close();
  server.close();
}

if (failures) {
  console.error(`\n${failures} problem(s) found.`);
  process.exit(1);
}
console.log('\n✓ Smoke test passed.');
