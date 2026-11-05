const { chromium } = require('playwright'); const fs=require('fs');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1366, height: 900 } });
  await p.goto('https://byd-makassar.id/model/byd-denza-d9/?nc=' + Date.now(), { waitUntil: 'load', timeout: 90000 });
  await p.waitForTimeout(3000);
  const r = await p.evaluate(() => {
    const out=[];
    document.querySelectorAll('iframe, [data-src*="youtu"], [href*="youtu"], [data-video], .video, [class*="video"]').forEach(e=>{
      let chain=[]; let n=e; for(let i=0;i<6&&n;i++){chain.push(n.tagName+'.'+(n.className||'').toString().slice(0,60)+(n.id?'#'+n.id:'')); n=n.parentElement;}
      const rc=e.getBoundingClientRect();
      out.push({tag:e.tagName, src:(e.src||e.getAttribute('href')||e.getAttribute('data-src')||'').slice(0,150), cls:(e.className||'').toString().slice(0,80), y:Math.round(rc.top+scrollY), h:Math.round(rc.height), chain, outer:e.outerHTML.slice(0,300)});
    });
    const v=document.querySelector('video'); out.push({ourVideoY: v? Math.round(v.getBoundingClientRect().top+scrollY):null});
    return out; });
  fs.writeFileSync('tmp-upload/shot/yt.json', JSON.stringify(r,null,1));
  const yt = await p.$('iframe[src*="youtu"], [class*="video"]');
  if (yt) { await yt.scrollIntoViewIfNeeded(); await p.waitForTimeout(1000); await p.screenshot({path:'tmp-upload/shot/yt.jpg',type:'jpeg',quality:60}); }
  await p.screenshot({path:'tmp-upload/shot/full.jpg',type:'jpeg',quality:40, fullPage:true});
  await b.close();
})();
