const fs=require('fs');
(async()=>{const h=await (await fetch('https://byd-makassar.id/?nc='+Date.now(),{headers:{'user-agent':'Mozilla/5.0 (Linux; Android 13) Chrome/120 Mobile'}})).text();
const head=h.slice(0,h.indexOf('</head>'));
const out=[];const re=/<script[^>]*>[\s\S]*?<\/script>/g;let m;while((m=re.exec(head))){if(/gtag|googletagmanager|AW-|G-|conversion|wa\.me/i.test(m[0]))out.push(m[0].slice(0,3000));}
const ico=[...head.matchAll(/<link[^>]+rel="(?:icon|apple-touch-icon)"[^>]*>/g)].map(x=>x[0]);
fs.writeFileSync('tmp-upload/shot/r.json',JSON.stringify({scripts:out,ico},null,1));})();
