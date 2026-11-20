const {chromium}=require('/tmp/pw/node_modules/playwright-core');const fs=require('fs');const D=process.env.GITHUB_WORKSPACE+'/tmp-upload/dump/';const L=s=>fs.appendFileSync(D+'v.txt',s+'\n');
(async()=>{const h=await (await fetch('https://byd-makassar.id/model/byd-ti7/?nc='+Date.now(),{headers:{'user-agent':'Mozilla/5.0 (Linux; Android 13) Chrome/129 Mobile Safari/537.36'}})).text();
L('emptySrc='+(h.match(/<img[^>]*\ssrc=""/g)||[]).length+' flyerImgTags='+(h.match(/<img[^>]*byd-titan-7-dm-(dm-p-performa|suspensi|multi-terrain|leopard|v2l-camping-flyer|adas-tire)[^>]*>/g)||[]).length);
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});
const c=await b.newContext({viewport:{width:390,height:844},isMobile:true,deviceScaleFactor:1,userAgent:'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 Chrome/129 Mobile Safari/537.36'});const p=await c.newPage();
await p.goto('https://byd-makassar.id/model/byd-ti7/',{waitUntil:'load',timeout:60000});await p.waitForTimeout(2000);
await p.evaluate(()=>{document.querySelectorAll('.dealer__popup,.image__popup').forEach(e=>e.style.display='none');});
const r=await p.evaluate(async()=>{const hd=[...document.querySelectorAll('h2')].find(x=>/6 Fitur Utama/.test(x.textContent));hd.scrollIntoView();
 for(let i=0;i<14;i++){window.scrollBy(0,380);await new Promise(r=>setTimeout(r,350));}
 const im=[...document.querySelectorAll('img')].filter(i=>/dm-p-performa|suspensi-disus|multi-terrain|leopard-u-turn|v2l-camping-flyer|adas-tire/.test(i.currentSrc||i.src||i.dataset.src||''));
 return {n:im.length,ok:im.filter(i=>i.complete&&i.naturalWidth>0).length,top:hd.getBoundingClientRect().top+scrollY};});
L('imgs '+JSON.stringify(r));
await p.evaluate(y=>window.scrollTo(0,y),r.top+180);await p.waitForTimeout(1200);await p.screenshot({path:D+'f1.jpg',quality:70,type:'jpeg'});
await p.evaluate(y=>window.scrollTo(0,y),r.top+1300);await p.waitForTimeout(1200);await p.screenshot({path:D+'f2.jpg',quality:70,type:'jpeg'});
await b.close();})();
