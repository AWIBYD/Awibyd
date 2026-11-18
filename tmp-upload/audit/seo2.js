const fs=require('fs');const D=process.env.GITHUB_WORKSPACE+'/tmp-upload/shot/';const L=s=>fs.appendFileSync(D+'seo2.txt',s+'\n');
(async()=>{for(const u of ['https://byd-makassar.id/model/byd-ti7/','https://byd-makassar.id/keunggulan-byd-ti7-vs-fortuner-pajero-sport-makassar/']){
const h=await (await fetch(u+'?nc='+Date.now())).text();const g=re=>{const m=h.match(re);return m?m[1]:null};
L('==== '+u);L('title: '+g(/<title>([^<]*)/));L('desc: '+g(/name="description" content="([^"]*)/));L('og: '+g(/property="og:title" content="([^"]*)/));
const ld=[...h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
ld.forEach(j=>{try{const o=JSON.parse(j);if(o['@type']==='FAQPage'){L('FAQPage '+o.mainEntity.length);o.mainEntity.forEach(q=>L('  Q '+q.name+' | '+q.acceptedAnswer.text.slice(0,70)))}}catch(e){L('LD parse ERR '+j.slice(0,80))}});
const t=h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
(t.match(/.{0,60}sebelumnya dikenal.{0,40}/g)||[]).forEach(x=>L('alias: '+x));(t.match(/.{0,30}20 November 2026.{0,30}/g)||[]).forEach(x=>L('launch: '+x));
L('waTi7='+(h.match(/%20Ti7/g)||[]).length+' faqpagecount='+(h.match(/"FAQPage"/g)||[]).length);}
const hh=await (await fetch('https://byd-makassar.id/?gclid=x&nc='+Date.now())).text();L('home waTi7='+(hh.match(/%20Ti7/g)||[]).length+' titan wa='+(hh.match(/TiTAN%207%20DM/g)||[]).length);
})();
