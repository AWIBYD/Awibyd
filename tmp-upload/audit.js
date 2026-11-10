const fs=require('fs');
const get=async u=>{try{return await (await fetch(u,{headers:{'user-agent':'AWI-audit'}})).text()}catch(e){return ''}};
(async()=>{const out=[];
 const si=await get('https://byd-makassar.id/sitemap_index.xml');let urls=['https://byd-makassar.id/llms.txt'];
 for(const m of [...si.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1])){const x=await get(m);urls.push(...[...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]).filter(u=>!/\.(webp|jpe?g|png)$/i.test(u)));}
 for(const u of [...new Set(urls)]){const h=await get(u);const t=h.replace(/<script(?![^>]*ld\+json)[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
  for(const m of t.matchAll(/atto[\s-]?2\b/gi)){out.push({u:u.replace('https://byd-makassar.id',''),c:t.slice(Math.max(0,m.index-140),m.index+220)});}
  await new Promise(r=>setTimeout(r,400));}
 fs.writeFileSync('tmp-upload/shot/a2grep.json',JSON.stringify(out));})();
