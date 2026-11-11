const fs=require('fs');
(async()=>{const h=await (await fetch('https://byd-makassar.id/?nc='+Date.now(),{headers:{'user-agent':'facebookexternalhit/1.1'}})).text();
const head=h.slice(0,h.indexOf('</head>'));
const lines=head.split('\n').slice(0,10).map((l,i)=>[i,l.trim().slice(0,700)]);
fs.writeFileSync('tmp-upload/shot/r.json',JSON.stringify(lines,null,0));})();
