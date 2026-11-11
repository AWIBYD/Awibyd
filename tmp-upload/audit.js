const { chromium } = require('playwright'); const fs=require('fs');
const get=async u=>{try{return await (await fetch(u,{headers:{'user-agent':'AWI-audit'}})).text()}catch(e){return ''}};
(async () => {
  const out={old:[]};
  const si=await get('https://byd-makassar.id/sitemap_index.xml');let urls=[];
  for(const m of [...si.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1])){const x=await get(m);urls.push(...[...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]).filter(u=>!/\.(webp|jpe?g|png)$/i.test(u)));}
  for(const u of [...new Set(urls)]){const h=await get(u+'?nc='+Date.now()); if(/id="awik"|\[awi_simulasi_kredit\]/.test(h)) out.old.push(u); await new Promise(r=>setTimeout(r,250));}
  const b = await chromium.launch(); const hide='.modal,.popup,[class*=popup],[id*=popup],[class*=modal]{display:none!important}';
  const p = await b.newPage({ viewport: { width: 412, height: 900 }, deviceScaleFactor: 2, isMobile: true });
  const errs=[]; p.on('pageerror',e=>errs.push(String(e).slice(0,150)));
  await p.goto('https://byd-makassar.id/simulasi-kredit/?nc='+Date.now(), { waitUntil: 'load', timeout: 90000 }); await p.waitForTimeout(3000); await p.addStyleTag({content:hide});
  out.r = await p.evaluate(()=>{const d=document.getElementById('dp-rendah');return {has:!!d, oldCalc:!!document.getElementById('awik'), leasingLogos:document.querySelectorAll('img[src*="leasing-"]').length, feeWords:/admin|asuransi|fidusia|provisi/i.test(d?d.innerText:''), tdpLbl:d&&d.querySelector('.awid-box span').textContent, tdp2:(document.getElementById('awid-tdp2')||{}).textContent, faq:document.body.innerText.includes('Total DP Rp34.450.000'), bankAny:/mandiri|tunas finance|maybank|cimb|adira|bca finance|clipan|shinhan/i.test(document.body.innerText)}});
  out.errs=errs;
  const e=await p.$('#dp-rendah'); await e.evaluate(x=>x.scrollIntoView({block:'start'})); await p.evaluate(()=>window.scrollBy(0,380)); await p.waitForTimeout(800); await p.screenshot({path:'tmp-upload/shot/s1.jpg',type:'jpeg',quality:60});
  await p.evaluate(()=>window.scrollBy(0,600)); await p.waitForTimeout(600); await p.screenshot({path:'tmp-upload/shot/s2.jpg',type:'jpeg',quality:60});
  fs.writeFileSync('tmp-upload/shot/r.json', JSON.stringify(out,null,1)); await b.close();
})();
