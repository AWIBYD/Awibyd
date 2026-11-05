const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const [name,w,h] of [['m',412,900],['d',1366,900]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: name=='m'?2:1, isMobile: name=='m' });
    await p.goto('https://byd-makassar.id/model/byd-denza-d9/?nc=' + Date.now(), { waitUntil: 'load', timeout: 90000 });
    await p.waitForTimeout(3000);
    const el = await p.$('video');
    if (el) { await el.evaluate(e => e.closest('div[style*="radial-gradient"]').scrollIntoView({block:'start'})); await p.evaluate(()=>window.scrollBy(0,-130)); await p.waitForTimeout(1500);
      await p.screenshot({ path: `tmp-upload/shot/${name}1.jpg`, type:'jpeg', quality:70 });
      await p.evaluate(()=>window.scrollBy(0,name=='m'?750:500)); await p.waitForTimeout(800); await p.screenshot({ path: `tmp-upload/shot/${name}2.jpg`, type:'jpeg', quality:70 });
      require('fs').writeFileSync(`tmp-upload/shot/${name}.txt`, 'video ok');
    } else require('fs').writeFileSync(`tmp-upload/shot/${name}.txt`, 'NO VIDEO');
  }
  await b.close();
})();
