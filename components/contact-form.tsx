'use client';
import { useState, useEffect, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import products from '@/lib/products.json';
import { company } from '@/lib/company';
export function ContactForm({ compact = false, headingId }: { compact?: boolean; headingId?: string }) {
  const [status, setStatus] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [product, setProduct] = useState('General enquiry');
  useEffect(() => { const slug = new URLSearchParams(window.location.search).get('product'); const selected = products.find(p => p.slug === slug); if (selected) setProduct(selected.name); }, []);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState('sending'); setStatus('Sending your enquiry…');
    try {
      const response = await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || 'We could not send your enquiry.');
      setState('success'); setStatus('Your email has been sent. We will connect with you shortly.');
      form.reset(); setProduct('General enquiry');
    } catch (error) {
      setState('error'); setStatus(error instanceof Error ? error.message : 'We could not send your enquiry. Please try again.');
    }
  }
  if (state === 'success') return <div className={`contact-form form-success${compact ? ' compact' : ''}`}><CheckCircle2 className="success-icon" size={54} /><span className="eyebrow">ENQUIRY SENT</span><h2 id={headingId}>Thank you.</h2><p className="success-message" role="status">{status}</p><p>Need an immediate response? Call or WhatsApp our team now.</p><div className="success-actions"><a className="button" href={company.phoneHref}><Phone size={19} /> Call us</a><a className="button whatsapp-button" href={company.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} /> WhatsApp</a></div><button className="text-button" type="button" onClick={() => { setState('idle'); setStatus(''); }}>Send another enquiry</button></div>;
  return <form className={`contact-form${compact ? ' compact' : ''}`} onSubmit={submit}><span className="eyebrow">REQUEST A QUOTE</span><h2 id={headingId}>Tell us what<br />you need.</h2><div className="form-row"><label>Your name <span>*</span><input name="name" autoComplete="name" placeholder="Full name" required maxLength={100} /></label><label>Phone number <span>*</span><input name="phone" type="tel" autoComplete="tel" placeholder="Contact number" pattern="[+0-9()\s-]{7,20}" title="Enter a phone number with 7–20 characters" required /></label></div><label>Email address <span>*</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={150} /></label><label>Product needed<select name="product" value={product} onChange={e => setProduct(e.target.value)}><option>General enquiry</option>{products.map(p => <option key={p.slug}>{p.name}</option>)}<option>Custom precast product</option></select></label><label>Tell us your requirement <span>*</span><textarea name="message" rows={4} placeholder="Product, quantity, size and delivery location…" maxLength={2000} required /></label><label className="form-trap" aria-hidden="true">Company website<input name="website" tabIndex={-1} autoComplete="off" /></label><button className="button submit-button" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending enquiry…' : <>Submit enquiry <ArrowUpRight size={20} /></>}</button><p className="form-note">We use your details only to respond to this enquiry.</p>{status && <p className={`form-status ${state}`} role="status">{status}</p>}</form>;
}
