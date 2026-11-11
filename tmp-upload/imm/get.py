import urllib.request, io, os, json
from PIL import Image
B='https://byd-makassar.id/wp-content/uploads/'
L={'atto1':'2026/10/byd-atto-1-2026-makassar-hero.webp','m6dm':'2026/10/byd-m6-dm-makassar-hero-hd.webp','m6':'2026/06/m6-landscape.webp','atto3':'2026/10/byd-atto-3-makassar-hero.webp','atto2':'2026/11/byd-atto-2-cosmos-black-makassar.webp','ti7':'2026/10/byd-ti7-hero.webp','seal':'2025/04/byd-seal-Aurora-White.webp','sealion7':'2025/04/byd-sealion-7.webp','d9':'2026/10/denza-d9-makassar-hero.webp','z9':'2026/10/denza-z9-gt-makassar-hero.webp','awi':'2026/11/awi-welcome-sales-byd-makassar.webp','d9poster':'2026/11/denza-d9-video-poster.webp','brand':'2026/11/byd-brand-of-the-year-byd-makassar.jpg'}
out={}
for k,p in L.items():
    try:
        d=urllib.request.urlopen(urllib.request.Request(B+p,headers={'User-Agent':'Mozilla/5.0'}),timeout=60).read()
        im=Image.open(io.BytesIO(d)); out[k]=im.size
        if k=='awi': im.save(f'tmp-upload/imm/{k}.webp'); continue
        im=im.convert('RGB'); im.thumbnail((1100,1100)); im.save(f'tmp-upload/imm/{k}.webp',quality=72,method=6)
    except Exception as e: out[k]=str(e)
json.dump(out,open('tmp-upload/imm/sizes.json','w'))
