from pathlib import Path
p=Path('app/products/[slug]/page.tsx')
s=p.read_text(encoding='utf-8').replace('href="/contact/" className="button"', 'href={`/contact/?product=${p.slug}`} className="button"')
p.write_text(s,encoding='utf-8')
p=Path('tests/site.spec.ts')
s=p.read_text(encoding='utf-8').replace("toHaveAttribute('href', '/contact/')", "toHaveAttribute('href', `/contact/?product=${product.slug}`)")
p.write_text(s,encoding='utf-8')
