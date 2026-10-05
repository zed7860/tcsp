'use client';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { ContactForm } from './contact-form';

export function EnquiryModal() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener('open-enquiry', show);
    return () => window.removeEventListener('open-enquiry', show);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  useEffect(() => { if (!open) return; const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, [open]);
  if (!open) return null;
  return <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setOpen(false); }}><section className="enquiry-modal" role="dialog" aria-modal="true" aria-labelledby="enquiry-title"><button className="modal-close" type="button" onClick={() => setOpen(false)} aria-label="Close enquiry form"><X /></button><ContactForm headingId="enquiry-title" compact /></section></div>;
}

export function EnquiryButton({ children, className = 'button' }: { children: React.ReactNode; className?: string }) {
  return <button type="button" className={className} onClick={() => window.dispatchEvent(new Event('open-enquiry'))}>{children}</button>;
}
