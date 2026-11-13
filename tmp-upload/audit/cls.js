const {chromium}=require('/tmp/pw/node_modules/playwright-core');const fs=require('fs');const O=process.env.GITHUB_WORKSPACE+'/tmp-upload/shot/cls.txt';const L=s=>fs.appendFileSync(O,s+'\n');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});
for(const u of ['https://byd-makassar.id/','https://byd-makassar.id/model/byd-atto-1/']){
 const c=await b.newContext({viewport:{width:412,height:823},isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36 Chrome-Lighthouse'});
 await c.addInitScript(()=>{window.__ls=[];new PerformanceObserver(l=>{for(const e of l.getEntries()){if(e.hadRecentInput)continue;window.__ls.push({v:+e.value.toFixed(4),t:Math.round(e.startTime),src:(e.sources||[]).map(s=>{const n=s.node;if(!n)return '?';return (n.nodeName+'#'+(n.id||'')+'.'+String(n.className||'').slice(0,60)+' '+JSON.stringify(s.previousRect)+'->'+JSON.stringify(s.currentRect)).slice(0,240)})})}}).observe({type:'layout-shift',buffered:true});});
 const p=await c.newPage();await p.goto(u,{waitUntil:'load',timeout:90000});await p.waitForTimeout(6000);
 const ls=await p.evaluate(()=>window.__ls);L('== '+u+' total='+ls.reduce((a,x)=>a+x.v,0).toFixed(3));ls.sort((a,b)=>b.v-a.v).slice(0,8).forEach(x=>L(JSON.stringify(x)));
 const imgs=await p.evaluate(()=>[...document.images].map(i=>{const r=i.getBoundingClientRect();return {src:(i.currentSrc||i.src).slice(-70),top:Math.round(r.top+scrollY),w:i.naturalWidth,lz:i.getAttribute('loading'),nl:i.hasAttribute('data-no-lazy'),ds:!!i.getAttribute('data-src'),done:i.complete&&i.naturalWidth>0}}).filter(x=>x.done&&x.top>900));
 L('OFFSCREEN-LOADED '+imgs.length);imgs.slice(0,25).forEach(x=>L(JSON.stringify(x)));
 await c.close();}
await b.close();})();
