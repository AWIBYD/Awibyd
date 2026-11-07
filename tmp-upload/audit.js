const { chromium } = require('playwright'); const fs=require('fs');
const UA='Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36 AWI-audit';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function get(u,method='GET'){const t=Date.now();try{const r=await fetch(u,{method,redirect:'manual',headers:{'user-agent':UA}});const body=method=='GET'?await r.text():'';return {s:r.status,loc:r.headers.get('location'),body,ms:Date.now()-t,ct:r.headers.get('content-type')}}catch(e){return {s:0,err:String(e).slice(0,100),body:'',ms:Date.now()-t}}}
const strip=h=>h.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ');
(async()=>{
  const out={pages:[],links:{},shots:{}};
  const si=(await get('https://byd-makassar.id/sitemap_index.xml')).body;
  const maps=[...si.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
  let urls=[];
  for(const m of maps){const x=(await get(m)).body;urls.push(...[...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]).filter(u=>!/\.(webp|jpe?g|png)$/i.test(u)));}
  urls=[...new Set(urls)]; out.sitemaps=maps; out.count=urls.length;
  const linkset=new Map();
  for(const u of urls){
    const r=await get(u); const h=r.body||''; const text=strip(h);
    const g=re=>{const m=h.match(re);return m?m[1].trim():null};
    const h1s=[...h.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>strip(m[1]).trim());
    const bad=[];
    for(const [n,re] of [['diskon',/\bdiskon\b/i],['cashback',/cashback/i],['nego',/\bnego\b/i],['bunga 0',/bunga\s*0\s*%/i],['gratis',/\bgratis\b/i],['WIB',/\bWIB\b/],['Kerebosi',/kerebosi/i],['Rp654jt',/Rp\s?654/],['Rp765jt',/Rp\s?765/],['Rp644jt',/Rp\s?644/],['Rp734jt',/Rp\s?734/],['Rp877jt',/Rp\s?877/],['Rp398jt',/Rp\s?398/],['Rp990jt',/Rp\s?990/]]) if(re.test(text)) bad.push(n+': …'+(text.match(new RegExp('.{0,50}'+re.source+'.{0,40}',re.flags))||[''])[0]+'…');
    const phones=[...new Set((text.match(/(?:\+62|62|0)8\d[\d\s.-]{7,13}\d/g)||[]).map(p=>p.replace(/\D/g,'').replace(/^62/,'0')))];
    const was=[...new Set([...h.matchAll(/wa\.me\/(\d+)/g)].map(m=>m[1]))];
    const ld=[...h.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>{try{JSON.parse(m[1]);return 'ok'}catch(e){return 'ERR'}});
    const imgsNoAlt=[...h.matchAll(/<img\b[^>]*>/gi)].map(m=>m[0]).filter(t=>!/\balt="[^"]+"/.test(t)).length;
    out.pages.push({u,s:r.s,loc:r.loc,ms:r.ms,kb:Math.round(h.length/1024),title:g(/<title[^>]*>([\s\S]*?)<\/title>/i),desc:g(/<meta name="description" content="([^"]*)"/i),robots:g(/<meta name=["']robots["'] content=["']([^"']*)/i),canon:g(/<link rel="canonical" href="([^"]*)"/i),h1s,bad,phones,was,ld,imgsNoAlt,php:/(Fatal error|Parse error|Warning<\/b>:|Notice<\/b>:|Deprecated<\/b>:)/.test(h),words:text.split(' ').length});
    for(const m of h.matchAll(/(?:href|src|data-src)="(https?:\/\/(?:www\.)?byd-makassar\.id[^"#]*)"/g)){const l=m[1].replace(/&amp;/g,'&');if(/wp-json|xmlrpc|\?nc=|\/feed\/|wp-admin|wp-login|replytocom|\.css|\.js/.test(l))continue;if(!linkset.has(l))linkset.set(l,u);}
    await sleep(600);
  }
  out.linkTotal=linkset.size; let n=0;
  for(const [l,from] of linkset){ if(n++>900)break; let r=await get(l,'HEAD'); if(r.s==405||r.s==0) r=await get(l); if(r.s>=400||r.s==0) out.links[l]={s:r.s,from}; else if(r.s>=300) out.links[l]={s:r.s,to:r.loc,from,redir:1}; await sleep(250);}
  // mobile visual checks
  const b=await chromium.launch(); const key=['/','/harga-byd-makassar/','/model/byd-atto-1/','/model/byd-m6/','/model/byd-atto-2/','/model/byd-ti7/','/model/byd-denza-d9/','/model/byd-denza-z9-gt/','/layanan-sales-service-spare-part-byd-makassar/','/dealer-byd-sulawesi-selatan/','/simulasi-kredit/','/kontak/'];
  for(const k of key){const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true});const errs=[];p.on('console',m=>{if(m.type()=='error')errs.push(m.text().slice(0,120))});p.on('pageerror',e=>errs.push('JS:'+String(e).slice(0,120)));
    let st=0; try{const r=await p.goto('https://byd-makassar.id'+k+'?nc='+Date.now(),{waitUntil:'load',timeout:60000});st=r.status();await p.waitForTimeout(2500);}catch(e){errs.push('goto:'+String(e).slice(0,80))}
    const info=await p.evaluate(()=>({ov:document.documentElement.scrollWidth-innerWidth,vid:document.querySelectorAll('video').length,yt:document.querySelectorAll('iframe[src*=youtube],iframe[data-src*=youtube],a[href*="youtube.com/watch"]').length,brokenImg:[...document.images].filter(i=>i.complete&&i.naturalWidth==0&&!i.src.startsWith('data:')).map(i=>i.src.split('/').pop()).slice(0,5)})).catch(()=>({}));
    out.shots[k]={st,...info,errs:errs.slice(0,6)};
    await p.screenshot({path:'tmp-upload/shot/m'+key.indexOf(k)+'.jpg',type:'jpeg',quality:45});await p.close();}
  await b.close(); fs.writeFileSync('tmp-upload/shot/audit.json',JSON.stringify(out,null,1));
})();
