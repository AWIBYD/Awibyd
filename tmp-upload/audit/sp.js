const {chromium}=require('/tmp/pw/node_modules/playwright-core');const fs=require('fs');const L=s=>fs.appendFileSync(process.env.GITHUB_WORKSPACE+'/tmp-upload/shot/sp.txt',s+'\n');
(async()=>{const h=await (await fetch('https://byd-makassar.id/?nc='+Date.now())).text();
L('tpl='+(h.match(/awi-wel-tpl/g)||[]).length+' awq='+(h.match(/awq=location/g)||[]).length);
const i=h.indexOf('awq=location');L(h.slice(Math.max(0,i-200),i+500));
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});const c=await b.newContext({viewport:{width:390,height:844},isMobile:true,userAgent:'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129 Mobile Safari/537.36'});const p=await c.newPage();
p.on('console',m=>L('CON '+m.type()+' '+m.text().slice(0,150)));p.on('pageerror',e=>L('PE '+e));
await p.goto('https://byd-makassar.id/',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
L('wel='+await p.evaluate(()=>!!document.getElementById('awi-wel'))+' tplInDom='+await p.evaluate(()=>!!document.getElementById('awi-wel-tpl'))+' ss='+await p.evaluate(()=>sessionStorage.getItem('awiWel')));
await b.close();})();
