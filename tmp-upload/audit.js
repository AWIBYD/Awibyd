const { chromium } = require('playwright'); const fs=require('fs');
(async () => {
  const b = await chromium.launch(); const hide='.modal,.popup,[class*=popup],[id*=popup],[class*=modal]{display:none!important}';
  const p = await b.newPage({ viewport: { width: 412, height: 900 }, deviceScaleFactor: 2, isMobile: true });
  const errs=[]; p.on('pageerror',e=>errs.push(String(e).slice(0,150)));
  await p.goto('https://byd-makassar.id/simulasi-kredit/?nc='+Date.now(), { waitUntil: 'load', timeout: 90000 }); await p.waitForTimeout(3000); await p.addStyleTag({content:hide});
  const r = await p.evaluate(()=>({logos:[...document.querySelectorAll('.awid-leas img')].map(i=>i.complete&&i.naturalWidth>0), tdp:(document.getElementById('awid-tdp')||{}).textContent}));
  const e=await p.$('.awid-leas'); if(e){await e.evaluate(x=>x.scrollIntoView({block:'center'})); await p.waitForTimeout(1500); await p.screenshot({path:'tmp-upload/shot/s1.jpg',type:'jpeg',quality:60});}
  fs.writeFileSync('tmp-upload/shot/r.json', JSON.stringify({r,errs})); await b.close();
})();
