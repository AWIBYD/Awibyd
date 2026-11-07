const fs=require('fs');
(async()=>{const o={};
for(const [t,s] of [['posts','tips-trik-khusus-cara-berkendara-hemat-ala-byd'],['posts','garansi-vs-asuransi-mobil-byd-dua-perlindungan-beda-yang-sering-dikira-sama-ini-bedanya'],['pages','kalkulator-charging-byd'],['pages','simulasi-kredit'],['pages','haka-care'],['pages','connect']]){
 const r=await fetch(`https://byd-makassar.id/wp-json/wp/v2/${t}?slug=${s}&_fields=id,title,content`);const j=await r.json();o[s]=j[0]?{id:j[0].id,t,title:j[0].title.rendered,content:j[0].content.rendered}:null;}
for(const s of ['byd-atto-2','byd-ti7','byd-denza-z9-gt','byd-denza-d9']){const h=await (await fetch('https://byd-makassar.id/model/'+s+'/?nc='+Date.now())).text();const i=h.indexOf('<div class="dealer__wrapper');o['theme_'+s]=h.slice(h.indexOf('single__model')-200,h.indexOf('blog__dealercontent')+50);}
const h=await (await fetch('https://byd-makassar.id/connect/')).text(); o.connect_title=(h.match(/<title>([^<]*)/)||[])[1];
fs.writeFileSync('tmp-upload/shot/src.json',JSON.stringify(o));})();
