const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const [name,w,h] of [['m',412,900],['d',1366,900]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: name=='m'?2:1, isMobile: name=='m' });
    await p.goto('https://byd-makassar.id/?nc=' + Date.now(), { waitUntil: 'networkidle', timeout: 90000 });
    const el = await p.$('video'); 
    if (el) { await el.evaluate(e => e.closest('div[style*="radial-gradient"]').scrollIntoView({block:'start'})); await p.evaluate(()=>window.scrollBy(0,-70)); await p.waitForTimeout(1500);
      await p.screenshot({ path: `tmp-upload/shot/${name}1.jpg`, type:'jpeg', quality:70 });
      await p.evaluate(()=>window.scrollBy(0,700)); await p.waitForTimeout(800);
      await p.screenshot({ path: `tmp-upload/shot/${name}2.jpg`, type:'jpeg', quality:70 });
      const st = await el.evaluate(async v => { const r = await fetch(v.src,{method:'HEAD'}); return r.status+' '+r.headers.get('content-type')+' '+r.headers.get('content-length'); });
      require('fs').writeFileSync(`tmp-upload/shot/${name}.txt`, st);
    } else require('fs').writeFileSync(`tmp-upload/shot/${name}.txt`, 'NO VIDEO');
  }
  await b.close();
})();
