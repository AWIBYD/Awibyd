const fs=require('fs');
(async()=>{const out={};
for (const [k,u] of [['home','https://byd-makassar.id/?nc='+Date.now()],['home_plain','https://byd-makassar.id/'],['atto1','https://byd-makassar.id/model/byd-atto-1/']]){
 const h=await (await fetch(u,{headers:{'user-agent':'facebookexternalhit/1.1'}})).text();
 out[k]=[...h.slice(0,h.indexOf('</head>')).matchAll(/<meta[^>]+(?:property|name)="(?:og:image[^"]*|twitter:image)"[^>]*>/g)].map(m=>m[0].replace(/<meta (property|name)=/,'').slice(0,140));}
const r=await fetch('https://byd-makassar.id/wp-content/uploads/2026/11/byd-brand-of-the-year-byd-makassar.jpg',{method:'HEAD'}); out.img=r.status+' '+r.headers.get('content-type');
fs.writeFileSync('tmp-upload/shot/r.json',JSON.stringify(out,null,1));})();
