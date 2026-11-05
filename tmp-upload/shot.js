const { chromium } = require('playwright'); const fs=require('fs');
(async () => {
  const b = await chromium.launch();
  for (const [name,w,h] of [['m',412,900],['d',1366,900]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: name=='m'?2:1, isMobile: name=='m' });
    await p.goto('https://byd-makassar.id/model/byd-denza-d9/?nc=' + Date.now(), { waitUntil: 'load', timeout: 90000 });
    await p.waitForTimeout(3000);
    const info = await p.evaluate(() => ({yt: document.querySelectorAll('a[href*="youtube.com/watch"]').length, lv: document.querySelectorAll('.model__leftvideo').length, vy: (()=>{const v=document.querySelector('video'); return v?Math.round(v.getBoundingClientRect().top+scrollY):null})()}));
    fs.writeFileSync(`tmp-upload/shot/${name}.txt`, JSON.stringify(info));
    await p.evaluate(()=>window.scrollTo(0, w<500?380:330)); await p.waitForTimeout(1500);
    await p.screenshot({ path: `tmp-upload/shot/${name}1.jpg`, type:'jpeg', quality:70 });
  }
  await b.close();
})();
