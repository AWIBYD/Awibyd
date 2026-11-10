const { chromium } = require('playwright'); const fs=require('fs');
(async () => {
  const b = await chromium.launch(); const out={}; const hide='.modal,.popup,[class*=popup],[id*=popup],[class*=modal]{display:none!important}';
  const p = await b.newPage({ viewport: { width: 412, height: 900 }, deviceScaleFactor: 2, isMobile: true });
  await p.goto('https://byd-makassar.id/model/byd-ti7/?nc='+Date.now(), { waitUntil: 'load', timeout: 90000 }); await p.waitForTimeout(3000); await p.addStyleTag({content:hide});
  out.ti7 = await p.evaluate(()=>{const t=document.body.innerText;return {title:document.title, desc:(document.querySelector('meta[name=description]')||{}).content,
    old:['WLTP','127 km','16 speaker','485','1.880','489 PS','190 km/jam','17,5 menit','± 5.000','versi global','Versi global'].filter(x=>t.includes(x)),
    has:['155 km','110 km','5.146','DM-i','DM-p','≤4,8','2.920','60 L','Sentry Mode','Leopard U-Turn'].filter(x=>t.includes(x)),
    tableOverflow:[...document.querySelectorAll('table')].map(t=>t.parentElement.scrollWidth-t.parentElement.clientWidth)}});
  for (const [t,n,dy] of [['SUV Plug-in Hybrid','a1',-120],['FWD · DM-i atau','a2',-120],['Spesifikasi Lengkap','a3',-120],['Spesifikasi Lengkap','a4',650]]) { const h=await p.$(`xpath=//h2[contains(., "${t}")]`); if(h){ await h.evaluate(x=>x.scrollIntoView({block:'start'})); await p.evaluate(d=>window.scrollBy(0,d),dy); await p.waitForTimeout(900); await p.screenshot({path:`tmp-upload/shot/${n}.jpg`,type:'jpeg',quality:60}); } }
  const q = await b.newPage({ viewport: { width: 412, height: 900 }, deviceScaleFactor: 2, isMobile: true });
  await q.goto('https://byd-makassar.id/?nc='+Date.now(), { waitUntil: 'load', timeout: 90000 }); await q.waitForTimeout(3000); await q.addStyleTag({content:hide});
  out.home = await q.evaluate(()=>{const t=document.body.innerText;return {old:['(versi global)','penggerak semua roda','7 penumpang AWD'].filter(x=>t.includes(x)), new:['FWD DM-i','155 km (NEDC)','7 kursi, FWD'].filter(x=>t.includes(x))}});
  const li=await q.$('xpath=//li[contains(., "Jarak EV hingga 155 km")]'); if(li){await li.evaluate(x=>x.scrollIntoView({block:'center'})); await q.waitForTimeout(900); await q.screenshot({path:'tmp-upload/shot/h1.jpg',type:'jpeg',quality:60});}
  fs.writeFileSync('tmp-upload/shot/r.json', JSON.stringify(out,null,1)); await b.close();
})();
