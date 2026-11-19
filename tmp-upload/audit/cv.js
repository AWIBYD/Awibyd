const {chromium}=require('/tmp/pw/node_modules/playwright-core');const fs=require('fs');const D=process.env.GITHUB_WORKSPACE+'/tmp-upload/shot/';const L=s=>fs.appendFileSync(D+'cv.txt',s+'\n');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});
const pages=['https://byd-makassar.id/simulasi-kredit/','https://byd-makassar.id/kalkulator-charging-byd/','https://byd-makassar.id/kalkulator-hemat/','https://byd-makassar.id/?gclid=x','https://byd-makassar.id/harga-byd-makassar/','https://byd-makassar.id/dp-rendah/','https://byd-makassar.id/paket-dp-rendah/'];
for(const u of pages){const c=await b.newContext({viewport:{width:390,height:844},isMobile:true});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,100)));
const r=await p.goto(u,{waitUntil:'load',timeout:60000}).catch(e=>null);if(!r){L('ERR '+u);continue;}await p.waitForTimeout(1500);
const res=await p.evaluate(async()=>{const o={};const sel=(id)=>document.getElementById(id);const opts=id=>sel(id)?[...sel(id).options].map(x=>x.textContent):null;
 o.awik=opts('awik-model');o.awid=opts('awid-model');o.kc=opts('kc-model');o.kh=opts('bydkh-model');
 const tryM=async(mid,tid,name,read)=>{const m=sel(mid);if(!m)return null;const k=[...m.options].find(x=>x.textContent.indexOf(name)>-1);if(!k)return 'missing';m.value=k.value;m.dispatchEvent(new Event('change'));await new Promise(r=>setTimeout(r,300));const t=sel(tid);return {tipe:t?[...t.options].map(x=>x.textContent):null,...read()}};
 o.awikT=await tryM('awik-model','awik-tipe','TiTAN',()=>({otr:sel('awik-otr').value,ph:sel('awik-otr').placeholder,ang:(sel('awik-ang')||{}).textContent,wa:decodeURIComponent((sel('awik-wa')||{}).href||'').slice(0,220)}));
 o.awidT=await tryM('awid-model','awid-tipe','TiTAN',()=>({otr:sel('awid-otr').value,msg:(sel('awid-msg')||{}).textContent,wa:decodeURIComponent((sel('awid-wa')||{}).href||'').slice(30,200)}));
 o.awidA=await tryM('awid-model','awid-tipe','Atto 1',()=>({otr:sel('awid-otr').value,min:(sel('awid-min')||{}).textContent}));
 o.kcT=await tryM('kc-model','kc-variant','TiTAN',()=>({chip:(sel('kc-chip')||{}).textContent}));
 return o});
L('== '+u+' '+r.status()+' errs='+JSON.stringify(errs));for(const k in res)if(res[k]!==null)L('  '+k+': '+JSON.stringify(res[k]));
await c.close();}
await b.close();})();
