const fs=require('fs');
(async()=>{const h=await (await fetch('https://byd-makassar.id/?nc='+Date.now(),{headers:{'user-agent':'facebookexternalhit/1.1'}})).text();
const tags=[...h.matchAll(/<meta[^>]+(?:property|name)="(?:og:image[^"]*|twitter:image)"[^>]*>/g)].map(m=>m[0]);
fs.writeFileSync('tmp-upload/shot/r.json',JSON.stringify(tags,null,1));})();
