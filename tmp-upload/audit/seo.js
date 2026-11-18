const fs=require('fs');const D=process.env.GITHUB_WORKSPACE+'/tmp-upload/shot/';const L=s=>fs.appendFileSync(D+'seo.txt',s+'\n');
(async()=>{for(const u of ['https://byd-makassar.id/model/byd-ti7/','https://byd-makassar.id/keunggulan-byd-ti7-vs-fortuner-pajero-sport-makassar/']){
const h=await (await fetch(u+'?nc='+Date.now(),{headers:{'user-agent':'Mozilla/5.0 Googlebot'}})).text();
const g=re=>{const m=h.match(re);return m?m[1]:null};
L('==== '+u+' bytes='+h.length);
L('title: '+g(/<title>([^<]*)/));L('desc: '+g(/name="description" content="([^"]*)/));L('canon: '+g(/rel="canonical" href="([^"]*)/));
L('og:title: '+g(/property="og:title" content="([^"]*)/));L('og:image: '+g(/property="og:image" content="([^"]*)/));
const heads=[...h.matchAll(/<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/g)].map(m=>'H'+m[1]+' '+m[2].replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim().slice(0,90));L(heads.join('\n'));
const ld=[...h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
ld.forEach((j,i)=>{try{const o=JSON.parse(j);const walk=(x,d)=>{if(Array.isArray(x))return x.forEach(y=>walk(y,d));if(x&&typeof x==='object'){if(x['@type'])L('  LD'+i+' '+' '.repeat(d)+x['@type']+' name='+(x.name||x.headline||'').toString().slice(0,60)+(x.offers?' offers='+JSON.stringify(x.offers).slice(0,120):'')+(x.mainEntity&&Array.isArray(x.mainEntity)?' faqs='+x.mainEntity.length:''));for(const k in x)if(k!=='mainEntity'||!Array.isArray(x[k]))walk(x[k],d+1);}};walk(o,0);if(/FAQPage/.test(j))(o.mainEntity||(o['@graph']||[]).flatMap(z=>z.mainEntity||[])).forEach(q=>L('     Q: '+q.name));}catch(e){L('  LD'+i+' parse err')}});
const txt=h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
L('words='+txt.split(' ').length+' titan='+(txt.match(/TiTAN 7/g)||[]).length+' ti7word='+(txt.match(/\bTi7\b/gi)||[]).length);
const imgs=[...h.matchAll(/<img[^>]+>/g)].map(m=>m[0]).filter(x=>/ti7|titan/i.test(x));L('imgs='+imgs.length+' noalt='+imgs.filter(x=>!/alt="[^"]+"/.test(x)).length);
const intro=txt.slice(txt.indexOf('TiTAN'),txt.indexOf('TiTAN')+500);L('intro: '+intro);}
// inbound links
const pages=['https://byd-makassar.id/','https://byd-makassar.id/harga-byd-makassar/','https://byd-makassar.id/model/byd-m6-dm/','https://byd-makassar.id/model/byd-atto-3/','https://byd-makassar.id/model/byd-sealion-7/','https://byd-makassar.id/simulasi-kredit/','https://byd-makassar.id/spklu-makassar/','https://byd-makassar.id/model/byd-denza-d9/'];
for(const p of pages){const h=await (await fetch(p)).text();const a=[...h.matchAll(/<a[^>]+href="[^"]*byd-ti7[^"]*"[^>]*>([\s\S]*?)<\/a>/g)].map(m=>m[1].replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim().slice(0,40));L('IN '+p+' -> '+a.length+' '+JSON.stringify(a.slice(0,5)));}
})();
