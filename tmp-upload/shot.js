const { chromium } = require('playwright'); const fs=require('fs');
(async () => {
  const b = await chromium.launch();
  for (const [name,w,h,y] of [['m',412,900,330],['d',1366,900,300]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: name=='m'?2:1, isMobile: name=='m' });
    await p.goto('https://byd-makassar.id/model/byd-denza-d9/?nc=' + Date.now(), { waitUntil: 'load', timeout: 90000 });
    await p.waitForTimeout(3000);
    const info = await p.evaluate(() => ({yt: document.querySelectorAll('a[href*="youtube.com/watch"],iframe[src*="youtube"],iframe[data-src*="youtube"]').length, lv: document.querySelectorAll('.model__leftvideo').length, video: document.querySelectorAll('video').length, badge: document.body.innerText.includes('VIDEO · DENZA D9'), vy: (()=>{const v=document.querySelector('video'); return v?Math.round(v.getBoundingClientRect().top+scrollY):null})()}));
    fs.writeFileSync(`tmp-upload/shot/${name}.txt`, JSON.stringify(info)+'\n');
    await p.evaluate((yy)=>window.scrollTo(0, yy), y); await p.waitForTimeout(1500);
    await p.screenshot({ path: `tmp-upload/shot/${name}1.jpg`, type:'jpeg', quality:70 });
  }
  await b.close();
})();
