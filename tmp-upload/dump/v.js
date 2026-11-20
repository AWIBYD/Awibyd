const {chromium}=require('/tmp/pw/node_modules/playwright-core');const fs=require('fs');const D=process.env.GITHUB_WORKSPACE+'/tmp-upload/dump/';const L=s=>fs.appendFileSync(D+'v.txt',s+'\n');
(async()=>{
const UA='Mozilla/5.0 (Linux; Android 13) Chrome/129 Mobile Safari/537.36';
const h=await (await fetch('https://byd-makassar.id/model/byd-denza-d9/?nc='+Date.now(),{headers:{'user-agent':UA}})).text();
const g=(re)=>{const m=h.match(re);return m?m[1]:null};
L('title='+g(/<title>([^<]*)<\/title>/));L('desc='+g(/<meta name="description" content="([^"]*)"/));L('ogtitle='+g(/property="og:title" content="([^"]*)"/));L('ogdesc='+g(/property="og:description" content="([^"]*)"/));
L('emptySrc='+(h.match(/<img[^>]*\ssrc=""/g)||[]).length);
L('has410='+/410 kW/.test(h)+' hasPremium='+/Premium/.test(h)+' has160='+/160\.000 km/.test(h)+' old150bat='+/Baterai[^<]*<\/div><div[^>]*>8 tahun \/ 150/.test(h));
L('ldjson='+(h.match(/application\/ld\+json/g)||[]).length+' types='+(h.match(/"@type":"([A-Za-z]+)"/g)||[]).join(','));
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});
const c=await b.newContext({viewport:{width:390,height:844},isMobile:true,deviceScaleFactor:1,userAgent:UA});const p=await c.newPage();
await p.goto('https://byd-makassar.id/model/byd-denza-d9/',{waitUntil:'load',timeout:60000});await p.waitForTimeout(2000);
await p.evaluate(()=>{document.querySelectorAll('.dealer__popup,.image__popup').forEach(e=>e.style.display='none');});
const r=await p.evaluate(async()=>{for(let i=0;i<120;i++){window.scrollBy(0,400);await new Promise(r=>setTimeout(r,120));}
 const im=[...document.querySelectorAll('img')].filter(i=>/denza-d9/.test(i.currentSrc||i.src||i.dataset.src||''));
 const bad=im.filter(i=>!(i.complete&&i.naturalWidth>0)).map(i=>i.src||i.dataset.src);
 const hd=[...document.querySelectorAll('h2')].find(x=>/Apa Bedanya/.test(x.textContent));
 return {n:im.length,ok:im.length-bad.length,bad,top:hd?hd.getBoundingClientRect().top+scrollY:0,sw:document.documentElement.scrollWidth};});
L('imgs '+JSON.stringify(r));
await p.evaluate(y=>window.scrollTo(0,y),r.top);await p.waitForTimeout(1200);await p.screenshot({path:D+'f1.jpg',quality:70,type:'jpeg'});
await p.evaluate(y=>window.scrollTo(0,y),r.top+1500);await p.waitForTimeout(1200);await p.screenshot({path:D+'f2.jpg',quality:70,type:'jpeg'});
await b.close();})();
