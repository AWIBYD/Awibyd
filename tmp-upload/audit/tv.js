const {chromium}=require('/tmp/pw/node_modules/playwright-core');const fs=require('fs');const D=process.env.GITHUB_WORKSPACE+'/tmp-upload/shot/';const L=s=>fs.appendFileSync(D+'tv.txt',s+'\n');
(async()=>{const UA={headers:{'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/129 Safari/537.36'}};
for(const u of ['https://byd-makassar.id/model/byd-ti7/','https://byd-makassar.id/keunggulan-byd-ti7-vs-fortuner-pajero-sport-makassar/','https://byd-makassar.id/?p=10833','https://byd-makassar.id/?gclid=x','https://byd-makassar.id/jelajah/']){
 const h=await (await fetch(u+(u.includes('?')?'&':'?')+'nc='+Date.now(),UA)).text();
 const t=h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g,' ');
 L('== '+u+' len='+h.length);(h.match(/.{0,120}byd-ti7-(hero|v2l)[^"']*/g)||[]).slice(0,4).forEach(x=>L('  CTX '+x.replace(/\s+/g,' ')));
 (t.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').match(/.{0,70}(160 kW|260 N|Jade Green|Mountain Green|Titanium Grey|Starlight Silver|Obsidian Black).{0,50}/g)||[]).forEach(x=>L('  BAD '+x));
 L('  titan-imgs='+(h.match(/byd-titan-7-dm-[a-z0-9-]+\.webp/g)||[]).length+' tiGrey='+(t.match(/Ti Grey/g)||[]).length+' nebula='+(t.match(/Nebula Silver/g)||[]).length+' 110kW='+(t.match(/110 kW/g)||[]).length);
}
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});
for(const [u,n] of [['https://byd-makassar.id/model/byd-ti7/','model'],['https://byd-makassar.id/kalkulator-charging-byd/','kc'],['https://byd-makassar.id/simulasi-kredit/','sk']]){
 const c=await b.newContext({viewport:{width:390,height:844},isMobile:true});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,90)));
 await p.goto(u,{waitUntil:'load',timeout:60000});await p.waitForTimeout(2000);
 const r=await p.evaluate(async()=>{const o={};const s=id=>document.getElementById(id);
  const broken=[...document.images].filter(i=>i.complete&&i.naturalWidth===0&&(i.currentSrc||i.src).indexOf('titan')>-1).map(i=>i.src);o.broken=broken;
  if(s('kc-model')){const m=s('kc-model');const k=[...m.options].find(x=>/TiTAN/.test(x.textContent));m.value=k.value;m.dispatchEvent(new Event('change'));await new Promise(r=>setTimeout(r,300));o.kc=[...s('kc-variant').options].map(x=>x.textContent);}
  if(s('awid-model')){const m=s('awid-model');const k=[...m.options].find(x=>/TiTAN/.test(x.textContent));m.value=k.value;m.dispatchEvent(new Event('change'));await new Promise(r=>setTimeout(r,300));o.awid=[...s('awid-tipe').options].map(x=>x.textContent);}
  return o});
 L(n+' '+JSON.stringify(r)+' errs='+JSON.stringify(errs));
 if(n==='model'){await p.screenshot({path:D+'m_top.jpg',quality:60});const y=await p.evaluate(()=>{const h=[...document.querySelectorAll('h2')].find(h=>/Warna BYD TiTAN/.test(h.textContent));h.scrollIntoView();return scrollY});await p.waitForTimeout(800);await p.screenshot({path:D+'m_warna.jpg',quality:60});await p.evaluate(()=>{const h=[...document.querySelectorAll('h2')].find(h=>/Spesifikasi Lengkap/.test(h.textContent));h.scrollIntoView()});await p.waitForTimeout(500);await p.screenshot({path:D+'m_spec.jpg',quality:60});}
 await c.close();}
await b.close();})();
