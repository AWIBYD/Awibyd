const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 412, height: 900 }, deviceScaleFactor: 2, isMobile: true });
  await p.goto('https://byd-makassar.id/?nc=' + Date.now(), { waitUntil: 'networkidle', timeout: 90000 });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: 'tmp-upload/shot/m1.jpg', type: 'jpeg', quality: 70 });
  await p.evaluate(() => window.scrollBy(0, 1800)); await p.waitForTimeout(1200);
  await p.screenshot({ path: 'tmp-upload/shot/m2.jpg', type: 'jpeg', quality: 70 });
  const d = await b.newPage({ viewport: { width: 1366, height: 800 } });
  await d.goto('https://byd-makassar.id/?nc=' + Date.now(), { waitUntil: 'networkidle', timeout: 90000 });
  await d.waitForTimeout(1200); await d.screenshot({ path: 'tmp-upload/shot/d1.jpg', type: 'jpeg', quality: 60 });
  await b.close();
})();
