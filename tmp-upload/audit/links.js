const {chromium}=require('/tmp/pw/node_modules/playwright-core');const fs=require('fs');const D=process.env.GITHUB_WORKSPACE+'/tmp-upload/shot/';const L=s=>fs.appendFileSync(D+'links.txt',s+'\n');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});
const pages=['https://byd-makassar.id/?gclid=x','https://byd-makassar.id/model/byd-atto-1/','https://byd-makassar.id/byd-atto-1-vs-toyota-raize-vs-honda-brio-makassar/','https://byd-makassar.id/spklu-makassar/','https://byd-makassar.id/simulasi-kredit/','https://byd-makassar.id/harga-byd-makassar/','https://byd-makassar.id/kontak/','https://byd-makassar.id/jelajah/'];
for(const u of pages){const c=await b.newContext({viewport:{width:390,height:844},isMobile:true});const p=await c.newPage();
try{await p.goto(u,{waitUntil:'load',timeout:60000});}catch(e){L('ERR '+u);continue;}await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{const out=[];const body=document.body;
 document.querySelectorAll('a[href]').forEach(a=>{const cs=getComputedStyle(a);const r=a.getBoundingClientRect();if(!r.width)return;
  const par=a.parentElement;const pcs=getComputedStyle(par);
  const inline=cs.display==='inline'&&!/rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor)===false;
  const txt=(a.textContent||'').trim().slice(0,30);
  const inText=['P','LI','TD','SPAN','STRONG','EM','DD','FIGCAPTION','SMALL','H3','H4'].includes(par.tagName)&&cs.display==='inline'&&cs.backgroundColor==='rgba(0, 0, 0, 0)'&&(par.textContent||'').trim().length>txt.length+15;
  if(!inText)return;
  let anc=a,chain=[];for(let i=0;i<6&&anc;i++){anc=anc.parentElement;if(anc&&anc.className&&typeof anc.className==='string')chain.push(anc.tagName+'.'+anc.className.split(' ')[0]);}
  out.push({t:txt,c:cs.color,pc:pcs.color,dec:cs.textDecorationLine,w:cs.fontWeight,chain:chain.slice(0,4).join('>')});});
 return out;});
L('== '+u+' inline-links='+r.length);const seen={};r.forEach(x=>{const k=x.c+'|'+x.pc+'|'+x.dec+'|'+x.chain;seen[k]=(seen[k]||0)+1;if(seen[k]==1)L(JSON.stringify(x));});
await c.close();}
await b.close();})();
