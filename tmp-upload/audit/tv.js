const {chromium}=require('/tmp/pw/node_modules/playwright-core');const fs=require('fs');const D=process.env.GITHUB_WORKSPACE+'/tmp-upload/shot/';const L=s=>fs.appendFileSync(D+'tv.txt',s+'\n');
(async()=>{const UA={headers:{'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/129 Safari/537.36'}};
const h=await (await fetch('https://byd-makassar.id/model/byd-ti7/?nc='+Date.now(),UA)).text();
const t=h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
(h.match(/[\s\S]{0,500}Harga Mulai[\s\S]{0,400}/)||['NOPILL']).forEach(x=>L('PILL '+x.replace(/\s+/g,' ')));L('len='+h.length+' fitur='+(h.includes('awi-titan-fitur-start')||t.includes('6 Fitur Utama'))+' flyerimgs='+(h.match(/byd-titan-7-dm-(dm-p-performa|suspensi-disus|multi-terrain|leopard-u-turn|v2l-camping-flyer|adas-tire)[a-z0-9-]*\.webp/g)||[]).length);
(t.match(/.{0,60}(TBA|Diumumkan saat peluncuran|Harga resmi Indonesia).{0,60}/g)||[]).forEach(x=>L('  P '+x));
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});
const c=await b.newContext({viewport:{width:390,height:844},isMobile:true,deviceScaleFactor:1});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,90)));
await p.goto('https://byd-makassar.id/model/byd-ti7/',{waitUntil:'load',timeout:60000});await p.waitForTimeout(2500);
const r=await p.evaluate(async()=>{const h=[...document.querySelectorAll('h2')].find(x=>/6 Fitur Utama/.test(x.textContent));if(!h)return {none:1};h.scrollIntoView();
 for(let y=0;y<4000;y+=400){window.scrollBy(0,400);await new Promise(r=>setTimeout(r,250));}h.scrollIntoView();await new Promise(r=>setTimeout(r,800));
 const im=[...document.images].filter(i=>/flyer|disus|leopard|multi-terrain|adas-tire|dm-p-performa/.test(i.currentSrc||i.src||i.dataset.src||''));
 return {n:im.length,broken:im.filter(i=>i.complete&&i.naturalWidth===0).length,top:h.getBoundingClientRect().top+scrollY,
  price:[...document.querySelectorAll('*')].filter(e=>e.children.length===0&&/TBA/.test(e.textContent)).slice(0,6).map(e=>e.tagName+':'+e.textContent.trim().slice(0,60))};});
L('model '+JSON.stringify(r)+' errs='+JSON.stringify(errs));
if(r.top){for(let k=0;k<4;k++){await p.evaluate(y=>window.scrollTo(0,y),r.top-60+k*800);await p.waitForTimeout(700);await p.screenshot({path:D+'f'+k+'.jpg',quality:70,type:'jpeg'});}}
await p.evaluate(()=>window.scrollTo(0,0));await p.waitForTimeout(500);await p.screenshot({path:D+'top.jpg',quality:70,type:'jpeg',fullPage:false});
for(const [u,id,sel] of [['https://byd-makassar.id/simulasi-kredit/','awid-model','']]){const q=await c.newPage();await q.goto(u,{waitUntil:'load',timeout:60000});await q.waitForTimeout(1500);
 const o=await q.evaluate(async(id)=>{const m=document.getElementById(id);if(!m)return null;const k=[...m.options].find(x=>/TiTAN/.test(x.textContent));m.value=k.value;m.dispatchEvent(new Event('change'));await new Promise(r=>setTimeout(r,500));return (document.body.innerText.match(/.{0,40}TBA.{0,60}/g)||[]).slice(0,3);},id);L('sk '+JSON.stringify(o));}
await b.close();})();
