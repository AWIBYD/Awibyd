const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const b = await chromium.launch();
  for (const [n,u] of [['service','https://hakaauto.co.id/service'],['form-service','https://hakaauto.co.id/form-service']]) {
    const p = await b.newPage({ viewport: { width: 1366, height: 900 } });
    try { await p.goto(u, { waitUntil: 'networkidle', timeout: 90000 }); await p.waitForTimeout(3000);
      fs.writeFileSync(`tmp-upload/haka/${n}.txt`, await p.evaluate(() => document.body.innerText)); } catch (e) { fs.writeFileSync(`tmp-upload/haka/${n}.txt`, String(e)); }
    await p.close();
  }
  await b.close();
})();
