const {chromium}=require('/tmp/pw/node_modules/playwright-core');
const fs=require('fs');const OUT=process.env.GITHUB_WORKSPACE+'/tmp-upload/shot/';
const H='https://byd-makassar.id';
async function txt(u){try{const r=await fetch(u,{redirect:'manual',headers:{'user-agent':'Mozilla/5.0 (Linux; Android 13) AuditBot'}});return {s:r.status,loc:r.headers.get('location'),h:Object.fromEntries(r.headers),b:await r.text()};}catch(e){return {s:0,e:String(e)};}}
(async()=>{
 const res={};
 const rb=await txt(H+'/robots.txt');res.robots=rb.b;
 // sitemap
 let urls=new Set();const smi=await txt(H+'/sitemap_index.xml');res.smi_status=smi.s;
 const sms=[...(smi.b||'').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);res.sitemaps=sms;
 for(const s of sms){const r=await txt(s);for(const m of (r.b||'').matchAll(/<loc>([^<]+)<\/loc>/g)){if(!/\.(jpg|png|webp|jpeg)$/i.test(m[1]))urls.add(m[1]);}}
 urls=[...urls];res.count=urls.length;
 // misc checks
 for(const v of ['http://byd-makassar.id/','https://www.byd-makassar.id/','https://byd-makassar.id/halaman-tidak-ada-xyz/']){const r=await txt(v);res['chk '+v]=r.s+' '+(r.loc||'');}
 const home=await txt(H+'/');res.home_headers=home.h;
 const pages=[];const links=new Map();
 for(const u of urls){
  const r=await txt(u);const b=r.b||'';
  const g=(re)=>{const m=b.match(re);return m?m[1].replace(/\s+/g,' ').trim():null;};
  const p={u,s:r.s,loc:r.loc,bytes:b.length,
   title:g(/<title[^>]*>([^<]*)<\/title>/i),
   desc:g(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i),
   canon:g(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)/i),
   robots:g(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)/i),
   ogimg:g(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)/i),
   h1:(b.match(/<h1[\s>]/gi)||[]).length,
   h1t:g(/<h1[^>]*>([\s\S]*?)<\/h1>/i),
   imgs:(b.match(/<img\s/gi)||[]).length,
   noalt:(b.match(/<img(?![^>]*\balt=["'][^"']+["'])[^>]*>/gi)||[]).length,
   schema:[...b.matchAll(/"@type"\s*:\s*"([^"]+)"/g)].map(m=>m[1]).filter((v,i,a)=>a.indexOf(v)===i).slice(0,15),
   words:b.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').split(/\s+/).filter(Boolean).length,
   forbidden:['diskon','cashback','nego','bunga 0','gratis','WIB','Kerebosi'].filter(w=>new RegExp('\\b'+w+'\\b','i').test(b.replace(/<script[\s\S]*?<\/script>/gi,'').replace(/<[^>]+>/g,' '))),
   wa:(b.match(/wa\.me\/(\d+)/g)||[]).filter((v,i,a)=>a.indexOf(v)===i)};
  for(const m of b.matchAll(/href=["'](https?:\/\/byd-makassar\.id[^"'#]*)["']/g)){const l=m[1];if(!/wp-content|wp-json|xmlrpc|\?|feed|wp-login|comments/.test(l))links.set(l,(links.get(l)||0)+1);}
  pages.push(p);
 }
 res.pages=pages;
 // internal link status
 const bad=[];for(const l of links.keys()){const r=await txt(l);if(r.s>=300)bad.push([l,r.s,r.loc]);}res.badlinks=bad;res.nlinks=links.size;
 fs.writeFileSync(OUT+'crawl.json',JSON.stringify(res,null,1));
 // render check mobile: console errors, horizontal overflow, LCP-ish
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});
 const rr=[];
 for(const u of [H+'/',H+'/model/byd-atto-1/',H+'/simulasi-kredit/',H+'/spklu-makassar/']){
  const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129 Mobile Safari/537.36'});
  const p=await c.newPage();const errs=[];const failed=[];let reqs=0,bytes=0;
  p.on('console',m=>{if(m.type()==='error')errs.push(m.text().slice(0,160));});p.on('pageerror',e=>errs.push('PE '+String(e).slice(0,160)));
  p.on('requestfailed',r=>failed.push(r.url().slice(0,120)));p.on('response',async r=>{reqs++;const l=r.headers()['content-length'];if(l)bytes+=+l;});
  const t0=Date.now();await p.goto(u+'?a='+Date.now(),{waitUntil:'load',timeout:90000});const tl=Date.now()-t0;
  await p.waitForTimeout(3000);
  const m=await p.evaluate(()=>({ovf:document.documentElement.scrollWidth-window.innerWidth,h:document.documentElement.scrollHeight,
    tap:[...document.querySelectorAll('a,button')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&(r.height<32||r.width<32)&&getComputedStyle(e).display!=='inline'}).length,
    lcp:performance.getEntriesByType('largest-contentful-paint').slice(-1)[0]?.startTime||null}));
  await p.screenshot({path:OUT+'m_'+(u.split('/').filter(Boolean).pop()||'home').replace(/[^a-z0-9-]/gi,'')+'.jpg',quality:70});
  rr.push({u,tl,reqs,bytes,errs:errs.slice(0,8),failed:failed.slice(0,8),...m});await c.close();
 }
 await b.close();fs.writeFileSync(OUT+'render.json',JSON.stringify(rr,null,1));
})();
