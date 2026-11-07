const { chromium } = require('playwright'); const fs=require('fs');
(async () => {
  const b = await chromium.launch(); const out={};
  const pages=[['home','https://byd-makassar.id/'],['z9','https://byd-makassar.id/model/byd-denza-z9-gt/'],['d9','https://byd-makassar.id/model/byd-denza-d9/']];
  for (const [k,u] of pages) {
    const p = await b.newPage({ viewport: { width: 412, height: 900 }, deviceScaleFactor: 2, isMobile: true });
    const r = await p.goto(u+'?nc='+Date.now(), { waitUntil: 'load', timeout: 90000 }); await p.waitForTimeout(3000);
    const info = await p.evaluate(async () => {
      const v=document.querySelector('video'); let vs=null;
      if(v){ try{const h=await fetch(v.src,{method:'HEAD'}); vs=h.status+' '+h.headers.get('content-length');}catch(e){vs='err'} }
      return {video:document.querySelectorAll('video').length, src:v?v.src.split('/').pop():null, poster:v?v.poster.split('/').pop():null, vfile:vs,
        yt:document.querySelectorAll('a[href*="youtube.com/watch"],iframe[src*="youtube"],iframe[data-src*="youtube"]').length,
        h1:(document.querySelector('h1')||{}).innerText, phpErr:/Fatal error|Warning:|Parse error/.test(document.body.innerText),
        badge:[...document.querySelectorAll('p,span')].some(e=>/VIDEO · DENZA/.test(e.innerText)), jam:/Sen–Sab 08–17/.test(document.body.innerText)};
    });
    info.status=r.status(); out[k]=info;
    const v=await p.$('video'); if(v){ await v.scrollIntoViewIfNeeded(); await p.evaluate(()=>window.scrollBy(0,150)); await p.waitForTimeout(1200); }
    await p.screenshot({path:`tmp-upload/shot/${k}.jpg`,type:'jpeg',quality:60});
  }
  fs.writeFileSync('tmp-upload/shot/r.json', JSON.stringify(out,null,1)); await b.close();
})();
