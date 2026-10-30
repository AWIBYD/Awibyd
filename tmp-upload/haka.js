const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1366, height: 900 } });
  const api = [];
  p.on('response', async (r) => {
    const ct = r.headers()['content-type'] || '';
    if (/json/.test(ct)) { try { const t = await r.text(); api.push({ url: r.url(), body: t.slice(0, 60000) }); } catch (e) {} }
  });
  await p.goto('https://hakaauto.co.id/office?branch=BYD%20Haka%20Karebosi', { waitUntil: 'networkidle', timeout: 120000 });
  await p.waitForTimeout(4000);
  for (let y = 0; y < 15; y++) { await p.mouse.wheel(0, 900); await p.waitForTimeout(400); }
  fs.writeFileSync('tmp-upload/haka/text.txt', await p.evaluate(() => document.body.innerText));
  fs.writeFileSync('tmp-upload/haka/links.txt', (await p.$$eval('a', as => as.map(a => a.href + ' | ' + (a.textContent||'').trim().slice(0,80)))).join('\n'));
  fs.writeFileSync('tmp-upload/haka/iframes.txt', (await p.$$eval('iframe', as => as.map(a => a.src))).join('\n'));
  fs.writeFileSync('tmp-upload/haka/api.json', JSON.stringify(api, null, 1));
  await p.screenshot({ path: 'tmp-upload/haka/shot.jpg', fullPage: true, type: 'jpeg', quality: 55 });
  await b.close();
})();
