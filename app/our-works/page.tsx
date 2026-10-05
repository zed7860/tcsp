import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, HardHat } from 'lucide-react';
import { PageHeading } from '@/components/page-heading';
export const metadata: Metadata = { title: 'Our Concrete Projects', description: 'Project updates and precast concrete work from Tumkur Concrete Spun Pipes in Tumakuru.', alternates: { canonical: '/our-works/' } };
export default function Works() { return <><PageHeading label="OUR WORKS" title="Strong foundations. Lasting impact." text="Quality products and concrete expertise for infrastructure projects." /><section className="section"><div className="container works-placeholder"><div className="works-icon"><HardHat size={50} strokeWidth={1} /></div><span className="eyebrow">PROJECT SHOWCASE</span><h2>Coming soon.</h2><p>Our project showcase is being prepared. In the meantime, speak with our team about your requirements and our precast concrete solutions.</p><Link className="button" href="/contact/">Talk to our team <ArrowUpRight size={20} /></Link></div></section></>; }
