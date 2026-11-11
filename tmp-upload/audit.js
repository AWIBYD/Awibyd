const fs=require('fs');
(async()=>{const h=await (await fetch('https://byd-makassar.id/?nc='+Date.now(),{headers:{'user-agent':'facebookexternalhit/1.1'}})).text();
const head=h.slice(0,h.indexOf('</head>'));
const lines=head.split('\n').map((l,i)=>[i,l.trim().slice(0,260)]).filter(([i,l])=>/og:|twitter:|<!--|yoast|application\/ld/i.test(l));
fs.writeFileSync('tmp-upload/shot/r.json',JSON.stringify(lines,null,0));})();
