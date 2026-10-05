import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { productCopy } from '@/lib/product-copy';
export type Product = { name: string; slug: string; image: string; category: string; paragraphs: string[] };
export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) { const copy = productCopy[product.slug]; return <Link href={`/products/${product.slug}/`} className="product-card"><div className="product-image"><span className="product-index">{String(index + 1).padStart(2, '0')}</span><Image src={`/images/${product.image}`} alt={product.name} width={500} height={400} /><span className="product-arrow"><ArrowUpRight size={22} /></span></div><div className="product-card-text"><span className="eyebrow">{product.category}</span><h3>{product.name}</h3><p>{copy?.description || product.paragraphs[0]}</p></div></Link>; }
