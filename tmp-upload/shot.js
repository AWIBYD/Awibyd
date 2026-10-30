const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 412, height: 900 }, deviceScaleFactor: 2, isMobile: true, userAgent: 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/130.0 Mobile Safari/537.36' });
  await p.goto('https://byd-makassar.id/?nc=' + Date.now(), { waitUntil: 'networkidle', timeout: 90000 });
  for (const t of [1, 13]) { await p.waitForTimeout(t === 1 ? 1000 : 4000); await p.screenshot({ path: `tmp-upload/shot/m${t}.jpg`, type: 'jpeg', quality: 70 }); }
  const d = await b.newPage({ viewport: { width: 1366, height: 800 } });
  await d.goto('https://byd-makassar.id/?nc=' + Date.now(), { waitUntil: 'networkidle', timeout: 90000 });
  await d.waitForTimeout(1500); await d.screenshot({ path: 'tmp-upload/shot/d1.jpg', type: 'jpeg', quality: 70 });
  await b.close();
})();
