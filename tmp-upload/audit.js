const { chromium } = require('playwright'); const fs=require('fs');
(async () => {
  const b = await chromium.launch(); const out={}; const hide='.modal,.popup,[class*=popup],[id*=popup],[class*=modal]{display:none!important}';
  const p = await b.newPage({ viewport: { width: 412, height: 900 }, deviceScaleFactor: 2, isMobile: true });
  const errs=[]; p.on('pageerror',e=>errs.push(String(e).slice(0,150)));
  await p.goto('https://byd-makassar.id/simulasi-kredit/?nc='+Date.now(), { waitUntil: 'load', timeout: 90000 }); await p.waitForTimeout(3000); await p.addStyleTag({content:hide});
  out.r = await p.evaluate(()=>({has:!!document.getElementById('dp-rendah'), raw:document.body.innerText.includes('[awi_kredit_dp_rendah]'), tdp:(document.getElementById('awid-tdp')||{}).textContent, min:(document.getElementById('awid-min')||{}).textContent, old:!!document.getElementById('awik'), desc:(document.querySelector('meta[name=description]')||{}).content, faq:document.body.innerText.includes('Ada paket DP rendah mulai 15%'), bank:/mandiri|tunas|mtf|syariah/i.test((document.getElementById('dp-rendah')||{}).innerText||'')}));
  out.errs=errs;
  const e=await p.$('#dp-rendah'); if(e){await e.evaluate(x=>x.scrollIntoView({block:'start'})); await p.evaluate(()=>window.scrollBy(0,-110)); await p.waitForTimeout(800); await p.screenshot({path:'tmp-upload/shot/s1.jpg',type:'jpeg',quality:60});
   await p.click('#awid-dp button[data-d="20"]'); await p.selectOption('#awid-model','BYD M6'); await p.waitForTimeout(500); await p.evaluate(()=>window.scrollBy(0,330)); await p.waitForTimeout(500); await p.screenshot({path:'tmp-upload/shot/s2.jpg',type:'jpeg',quality:60});
   out.m6=await p.evaluate(()=>[document.getElementById('awid-tdp').textContent,document.getElementById('awid-min').textContent]);}
  fs.writeFileSync('tmp-upload/shot/r.json', JSON.stringify(out,null,1)); await b.close();
})();
