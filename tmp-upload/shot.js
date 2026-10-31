const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 412, height: 900 }, deviceScaleFactor: 2, isMobile: true });
  await p.goto('https://byd-makassar.id/?nc=' + Date.now(), { waitUntil: 'networkidle', timeout: 90000 });
  const el = await p.$('text=SEGERA HADIR · OPEN INDEN');
  if (el) { await el.scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollBy(0, -80)); }
  await p.waitForTimeout(1500);
  await p.screenshot({ path: 'tmp-upload/shot/m1.jpg', type: 'jpeg', quality: 70 });
  await p.evaluate(() => window.scrollBy(0, 850)); await p.waitForTimeout(1200);
  await p.screenshot({ path: 'tmp-upload/shot/m2.jpg', type: 'jpeg', quality: 70 });
  const g = await p.$('a[href="https://byd-makassar.id/model/byd-ti7/"] >> nth=-1');
  if (g) { await g.scrollIntoViewIfNeeded(); await p.waitForTimeout(1200); await p.screenshot({ path: 'tmp-upload/shot/m3.jpg', type: 'jpeg', quality: 70 }); }
  await b.close();
})();
