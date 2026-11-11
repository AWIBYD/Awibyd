const fs=require('fs');
(async()=>{const out={};const pr=await fetch('https://byd-makassar.id/?awi_purge=ea25bc517ab6c5a7&x='+Date.now(),{headers:{'user-agent':'Mozilla/5.0 AWI'}});out.purge={st:pr.status,purgeHdr:pr.headers.get('x-litespeed-purge'),lsc:pr.headers.get('x-litespeed-cache')};await new Promise(r=>setTimeout(r,3000));
for (const ua of ['facebookexternalhit/1.1','WhatsApp/2.23.20.0 A','Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36']){
 for (const u of ['https://byd-makassar.id/','https://byd-makassar.id']){
 const r=await fetch(u,{headers:{'user-agent':ua}});const h=await r.text();
 out[ua.slice(0,20)+' '+u]={st:r.status,lsc:r.headers.get('x-litespeed-cache'),qc:r.headers.get('x-qc-cache'),cf:r.headers.get('cf-cache-status'),age:r.headers.get('age'),server:r.headers.get('server'),og:(h.match(/og:image" content="([^"]+)/)||[])[1]};}}
fs.writeFileSync('tmp-upload/shot/r.json',JSON.stringify(out,null,1));})();
