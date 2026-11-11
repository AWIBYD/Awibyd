const { chromium } = require('playwright'); const fs=require('fs');
const UA='Mozilla/5.0 (Linux; Android 13; SM-A546E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36';
(async()=>{await fetch('https://byd-makassar.id/?awi_purge=ea25bc517ab6c5a7&x='+Date.now());await new Promise(r=>setTimeout(r,2500));const b=await chromium.launch();
const out={};
for(const [w,mob] of [[390,true],[1280,false]]){
const c=await b.newContext({viewport:{width:w,height:mob?844:800},deviceScaleFactor:1,isMobile:mob,hasTouch:mob,userAgent:mob?UA:undefined});const p=await c.newPage();
const errs=[],bad=[];p.on('pageerror',e=>errs.push(String(e).slice(0,160)));p.on('response',r=>{if(r.status()>=400)bad.push(r.status()+' '+r.url().slice(0,100))});
const r=await p.goto('https://byd-makassar.id/jelajah/?v='+Date.now(),{waitUntil:'load',timeout:90000});await p.waitForTimeout(2000);
await p.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');document.documentElement.style.scrollBehavior='auto';for(let y=0;y<document.body.scrollHeight;y+=500){scrollTo(0,y);await new Promise(r=>setTimeout(r,120))}scrollTo(0,0)});await p.waitForTimeout(2000);
const o={status:r.status(),title:await p.title()};
o.info=await p.evaluate(()=>({v2:!!document.getElementById('grid'),cards:document.querySelectorAll('.mc').length,imgsOk:[...document.querySelectorAll('img')].filter(i=>i.complete&&i.naturalWidth>0).length,imgs:document.querySelectorAll('img').length,gtag:typeof gtag,ov:document.documentElement.scrollWidth-innerWidth,H:document.body.scrollHeight}));
o.errs=errs;o.bad=bad.slice(0,8);out[w]=o;
await p.evaluate(()=>document.querySelectorAll('.fx').forEach(e=>e.classList.add('in')));
await p.screenshot({path:`tmp-upload/shot/v${w}.jpg`,type:'jpeg',quality:55,fullPage:true});await c.close();}
fs.writeFileSync('tmp-upload/shot/r.json',JSON.stringify(out,null,1));await b.close();})();
