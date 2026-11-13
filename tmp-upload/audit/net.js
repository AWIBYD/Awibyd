const {chromium}=require('/tmp/pw/node_modules/playwright-core');const fs=require('fs');const O=process.env.GITHUB_WORKSPACE+'/tmp-upload/shot/net.txt';const L=s=>fs.appendFileSync(O,s+'\n');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});
for(const u of ['https://byd-makassar.id/model/byd-atto-1/','https://byd-makassar.id/simulasi-kredit/','https://byd-makassar.id/?gclid=test123','https://byd-makassar.id/']){
 const c=await b.newContext({viewport:{width:390,height:844},isMobile:true});const p=await c.newPage();L('== '+u);
 const tags=new Set();
 p.on('response',async r=>{const x=r.url();if(/bydjkt/.test(x))L('BYDJKT '+r.request().resourceType()+' '+x.slice(0,140)+' '+(r.headers()['content-length']||''));const m=x.match(/[?&]id=((?:G|AW|GT)-[A-Z0-9]+)/);if(m&&/googletagmanager/.test(x))tags.add(m[1]);});
 await p.goto(u,{waitUntil:'load',timeout:90000});await p.waitForTimeout(4000);
 L('GTAG '+[...tags].join(','));
 L('SPLASH '+await p.evaluate(()=>{const e=[...document.querySelectorAll('body *')].find(el=>/Masuk ke Website/.test(el.textContent||'')&&el.children.length<3);return e?('visible='+(e.getBoundingClientRect().height>0)):'none'}));
 L('INITIATOR '+await p.evaluate(()=>[...document.querySelectorAll('[src*="bydjkt"],[href*="bydjkt"],[style*="bydjkt"],source[srcset*="bydjkt"]')].map(e=>e.tagName+' '+(e.getAttribute('alt')||'')+' '+(e.getAttribute('src')||e.getAttribute('href')||'').slice(0,100)).join(' || ')));
 await c.close();}
await b.close();})();
