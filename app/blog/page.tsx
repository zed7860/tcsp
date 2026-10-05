import type { Metadata } from 'next';
import { ArrowUpRight, CalendarDays, Instagram } from 'lucide-react';
import { PageHeading } from '@/components/page-heading';
import { ContactCTA } from '@/components/site-footer';
import { company } from '@/lib/company';
import { getInstagramPosts } from '@/lib/instagram';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Updates & Blog',
  description: 'Public products, factory updates and project posts from Tumkur Concrete Spun Pipes on Instagram.',
  alternates: { canonical: '/blog/' },
  openGraph: { title: 'Updates from Tumkur Concrete Spun Pipes', description: 'See our latest precast concrete products and factory updates.', url: '/blog/', type: 'website' },
};

export default async function Blog() {
  const posts = await getInstagramPosts();
  return <><PageHeading label="BLOG & UPDATES" title="Latest from our factory." text="Public products, manufacturing updates and useful information from our Instagram page." /><section className="section blog-section"><div className="container"><div className="blog-intro"><div><span className="eyebrow">PUBLIC INSTAGRAM POSTS</span><h2>See what we<br />are working on.</h2></div><a className="button" href={company.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={19} /> View Instagram</a></div>{posts.length ? <div className="instagram-grid">{posts.map(post => { const date = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(post.timestamp)); return <article className="instagram-card" key={post.id}><a href={post.permalink} target="_blank" rel="noopener noreferrer" aria-label="Open this public post on Instagram"><div className="instagram-media"><img src={post.thumbnail_url || post.media_url} alt={post.caption?.slice(0, 120) || 'Tumkur Concrete Spun Pipes public Instagram update'} loading="lazy" width="800" height="800" /></div><div className="instagram-copy"><span className="post-date"><CalendarDays size={14} /> {date}</span><p>{post.caption || 'See this public update from Tumkur Concrete Spun Pipes.'}</p><span className="post-link">View on Instagram <ArrowUpRight size={16} /></span></div></a></article>; })}</div> : <div className="instagram-empty"><Instagram size={44} /><h2>View our public posts.</h2><p>Instagram may temporarily limit public feed requests. Open our public profile to see every current post and caption.</p><a className="button" href={company.instagram} target="_blank" rel="noopener noreferrer">View public profile <ArrowUpRight size={18} /></a></div>}</div></section><ContactCTA /></>;
}
