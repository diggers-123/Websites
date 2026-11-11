import pw from '/opt/node-tools/node_modules/playwright/index.js'; const { chromium } = pw;
import { createServer } from 'node:http'; import { readFileSync, existsSync, statSync } from 'node:fs'; import { join, extname } from 'node:path';
const dist = process.argv[2]; const shots = process.argv[3];
const MIME = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2'};
const server = createServer((req,res)=>{let p=decodeURIComponent(req.url.split('?')[0]);let f=join(dist,p);if(existsSync(f)&&statSync(f).isDirectory())f=join(f,'index.html');if(!existsSync(f))f=join(dist,p+'.html');if(!existsSync(f)){res.writeHead(404);res.end();return;}res.writeHead(200,{'Content-Type':MIME[extname(f)]||'application/octet-stream'});res.end(readFileSync(f));});
await new Promise(r=>server.listen(0,r)); const port=server.address().port;
const browser = await chromium.launch(); const errors=[];
const page = await browser.newPage({ viewport:{width:1280,height:900}}); page.on('pageerror',e=>errors.push(e.message)); page.on('console',m=>m.type()==='error'&&errors.push(m.text()));
// wait for dist build to exist
await page.goto(`http://localhost:${port}/quote?job=ev-chargers`); await page.waitForTimeout(300);
console.log('preselected job:', await page.locator('input[name=job]:checked').getAttribute('value'));
await page.fill('#q-postcode','S10 2AB'); console.log('pc note:', await page.locator('[data-postcode-note]').textContent());
await page.fill('#q-postcode','LS1 1AA'); console.log('pc note:', await page.locator('[data-postcode-note]').textContent());
await page.click('button[type=submit]'); await page.waitForTimeout(100); console.log('errors on empty submit:', await page.locator('[data-error-for]:not([hidden])').count());
await page.fill('#q-desc','Three-bed terrace, old fuse box with rewirable fuses, wants replacing.'); await page.fill('#q-name','Test'); await page.fill('#q-postcode','S3 8BX'); await page.fill('#q-phone','0114 123 4567'); await page.fill('#q-email','t@example.com');
await page.click('button[type=submit]'); await page.waitForTimeout(800); console.log('status:', await page.locator('[data-form-status]').textContent());
await page.goto(`http://localhost:${port}/areas`); await page.fill('#pc','S11 8YA'); await page.click('[data-check]'); console.log('areas:', await page.locator('[data-result]').textContent());
const m = await browser.newPage({viewport:{width:390,height:844}}); await m.goto(`http://localhost:${port}/`); await m.click('[data-nav-toggle]'); await m.waitForTimeout(300); await m.screenshot({path: shots+'/mobile-nav.png'});
console.log('errors:', errors); await browser.close(); server.close();
