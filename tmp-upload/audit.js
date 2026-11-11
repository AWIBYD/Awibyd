const { chromium } = require('playwright'); const fs=require('fs');
const UA='Mozilla/5.0 (Linux; Android 13; SM-A546E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36';
(async()=>{await fetch('https://byd-makassar.id/?awi_purge=ea25bc517ab6c5a7&x='+Date.now());await new Promise(r=>setTimeout(r,2500));const b=await chromium.launch();
const c=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,userAgent:UA});const out={};
async function pg(u,fn){const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,160)));const r=await p.goto(u+'?v='+Date.now(),{waitUntil:'load',timeout:90000});await p.waitForTimeout(2500);let o={};try{o=await fn(p)}catch(e){o.err=String(e).slice(0,200)}o.status=r.status();o.errs=errs;await p.close();return o;}
const opts=(p,s)=>p.$$eval(s+' option',a=>a.map(x=>x.textContent));
out.jelajah=await pg('https://byd-makassar.id/jelajah/',async p=>({hemat:(await opts(p,'#hMod')).length,kredit:(await opts(p,'#kSel')).length,year:await p.textContent('#hYear')}));
out.hemat=await pg('https://byd-makassar.id/kalkulator-hemat/',async p=>({models:await opts(p,'#bydkh-model'),year:await p.textContent('#bydkh-year')}));
out.charging=await pg('https://byd-makassar.id/kalkulator-charging-byd/',async p=>({models:await opts(p,'#kc-model'),chip:await p.textContent('#kc-chip')}));
out.kredit=await pg('https://byd-makassar.id/simulasi-kredit/',async p=>{await p.selectOption('#awid-model','BYD M6 DM');return {models:await opts(p,'#awid-model'),m6dm:await opts(p,'#awid-tipe'),tdp:await p.textContent('#awid-tdp')}});
fs.writeFileSync('tmp-upload/shot/r.json',JSON.stringify(out,null,1));await b.close();})();
