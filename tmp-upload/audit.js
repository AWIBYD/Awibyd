const { chromium } = require('playwright'); const fs=require('fs');
const UA='Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36';
(async()=>{await fetch('https://byd-makassar.id/?awi_purge=ea25bc517ab6c5a7&x='+Date.now());await new Promise(r=>setTimeout(r,2500));const b=await chromium.launch();const out={};
for(const w of [360,390,412]){const c=await b.newContext({viewport:{width:w,height:800},deviceScaleFactor:2.6,isMobile:true,hasTouch:true,userAgent:UA});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,160)));
await p.goto('https://byd-makassar.id/jelajah/?v='+Date.now(),{waitUntil:'load',timeout:90000});await p.waitForTimeout(1500);
out[w]=await p.evaluate(()=>({fit:[...document.querySelectorAll('.sl:not([data-c]) .sc')].every(sc=>sc.scrollWidth<=sc.clientWidth+1),ov:document.documentElement.scrollWidth-innerWidth}));out[w].errs=errs;
if(w===412){await p.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';document.querySelectorAll('.fx').forEach(e=>e.classList.add('in'));document.getElementById('model').scrollIntoView()});await p.waitForTimeout(600);
for(let i=0;i<6;i++){await p.click('#nx');await p.waitForTimeout(700);}
await p.evaluate(()=>{document.querySelector('.sl[data-i="6"]:not([data-c]) .btns').scrollIntoView({block:'end'});window.scrollBy(0,140);document.getElementById('dock').style.display='none'});await p.waitForTimeout(800);
await p.screenshot({path:'tmp-upload/shot/seal.jpg',type:'jpeg',quality:60});}
await c.close();}
fs.writeFileSync('tmp-upload/shot/r.json',JSON.stringify(out,null,1));await b.close();})();
