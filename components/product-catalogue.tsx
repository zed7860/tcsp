'use client';
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import products from '@/lib/products.json';
import { ProductCard } from './product-card';
const categories = ['All products', 'Pipes', 'Structures', 'Road & drainage'];
export function ProductCatalogue() {
  const [query, setQuery] = useState(''); const [category, setCategory] = useState('All products');
  const filtered = products.filter(p => (category === 'All products' || p.category === category) && `${p.name} ${p.paragraphs.join(' ')}`.toLowerCase().includes(query.toLowerCase()));
  return <section className="section"><div className="container"><div className="catalogue-tools"><div className="filter-tabs" aria-label="Product categories">{categories.map(c => <button key={c} aria-pressed={category === c} className={category === c ? 'selected' : ''} onClick={() => setCategory(c)}>{c}</button>)}</div><div className="search-field"><Search size={18} /><input aria-label="Search products" placeholder="Search products…" value={query} onChange={e => setQuery(e.target.value)} />{query && <button aria-label="Clear search" onClick={() => setQuery('')}><X size={16} /></button>}</div></div><p className="result-count" role="status">{filtered.length} product{filtered.length === 1 ? '' : 's'}</p><div className="product-grid">{filtered.map(p => <ProductCard key={p.slug} product={p} index={products.indexOf(p)} />)}</div>{!filtered.length && <div className="empty-state"><Search size={32} /><h2>No products found</h2><p>Try a different search or browse the full range.</p><button className="button" onClick={() => { setQuery(''); setCategory('All products'); }}>View all products</button></div>}<div className="catalogue-note"><span className="eyebrow">CUSTOM PRECAST SOLUTIONS</span><p>Also available: HDPE lined RCC Hume pipes, precast manholes, precast U drains, jacking pipes, SFRC concrete manhole frames, interlocking pavers and paver blocks.</p><a className="text-link" href="/contact/">Ask about your requirements ↗</a></div></div></section>;
}
