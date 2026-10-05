'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, Phone } from 'lucide-react';
import { company } from '@/lib/company';
import { EnquiryButton } from './enquiry-modal';
import { SiteTools } from './site-tools';
const links = [['/', 'Home'], ['/about/', 'About us'], ['/products/', 'Products'], ['/our-works/', 'Our works'], ['/blog/', 'Blog'], ['/contact/', 'Contact']];
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!open) return; const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, [open]);
  return <><div className="topbar"><div className="container"><span>Reliable precast concrete since 2005. <span className="top-location">Made in Tumakuru.</span></span><div className="topbar-actions"><a href={company.phoneHref}><Phone size={12} /> {company.phone}</a><SiteTools /></div></div></div><header className="site-header"><div className="container header-inner"><Link href="/" className="brand" aria-label="Tumkur Concrete Spun Pipes home"><Image src="/images/tcsp-logo-transparent-header.png" alt="Tumkur Concrete Spun Pipes logo" width={1453} height={1082} priority /><span>TUMKUR CONCRETE<small>SPUN PIPES</small></span></Link><nav aria-label="Main navigation" id="main-nav" className={open ? 'navigation open' : 'navigation'}>{links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={(href === '/' ? pathname === '/' : pathname.startsWith(href)) ? 'page' : undefined}>{label}</Link>)}</nav><EnquiryButton className="button small header-cta">Let’s talk <ArrowUpRight size={16} /></EnquiryButton><button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></header></>;
}
