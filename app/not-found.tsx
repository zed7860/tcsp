import Link from 'next/link';
export default function NotFound() { return <section className="section"><div className="container works-placeholder"><span className="eyebrow">404 · PAGE NOT FOUND</span><h1>Let’s get you<br />back on solid ground.</h1><p>The page you’re looking for could not be found.</p><Link href="/" className="button">Back to home ↗</Link></div></section>; }
