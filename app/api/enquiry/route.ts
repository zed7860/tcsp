import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

type Enquiry = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  product?: unknown;
  message?: unknown;
  website?: unknown;
};

const clean = (value: unknown, max: number) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]!);

export async function POST(request: Request) {
  try {
    const body = await request.json() as Enquiry;
    if (clean(body.website, 200)) return NextResponse.json({ message: 'Enquiry received.' });

    const name = clean(body.name, 100);
    const phone = clean(body.phone, 20);
    const email = clean(body.email, 150);
    const product = clean(body.product, 150) || 'General enquiry';
    const message = clean(body.message, 2000);

    if (!name || !phone || !email || !message) return NextResponse.json({ message: 'Please complete all required fields.' }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ message: 'Please enter a valid email address.' }, { status: 400 });
    if (!/^[+0-9()\s-]{7,20}$/.test(phone)) return NextResponse.json({ message: 'Please enter a valid phone number.' }, { status: 400 });

    const user = process.env.SMTP_USER;
    const password = process.env.SMTP_APP_PASSWORD;
    const recipient = process.env.ENQUIRY_TO_EMAIL;
    if (!user || !password || !recipient) {
      console.error('SMTP configuration is incomplete.');
      return NextResponse.json({ message: 'Email delivery is not configured yet. Please call our team.' }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE !== 'false',
      auth: { user, pass: password },
    });

    const safe = { name: escapeHtml(name), phone: escapeHtml(phone), email: escapeHtml(email), product: escapeHtml(product), message: escapeHtml(message).replace(/\n/g, '<br>') };
    await transporter.sendMail({
      from: `Tumkur Concrete Website <${process.env.ENQUIRY_FROM_EMAIL || user}>`,
      to: recipient,
      replyTo: email,
      subject: `Website enquiry: ${product} — ${name}`,
      text: `New website enquiry\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nProduct: ${product}\n\nRequirements:\n${message}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:640px;color:#17202a"><h2 style="background:#ff5e14;color:#fff;padding:18px 22px;margin:0">New website enquiry</h2><div style="border:1px solid #ddd;padding:22px"><p><strong>Name:</strong> ${safe.name}</p><p><strong>Phone:</strong> ${safe.phone}</p><p><strong>Email:</strong> ${safe.email}</p><p><strong>Product:</strong> ${safe.product}</p><hr style="border:0;border-top:1px solid #ddd;margin:20px 0"><p><strong>Requirements</strong></p><p>${safe.message}</p></div></div>`,
    });

    return NextResponse.json({ message: 'Your enquiry has been sent.' });
  } catch (error) {
    console.error('Enquiry email failed:', error);
    return NextResponse.json({ message: 'We could not send your enquiry right now. Please try again or call our team.' }, { status: 500 });
  }
}
