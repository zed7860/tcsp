import type { Metadata, Viewport } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { company, leadership } from '@/lib/company';
import { EnquiryModal } from '@/components/enquiry-modal';
import './globals.css';
const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://tumkurconcretesp.com';
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: { default: 'Tumkur Concrete Spun Pipes | Precast Concrete Since 2005', template: '%s | Tumkur Concrete Spun Pipes' },
  description: 'Manufacturer of RCC Hume pipes, precast manholes, kerb stones, paver blocks and customized precast concrete solutions in Tumakuru, Karnataka. Established in 2005.',
  applicationName: company.name,
  keywords: ['RCC Hume pipe manufacturer Tumkur', 'concrete pipes Tumakuru', 'precast concrete products Karnataka', 'RCC pipe supplier', 'kerb stone manufacturer', 'precast manholes', 'drain cover slabs', 'concrete septic tank'],
  authors: [{ name: company.name, url: origin }],
  creator: company.name,
  publisher: company.name,
  category: 'Precast concrete manufacturing',
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg', apple: '/images/tcsp-logo-transparent-header.png' },
  openGraph: { type: 'website', locale: 'en_IN', siteName: company.name, title: 'Tumkur Concrete Spun Pipes | Precast Concrete Manufacturer', description: 'RCC Hume pipes and precast concrete products manufactured in Tumakuru since 2005.', url: origin, images: [{ url: '/images/hero-precast-factory-2026.webp', width: 1672, height: 941, alt: 'RCC pipe manufacturing at Tumkur Concrete Spun Pipes' }] },
  twitter: { card: 'summary_large_image', title: 'Tumkur Concrete Spun Pipes', description: 'RCC Hume pipes and precast concrete products manufactured in Tumakuru.', images: ['/images/hero-precast-factory-2026.webp'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};
export const viewport: Viewport = { themeColor: '#ff5e14' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { '@context': 'https://schema.org', '@graph': [{ '@type': ['LocalBusiness', 'Organization'], '@id': `${origin}/#business`, name: company.name, url: origin, logo: `${origin}/images/tcsp-logo-transparent-header.png`, image: `${origin}/images/hero-precast-factory-2026.webp`, telephone: '+917259590506', email: company.email, foundingDate: '2005', founder: { '@id': `${origin}/#shaheed-aleem` }, sameAs: [company.instagram], areaServed: { '@type': 'State', name: 'Karnataka' }, knowsAbout: ['RCC Hume pipes', 'precast concrete', 'kerb stones', 'precast manholes', 'drain cover slabs'], address: { '@type': 'PostalAddress', streetAddress: 'TUMKUR-MADHUGIRI, SH 33, near HOSAHALLI', addressLocality: 'Tumakuru', addressRegion: 'Karnataka', postalCode: '572106', addressCountry: 'IN' } }, { '@type': 'Person', '@id': `${origin}/#shaheed-aleem`, name: leadership.name, jobTitle: leadership.role, worksFor: { '@id': `${origin}/#business` } }, { '@type': 'WebSite', '@id': `${origin}/#website`, url: origin, name: company.name, publisher: { '@id': `${origin}/#business` }, inLanguage: 'en-IN' }] };
  return <html lang="en" suppressHydrationWarning><body><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><main id="main-content">{children}</main><SiteFooter /><EnquiryModal /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} /></body></html>;
}
