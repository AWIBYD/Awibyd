const { chromium } = require('playwright-core'); const fs=require('fs');
const UA='Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36';
(async()=>{await fetch('https://byd-makassar.id/?awi_purge=ea25bc517ab6c5a7&x='+Date.now(),{signal:AbortSignal.timeout(30000)}).catch(()=>{});await new Promise(r=>setTimeout(r,2500));
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true,userAgent:UA});
const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,160)));
const r=await p.goto('https://byd-makassar.id/model/byd-atto-1/?v='+Date.now(),{waitUntil:'load',timeout:90000});await p.waitForTimeout(2500);
const o=await p.evaluate(async()=>{const v=document.querySelector('video[src*="atto-1-peluncuran"]');let meta=null;if(v){v.preload='metadata';v.load();await new Promise(r=>{v.onloadedmetadata=r;setTimeout(r,8000)});meta={dur:v.duration,w:v.videoWidth,h:v.videoHeight};}
 return {video:!!v,meta,yt:document.querySelectorAll('.model__leftvideo,iframe[src*="youtube"]').length,ov:document.documentElement.scrollWidth-innerWidth,poster:v&&v.poster}});
o.status=r.status();o.errs=errs;
await p.evaluate(()=>{const v=document.querySelector('video[src*="atto-1-peluncuran"]');v&&v.closest('div[style*="radial-gradient"]').scrollIntoView({block:'start'});window.scrollBy(0,-70);});await p.waitForTimeout(1500);
await p.screenshot({path:'tmp-upload/shot/a1.jpg',type:'jpeg',quality:60,fullPage:false});
await p.evaluate(()=>window.scrollBy(0,760));await p.waitForTimeout(800);await p.screenshot({path:'tmp-upload/shot/a2.jpg',type:'jpeg',quality:60});
fs.writeFileSync('tmp-upload/shot/r.json',JSON.stringify(o,null,1));await b.close();})();
