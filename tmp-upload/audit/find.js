const fs=require('fs');const L=s=>fs.appendFileSync(process.env.GITHUB_WORKSPACE+'/tmp-upload/shot/find.txt',s+'\n');
(async()=>{const idx=await (await fetch('https://byd-makassar.id/sitemap_index.xml')).text();const sms=[...idx.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);let urls=[];
for(const s of sms){const x=await (await fetch(s)).text();urls.push(...[...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]).filter(u=>!/\.(jpg|png|webp)$/.test(u)));}
for(const u of urls){const h=await (await fetch(u)).text();const ids=['awik-model','awid-model','kc-model','bydkh-model','spkrm','hMod','awi-cmp3','c3r'].filter(i=>h.indexOf('id="'+i+'"')>-1);if(ids.length)L(u+' '+ids.join(','));}
L('done '+urls.length);})();
