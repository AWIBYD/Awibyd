const {chromium}=require('/tmp/pw/node_modules/playwright-core');const fs=require('fs');const D=process.env.GITHUB_WORKSPACE+'/tmp-upload/shot/';const L=s=>fs.appendFileSync(D+'v.txt',s+'\n');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});
const UA='Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129 Mobile Safari/537.36';
for(const [u,ref] of [['https://byd-makassar.id/',''],['https://byd-makassar.id/?gclid=tes123',''],['https://byd-makassar.id/','https://www.google.com/'],['https://byd-makassar.id/model/byd-atto-1/',''],['https://byd-makassar.id/simulasi-kredit/',''],['https://byd-makassar.id/test-drive/',''],['https://byd-makassar.id/model/byd-m6/','']]){
 const c=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,userAgent:UA,extraHTTPHeaders:ref?{Referer:ref}:{}});const p=await c.newPage();
 let jkt=0,emoji=0,bytes=0;const errs=[];
 p.on('response',r=>{if(/bydjkt/.test(r.url()))jkt++;if(/emoji/.test(r.url()))emoji++;const l=r.headers()['content-length'];if(l)bytes+=+l;});
 p.on('pageerror',e=>errs.push(String(e).slice(0,100)));
 await p.goto(u,{waitUntil:'load',timeout:90000,referer:ref||undefined});await p.waitForTimeout(3500);
 const r=await p.evaluate(()=>({splash:!!document.getElementById('awi-wel'),bunga:/Bunga 0/i.test(document.body.innerText),lazy:document.querySelectorAll('img[loading="lazy"]').length,imgs:document.images.length,formbg:[...document.querySelectorAll('.wpforms-container')].map(e=>getComputedStyle(e).backgroundImage.slice(0,60)).join('|'),tenor:[...document.querySelectorAll('select option')].map(o=>o.textContent).filter(t=>/bulan/i.test(t)).slice(0,6).join(' / ')}));
 L(u+' ref='+ref+' '+JSON.stringify({...r,jkt,emoji,kb:Math.round(bytes/1024),errs}));
 if(u.includes('simulasi'))await p.screenshot({path:D+'v_simulasi.jpg',quality:60,fullPage:false});
 await c.close();}
await b.close();})();
