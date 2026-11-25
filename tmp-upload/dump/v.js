const { chromium } = require('/tmp/pw/node_modules/playwright-core'); const fs=require('fs');
(async()=>{ const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']}); let out='';
const urls=['https://byd-makassar.id/model/byd-denza-d9/','https://byd-makassar.id/model/byd-ti7/','https://byd-makassar.id/','https://byd-makassar.id/?p=10404','https://byd-makassar.id/?p=7289'];
for(const u of urls){ const p=await b.newPage(); await p.goto(u+(u.includes('?')?'&':'?')+'v='+Date.now(),{waitUntil:'networkidle',timeout:60000}).catch(e=>{out+='ERR '+e+'\n'});
 const t=await p.evaluate(()=>document.body.innerText); const html=await p.content();
 const bad=await p.evaluate(()=>[...document.images].filter(i=>i.src&&i.complete&&i.naturalWidth===0&&i.loading!=='lazy').length);
 out+=u+' -> '+p.url()+'\n'; for(const k of ['1.238','1,238','675','775','639','739','tanya AWI','inden']){ out+=' '+k+':'+(t.split(k).length-1);} out+=' badimg:'+bad+' title:'+(await p.title())+'\n';
 const ld=[...html.matchAll(/"(lowPrice|highPrice)"\s*:\s*"?(\d+)/g)].map(m=>m[1]+m[2]); out+=' ld:'+ld.join(',')+'\n'; await p.close();}
fs.writeFileSync('tmp-upload/dump/v.txt',out); await b.close();})();
