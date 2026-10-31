const { chromium } = require('playwright'); const fs=require('fs');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 412, height: 900 }, isMobile: true });
  await p.goto('https://byd-makassar.id/?nc=' + Date.now(), { waitUntil: 'networkidle', timeout: 90000 });
  const r = await p.evaluate(() => {
    const out = { hasStyle: !!document.getElementById('awi-jam-mobile') };
    const els = [...document.querySelectorAll('*')].filter(e => e.children.length===0 && /Sen.Sab 08/.test(e.textContent));
    out.list = els.map(e => { const chain=[]; let n=e; for(let i=0;i<7&&n;i++){ const cs=getComputedStyle(n); const rc=n.getBoundingClientRect(); chain.push({tag:n.tagName, cls:n.className, pos:cs.position, top:cs.top, right:cs.right, disp:cs.display, rect:[rc.x|0,rc.y|0,rc.width|0,rc.height|0]}); n=n.parentElement;} return chain; });
    return out; });
  fs.writeFileSync('tmp-upload/shot/dom.json', JSON.stringify(r,null,1));
  await b.close();
})();
