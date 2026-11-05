const { chromium } = require('playwright'); const fs=require('fs');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1366, height: 900 } });
  const resp = await p.goto('https://byd-makassar.id/model/byd-denza-d9/?nc=' + Date.now(), { waitUntil: 'load', timeout: 90000 });
  const html = await resp.text();
  const i = html.indexOf('specs__inner specs__left');
  fs.writeFileSync('tmp-upload/shot/src.txt', html.slice(i, i+6000));
  await b.close();
})();
