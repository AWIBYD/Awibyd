const {chromium}=require('/tmp/pw/node_modules/playwright-core');const fs=require('fs');const D=process.env.GITHUB_WORKSPACE+'/tmp-upload/shot/';const L=s=>fs.appendFileSync(D+'t7.txt',s+'\n');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});
for(const u of ['https://byd-makassar.id/?gclid=x','https://byd-makassar.id/model/byd-ti7/','https://byd-makassar.id/keunggulan-byd-ti7-vs-fortuner-pajero-sport-makassar/','https://byd-makassar.id/simulasi-kredit/','https://byd-makassar.id/jelajah/','https://byd-makassar.id/harga-byd-makassar/']){
const c=await b.newContext({viewport:{width:390,height:844},isMobile:true});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,90)));
const r=await p.goto(u,{waitUntil:'load',timeout:60000});await p.waitForTimeout(1500);
const x=await p.evaluate(()=>{const html=document.documentElement.outerHTML;const vis=document.body.innerText;return {title:document.title,h1:(document.querySelector('h1')||{}).textContent,visTi7:(vis.match(/.{0,25}\bTi ?7\b.{0,25}/gi)||[]).slice(0,5),titan:(vis.match(/TiTAN 7/g)||[]).length,metaTi7:(document.head.innerHTML.match(/.{0,30}Ti7.{0,20}/g)||[]).slice(0,4),opt:[...document.querySelectorAll('select option')].map(o=>o.textContent).filter(t=>/titan|ti7/i.test(t))}});
L(r.status()+' '+u+' '+JSON.stringify(x)+' errs='+JSON.stringify(errs));
if(u.includes('model/byd-ti7'))await p.screenshot({path:D+'t7.jpg',quality:60});
await c.close();}
await b.close();})();
