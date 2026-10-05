import type { MetadataRoute } from 'next';
import products from '@/lib/products.json';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://tumkurconcretesp.com'; return ['/', '/about/', '/products/', '/our-works/', '/blog/', '/contact/', ...products.map(p => `/products/${p.slug}/`)].map(path => ({ url: `${base}${path}`, changeFrequency: path === '/blog/' ? 'weekly' : 'monthly', priority: path === '/' ? 1 : path === '/products/' ? .9 : .7 })); }
