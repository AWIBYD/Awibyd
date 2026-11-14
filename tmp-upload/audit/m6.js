const {chromium}=require('/tmp/pw/node_modules/playwright-core');const fs=require('fs');const D=process.env.GITHUB_WORKSPACE+'/tmp-upload/shot/';const L=s=>fs.appendFileSync(D+'m6.txt',s+'\n');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});
for(const [w,h,n] of [[390,844,'hp'],[1366,800,'pc']]){
const c=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:1,isMobile:n==='hp'});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,100)));
await p.goto('https://byd-makassar.id/model/byd-m6-dm/?v='+Date.now(),{waitUntil:'load',timeout:90000});await p.waitForTimeout(2500);
const r=await p.evaluate(async()=>{const v=document.querySelector('video[src*="m6-dm-video"]');if(!v)return {video:false};v.scrollIntoView({block:'center'});
 let ok=false;try{v.muted=true;await v.play();await new Promise(r=>setTimeout(r,2500));ok=v.currentTime>0.5;v.pause();}catch(e){ok='err '+e}
 return {video:true,playable:ok,dur:v.duration,yt:!!document.querySelector('.model__leftvideo'),h2:[...document.querySelectorAll('h2')].findIndex(h=>/Video BYD M6 DM/.test(h.textContent))}});
L(n+' '+JSON.stringify(r)+' errs='+JSON.stringify(errs));
await p.waitForTimeout(800);
const box=await p.evaluate(()=>{const v=document.querySelector('video[src*="m6-dm-video"]');if(!v)return null;let e=v;for(let i=0;i<7;i++)e=e.parentElement;const r=e.getBoundingClientRect();return {y:r.top+scrollY,h:r.height}});
if(box)await p.screenshot({path:D+'m6_'+n+'.jpg',quality:70,clip:{x:0,y:Math.max(0,box.y-10),width:w,height:Math.min(box.h+20,1800)},fullPage:true});
await c.close();}
await b.close();})();
