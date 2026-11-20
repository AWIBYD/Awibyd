const {chromium}=require('/tmp/pw/node_modules/playwright-core');const fs=require('fs');const D=process.env.GITHUB_WORKSPACE+'/tmp-upload/dump/';const L=s=>fs.appendFileSync(D+'v.txt',s+'\n');
(async()=>{const UA={headers:{'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/129 Safari/537.36'}};
const strip=h=>h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const pages=[['https://byd-makassar.id/model/byd-ti7/','model'],['https://byd-makassar.id/keunggulan-byd-ti7-vs-fortuner-pajero-sport-makassar/','vs'],['https://byd-makassar.id/?p=10833','p10833'],['https://byd-makassar.id/','home']];
for(const [u,n] of pages){const r=await fetch(u+(u.includes('?')?'&':'?')+'nc='+Date.now(),{...UA,redirect:'follow'});const h=await r.text();fs.writeFileSync(D+n+'.html',h);const t=strip(h.slice(h.indexOf('<body')));
 L('== '+n+' '+r.status+' len='+h.length);
 for(const m of t.matchAll(/.{0,90}(TBA|belum diumumkan|diumumkan saat|Saat launching|saat harga|harga keluar|harga resmi keluar|belum resmi).{0,110}/g)) L('  OLD '+m[0]);
 const head=h.slice(0,h.indexOf('</head>'));
 if(n==='model'||n==='vs'){L('  TITLE '+(head.match(/<title>(.*?)<\/title>/)||[])[1]);L('  DESC '+(head.match(/<meta name="description" content="([^"]*)"/)||[])[1]);L('  OGIMG '+(head.match(/og:image" content="([^"]*)"/)||[])[1]);
  L('  PRODUCT '+/"@type":"Product"/.test(h)+' AGG '+/AggregateOffer/.test(h));L('  LD '+[...head.matchAll(/"@type":"(Product|FAQPage|Question|AggregateOffer|WebPage|BreadcrumbList)"/g)].map(x=>x[1]).join(','));}
 if(n==='model'){L('  hargaSection='+/id="harga-byd-titan-7-dm"/.test(h)+' khususPerf='+(h.match(/Khusus Performance/g)||[]).length+' faqQ='+(h.match(/"@type":"Question"/g)||[]).length);}
}
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});
const c=await b.newContext({viewport:{width:390,height:844},isMobile:true,deviceScaleFactor:1});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,80)));
await p.goto('https://byd-makassar.id/model/byd-ti7/',{waitUntil:'load',timeout:60000});await p.waitForTimeout(2500);
await p.evaluate(()=>{document.querySelectorAll('.dealer__popup,.image__popup').forEach(e=>e.style.display='none');});
await p.screenshot({path:D+'s0.jpg',quality:70,type:'jpeg'});
const top=await p.evaluate(async()=>{for(let y=0;y<9000;y+=500){window.scrollBy(0,500);await new Promise(r=>setTimeout(r,120));}const h=document.getElementById('harga-byd-titan-7-dm');return h?h.getBoundingClientRect().top+scrollY:null;});
L('harga top='+top+' errs='+JSON.stringify(errs));
if(top){await p.evaluate(y=>window.scrollTo(0,y-90),top);await p.waitForTimeout(800);await p.screenshot({path:D+'s1.jpg',quality:70,type:'jpeg'});}
await b.close();})();
