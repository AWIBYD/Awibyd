import re,urllib.request,json,html
UA={'User-Agent':'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'}
def get(u):
    try:
        r=urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=30);return r.status,r.geturl(),r.read().decode('utf-8','ignore')
    except Exception as e: return getattr(e,'code',0),u,''
_,_,si=get('https://byd-makassar.id/sitemap_index.xml')
sm=re.findall(r'<loc>([^<]+)</loc>',si);allu=[]
for s in sm:
    _,_,x=get(s);allu+= [u for u in re.findall(r'<loc>([^<]+)</loc>',x) if 'wp-content' not in u]
targets=[l.strip() for l in open('tmp-upload/u8.txt') if l.strip()]
inb={t:[] for t in targets};out={}
pages=list(dict.fromkeys(allu+targets))
for u in pages:
    st,fu,b=get(u)
    hrefs=set(h.split('#')[0].split('?')[0] for h in re.findall(r'href="(https://byd-makassar\.id/[^"]*)"',b))
    # body only links (exclude header/footer/nav roughly not possible) -> count all
    for t in targets:
        if t in hrefs and u!=t: inb[t].append(u)
    if u in targets:
        rob=re.search(r'<meta name="robots" content="([^"]+)"',b);can=re.search(r'<link rel="canonical" href="([^"]+)"',b)
        tit=re.search(r'<title>([^<]*)',b)
        txt=re.sub(r'<[^>]+>',' ',re.sub(r'<(script|style)[^>]*>.*?</\1>','',b,flags=re.S));words=len(html.unescape(txt).split())
        out[u]={'status':st,'final':fu,'robots':rob and rob.group(1),'canonical':can and can.group(1),'title':tit and html.unescape(tit.group(1)),'words':words,'in_sitemap':u in allu}
for t in targets: out[t]['inlinks']=len(inb[t]);out[t]['from']=[x.replace('https://byd-makassar.id','') for x in inb[t]][:8]
json.dump({'sitemap_count':len(allu),'pages':out},open('tmp-upload/shot/r.json','w'),indent=1,ensure_ascii=False)
