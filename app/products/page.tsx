import type { Metadata } from 'next';
import { PageHeading } from '@/components/page-heading';
import { ProductCatalogue } from '@/components/product-catalogue';
import { ContactCTA } from '@/components/site-footer';
export const metadata: Metadata = { title: 'RCC Pipes & Precast Concrete Products', description: 'Explore RCC Hume pipes, cement pipes, RCC pump houses, septic tanks, kerb stones and drain cover slabs manufactured in Tumakuru.', alternates: { canonical: '/products/' } };
export default function Products() { return <><PageHeading label="OUR PRODUCT RANGE" title="Made for strength. Built for purpose." text="High-quality precast concrete products, manufactured with modern production methods, top-grade materials and the utmost care." /><ProductCatalogue /><ContactCTA /></>; }
