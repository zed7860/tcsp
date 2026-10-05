from pathlib import Path
from urllib.request import urlopen
from urllib.parse import urljoin, urlsplit, unquote
import re, json, concurrent.futures
from html.parser import HTMLParser

base='https://tumkurconcretesp.com/'
dest=Path('source-reference'); dest.mkdir(exist_ok=True)
assets=Path('public/images'); assets.mkdir(parents=True,exist_ok=True)
class Text(HTMLParser):
    def __init__(self): super().__init__(); self.parts=[]; self.skip=0
    def handle_starttag(self,t,a):
        if t in ('script','style'): self.skip+=1
    def handle_endtag(self,t):
        if t in ('script','style'): self.skip-=1
    def handle_data(self,d):
        if not self.skip and d.strip(): self.parts.append(d.strip())
files=['index.html','About.html','Products.html','Our-Works.html','Contact.html','index.css','About.css','Products.css','Our-Works.css','Contact.css']
urls=set()
for file in files:
    try:
        raw=urlopen(urljoin(base,file)).read().decode('utf-8'); (dest/file).write_text(raw,encoding='utf-8')
        for path in re.findall(r'(?:src=[\"\']|url\([\"\']?)([^\"\'\)]+)',raw):
            if 'images/' in path: urls.add(urljoin(base,path.split('?')[0]))
        if file.endswith('.html'):
            p=Text(); p.feed(raw); (dest/(file+'.txt')).write_text('\n'.join(p.parts),encoding='utf-8')
    except Exception as e: print(file,str(e))
def download(url):
    try:
        name=unquote(urlsplit(url).path.split('/')[-1]); (assets/name).write_bytes(urlopen(url).read()); return name
    except Exception as e: return str(e)
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool: print(json.dumps(list(pool.map(download,urls))))
