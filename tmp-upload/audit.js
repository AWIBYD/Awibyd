const fs=require('fs');
const get=async u=>{try{const r=await fetch(u,{headers:{'user-agent':'AWI-audit'}});return {s:r.status,t:await r.text(),h:r.headers}}catch(e){return {s:0,t:''}}};
(async()=>{const out={pages:{},media:[]};
 const si=(await get('https://byd-makassar.id/sitemap_index.xml')).t;let urls=[];
 for(const m of [...si.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1])){const x=(await get(m)).t;urls.push(...[...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]).filter(u=>!/\.(webp|jpe?g|png)$/i.test(u)));}
 urls=[...new Set(urls)]; urls.push('https://byd-makassar.id/testimoni/','https://byd-makassar.id/model/');
 for(const u of [...new Set(urls)]){const h=(await get(u)).t;const imgs=[...h.matchAll(/<img\b[^>]*>/gi)].map(m=>m[0]);
   const alts=imgs.map(t=>{const a=t.match(/\balt\s*=\s*(["'])(.*?)\1/i);const s=t.match(/\b(?:data-src|src)=["']([^"']+)/);return [a?a[2]:null,s?s[1]:'']});out.pages[u.replace('https://byd-makassar.id','')+'#alts']=alts;const bad=imgs.filter(t=>{const a=t.match(/\balt\s*=\s*(["'])(.*?)\1/i);return !a||!a[2].trim();}).map(t=>t.slice(0,400));
   out.pages[u.replace('https://byd-makassar.id','')]={total:imgs.length,bad};await new Promise(r=>setTimeout(r,300));}
 for(let p=1;p<1;p++){const r=await get(`https://byd-makassar.id/wp-json/wp/v2/media?per_page=100&page=${p}&_fields=id,alt_text,source_url,title,post,mime_type`);if(r.s!=200)break;const j=JSON.parse(r.t);if(!j.length)break;out.media.push(...j.map(m=>({id:m.id,alt:m.alt_text,src:m.source_url,title:m.title&&m.title.rendered,post:m.post,mime:m.mime_type})));}
 fs.writeFileSync('tmp-upload/shot/alt.json',JSON.stringify(out));})();
