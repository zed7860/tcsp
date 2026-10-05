import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Phone } from 'lucide-react';
import products from '@/lib/products.json';
import { ProductCard } from '@/components/product-card';
import { company } from '@/lib/company';
import { productCopy } from '@/lib/product-copy';
export function generateStaticParams() { return products.map(p => ({ slug: p.slug })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const p = products.find(p => p.slug === slug); const description = p ? productCopy[p.slug]?.description || p.paragraphs[0]?.slice(0, 160) : undefined; return { title: p?.name || 'Product', description, alternates: { canonical: `/products/${slug}/` }, openGraph: p ? { title: p.name, description, url: `/products/${slug}/`, images: [{ url: `/images/${p.image}`, alt: p.name }] } : undefined }; }
export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = products.find(p => p.slug === slug); if (!p) notFound();
  const related = products.filter(q => q.slug !== slug && q.category === p.category).slice(0, 3); const copy = productCopy[p.slug];
  return <><section className="section product-detail"><div className="container"><Link href="/products/" className="back-link"><ArrowLeft size={17} /> All products</Link><div className="detail-grid"><div className="detail-image"><Image src={`/images/${p.image}`} alt={p.name} width={650} height={600} priority /></div><div><span className="eyebrow">{p.category} · TUMKUR CONCRETE</span><h1>{p.name}</h1><div className="detail-copy"><p>{copy?.description || p.paragraphs[0]}</p>{copy?.uses && <p>{copy.uses}</p>}</div><div className="detail-actions"><Link href={`/contact/?product=${p.slug}`} className="button">Enquire about this product <ArrowUpRight size={19} /></Link><a href={company.phoneHref} className="text-link"><Phone size={17} /> Call our team</a></div><p className="detail-note">Ask us about available sizes, specifications, quantity and current price.</p></div></div></div></section>{related.length > 0 && <section className="section products-section"><div className="container"><div className="section-heading"><div><span className="eyebrow">EXPLORE THE RANGE</span><h2>Related products.</h2></div><Link href="/products/" className="text-link">View all products <ArrowUpRight size={18} /></Link></div><div className="product-grid">{related.map((p, i) => <ProductCard product={p} index={i} key={p.slug} />)}</div></div></section>}</>;
}
