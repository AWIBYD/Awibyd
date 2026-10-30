const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const b = await chromium.launch();
  const out = { pages: {}, imgs: {}, pdfs: new Set() };
  for (const url of ['https://www.byd.com/eu/car/ti7', 'https://www.byd.com/uk/car/ti7', 'https://www.byd.com/eu/car/ti7/specs', 'https://www.byd.com/uk']) {
    const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
    p.on('response', async (r) => {
      const u = r.url(); const ct = r.headers()['content-type'] || '';
      if (/image\//.test(ct) && /ti.?7/i.test(u)) { try { const buf = await r.body(); out.imgs[u] = buf.length; } catch (e) {} }
      if (/pdf/.test(ct) || /\.pdf/i.test(u)) out.pdfs.add(u);
    });
    try {
      await p.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
      for (let y = 0; y < 30; y++) { await p.mouse.wheel(0, 1200); await p.waitForTimeout(400); }
      await p.waitForTimeout(2000);
      out.pages[url] = { final: p.url(), title: await p.title() };
      const links = await p.$$eval('a', (as) => as.map((a) => a.href + ' | ' + (a.textContent || '').trim().slice(0, 60)));
      links.filter((l) => /pdf|brochure|leaflet|spec|download/i.test(l)).forEach((l) => out.pdfs.add(l));
      const txt = await p.evaluate(() => document.body.innerText);
      fs.writeFileSync('tmp-upload/ti7/page-' + url.split('/').slice(3).join('_') + '.txt', txt);
      await p.screenshot({ path: 'tmp-upload/ti7/shot-' + url.split('/').slice(3).join('_') + '.jpg', fullPage: true, type: 'jpeg', quality: 60 });
    } catch (e) { out.pages[url] = { err: String(e).slice(0, 200) }; }
    await p.close();
  }
  out.pdfs = [...out.pdfs];
  fs.writeFileSync('tmp-upload/ti7/scan.json', JSON.stringify(out, null, 1));
  await b.close();
})();
