# Tumkur Concrete Spun Pipes — Next.js website

A complete redesign of https://tumkurconcretesp.com using its original logo, photos, contact information and product descriptions. Built with Next.js App Router, React and TypeScript. Includes five primary pages, twelve product detail pages, searchable/filterable products, mobile navigation, contact links, a map, sitemap, robots.txt and business structured data.

## Run locally

Requires Node.js 20.9 or newer (Node.js 24 LTS recommended).

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Build and preview the production website

```sh
npm run build
npm run preview
```

The production website runs with the Next.js Node server at http://127.0.0.1:4173. A server is required for secure SMTP email delivery.

## Hosting

### Vercel

Import this repository, select Next.js and use `npm run build`. Add the SMTP environment variables from `.env.example` and your domain in the project settings.

Before the production deployment, add these Vercel environment variables:

- `NEXT_PUBLIC_SITE_URL`: final HTTPS domain.
- `SMTP_USER`, `SMTP_APP_PASSWORD`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`: enquiry delivery settings.
- `GOOGLE_SITE_VERIFICATION`: optional token from Google Search Console.

After DNS is active, add the domain property in Google Search Console and submit `https://your-domain.example/sitemap.xml`. Search visibility and rankings are controlled by Google and build over time; the website supplies crawlable pages, canonical URLs, structured data, sitemap and social metadata.

### Other hosts

Use a host that supports Next.js server functions, such as Netlify, Cloudflare Workers with its Next.js adapter, Railway, Render, or Node-enabled cPanel. A static-only host cannot send SMTP email because it has nowhere safe to keep the Gmail credentials.

### Domain metadata

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain before building if the domain changes. This controls the sitemap and structured-data URLs.

## Enquiries

The contact form sends enquiries through Gmail SMTP to `ENQUIRY_TO_EMAIL`. Copy `.env.example` to `.env.local`, enter the Gmail address and a 16-character Google App Password, and restart the server. Never use the Gmail account's normal password or commit `.env.local`. The form uses server-side validation, HTML escaping and a hidden spam trap. Google Maps requires internet access; typography falls back to system fonts if Google Fonts is unavailable.

## Instagram Blog

The Blog uses the hardcoded public profile `https://www.instagram.com/tumkurconcretespunpipe/` and requests only posts Instagram exposes publicly. It refreshes its cached feed every 15 minutes and uses no Instagram token or private credential. Instagram can temporarily rate-limit anonymous feed requests; when that happens, the Blog links visitors directly to the public profile instead of showing stale or private content.

## Content maintenance

- `lib/company.ts`: company text, phone numbers, address, values.
- `lib/products.json`: original product descriptions, category assignments, images and slugs.
- `public/images/`: original downloaded logo and photos; assets are hosted locally.
- `app/globals.css`: theme and responsive layouts.
- `source-reference/`: snapshots of the original pages for reference; excluded from the public build.

The source website's Our Works page only says “Coming Soon”; this is preserved, without inventing projects. Marketing headings are refreshed, while company facts and the original product descriptions are retained. Confirm the company's existing website claims and images before publication.

## Checks

```sh
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

End-to-end tests run against the production server, covering every product page, filtering/search, mobile navigation, form validation and submission, 404 handling and mobile overflow.
