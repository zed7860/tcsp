from pathlib import Path
from html.parser import HTMLParser
import json,re
class Parser(HTMLParser):
    def __init__(self): super().__init__(); self.capture=None; self.text=[]; self.items=[]
    def handle_starttag(self,tag,attrs):
        if tag in ('h2','p','li'): self.capture=tag; self.text=[]
        elif tag=='br' and self.capture: self.text.append('\n')
    def handle_data(self,data):
        if self.capture: self.text.append(data)
    def handle_endtag(self,tag):
        if tag==self.capture:
            self.items.append((tag,''.join(self.text).strip())); self.capture=None
p=Parser(); p.feed(Path('source-reference/Products.html').read_text(encoding='utf-8'))
images=['industrial-rcc-hume-pipe-250x250.webp']+['commercial-rcc-hume-pipe-250x250.webp']*5+['product-jpeg-250x250.webp','OIP.jpg','OIP1.jpg','OIP2.jpg','OIP3.jpg','drain-cover-slabs-250x250.webp']
products=[]
for i,(tag,text) in enumerate(p.items):
    if tag=='h2' and text and not text.startswith(('At Tumkur','Get in touch')):
        slug=re.sub(r'[^a-z0-9]+','-',text.lower()).strip('-')
        paragraphs=[]
        for following,body in p.items[i+1:]:
            if following=='h2': break
            if body and body!='Call Us': paragraphs.extend([line.strip() for line in body.split('\n') if line.strip()])
        products.append(dict(name=text,slug=slug,paragraphs=paragraphs,image=images[len(products)],category='Pipes' if len(products)<7 else 'Structures' if len(products)<9 else 'Road & drainage'))
assert len(products)==12 and all(p['paragraphs'] for p in products), 'Missing original product descriptions'
Path('lib').mkdir(exist_ok=True)
Path('lib/products.json').write_text(json.dumps(products,indent=2,ensure_ascii=False),encoding='utf-8')
print(f'Extracted {len(products)} products with original descriptions')
