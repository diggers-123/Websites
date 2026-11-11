import pw from '/opt/node-tools/node_modules/playwright/index.js'; const { chromium } = pw;
import { createServer } from 'node:http'; import { readFileSync, existsSync, statSync } from 'node:fs'; import { join, extname } from 'node:path';
const dist = process.argv[2]; const shots = process.argv[3];
const MIME = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2'};
const server = createServer((req,res)=>{let p=decodeURIComponent(req.url.split('?')[0]);let f=join(dist,p);if(existsSync(f)&&statSync(f).isDirectory())f=join(f,'index.html');if(!existsSync(f))f=join(dist,p+'.html');if(!existsSync(f)){res.writeHead(404);res.end();return;}res.writeHead(200,{'Content-Type':MIME[extname(f)]||'application/octet-stream'});res.end(readFileSync(f));});
await new Promise(r=>server.listen(0,r)); const port=server.address().port;
const browser = await chromium.launch(); const errors=[];
const page = await browser.newPage({ viewport:{width:1280,height:900}}); page.on('pageerror',e=>errors.push(e.message)); page.on('console',m=>m.type()==='error'&&errors.push(m.text()));
await page.goto(`http://localhost:${port}/check-your-date`); await page.waitForTimeout(300);
for (const d of ['2027-06-12','2027-06-11','2026-12-25','2027-10-09']) { await page.fill('#d-date', d); await page.waitForTimeout(50); console.log(d, '→', (await page.locator('[data-availability]').textContent()).trim()); }
await page.click('button[type=submit]'); await page.waitForTimeout(100); console.log('errors on empty submit:', await page.locator('[data-error-for]:not([hidden])').count());
await page.fill('#d-names','A & B'); await page.fill('#d-email','ab@example.com'); await page.fill('#d-msg','A small wedding in a pub in Leith with forty people and a ceilidh after.');
await page.click('button[type=submit]'); await page.waitForTimeout(800); console.log('status:', await page.locator('[data-form-status]').textContent());
await page.goto(`http://localhost:${port}/`); await page.hover('[data-reveal-for="confetti"]'); await page.waitForTimeout(500); console.log('reveal on:', await page.locator('[data-reveal-img="confetti"].is-on').count());
await page.screenshot({path: shots+'/reveal-nav.png'});
const m = await browser.newPage({viewport:{width:390,height:844}}); await m.goto(`http://localhost:${port}/`); await m.click('[data-nav-toggle]'); await m.waitForTimeout(300); await m.screenshot({path: shots+'/mobile-nav.png'});
console.log('errors:', errors); await browser.close(); server.close();
