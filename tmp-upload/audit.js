const { chromium } = require('playwright'); const fs=require('fs');
const UA='Mozilla/5.0 (Linux; Android 13; SM-A546E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36';
(async()=>{await fetch('https://byd-makassar.id/?awi_purge=ea25bc517ab6c5a7&x='+Date.now());await new Promise(r=>setTimeout(r,2500));const b=await chromium.launch();
const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true,userAgent:UA});const out={};const errs=[];
const p=await c.newPage();p.on('pageerror',e=>errs.push(String(e).slice(0,160)));
await p.goto('https://byd-makassar.id/jelajah/?v='+Date.now(),{waitUntil:'load',timeout:90000});await p.waitForTimeout(1500);
const links=await p.$$eval('.sl:not([data-c]) .btns a',a=>a.filter(x=>x.textContent==='Spesifikasi').map(x=>x.href));out.links=[];
for(const u of links){const r=await fetch(u,{headers:{'user-agent':UA}});out.links.push(r.status+' '+u);}
await p.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';document.querySelectorAll('.fx').forEach(e=>e.classList.add('in'));document.getElementById('model').scrollIntoView()});await p.waitForTimeout(800);
await p.$eval('#trk',t=>t.scrollTo({left:4*t.clientWidth,behavior:'instant'}));await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=document.querySelector('.sl[data-i="3"]:not([data-c]) .btns');s.scrollIntoView({block:'center'});document.getElementById('dock').style.display='none'});await p.waitForTimeout(800);
await p.screenshot({path:'tmp-upload/shot/sp.jpg',type:'jpeg',quality:60});
out.errs=errs;fs.writeFileSync('tmp-upload/shot/r.json',JSON.stringify(out,null,1));await b.close();})();
