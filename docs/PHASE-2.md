# Phase 2 – recommendations

## 1. Make enquiries real (highest priority)
- Cloudflare Pages Function `functions/api/enquiry.ts` (free tier) that validates input, verifies **Cloudflare Turnstile**,
  and sends an email notification (e.g. Resend / MailChannels-compatible provider). Optionally store each enquiry in **D1** (free tier).
- Set `NEXT_PUBLIC_ENQUIRY_ENDPOINT=/api/enquiry` – the form leaves Demo Mode automatically.
- Publish Privacy Policy and Terms before switching on.

## 2. Replace demo content
- Swap Midea demo data for confirmed Rainbow Air products (`src/data/products.ts`), confirm packages and pricing.
- Replace illustrative gallery images with real project photos; run `npm run images:download` to self-host remaining stock.
- Fill every “To Be Confirmed” value (see `CLIENT-CONFIRMATION.md`).

## 3. Additional pages (structure already supports this)
Each becomes a route under `src/app/` reusing existing section components and data files:
- `/air-conditioning-installation/` – split, multi-split, ducted detail, inclusions, FAQs
- `/products/` and `/products/[slug]/` – catalogue + spec pages generated from `products.ts`
- `/service-areas-projects/` – suburb list and project case studies
- `/about-aftercare/` – company story, warranty and aftercare process (once confirmed)
- `/contact/` – full contact page and form
- `/veu/` – once participation and accredited provider details are confirmed
- `/privacy-policy/`, `/terms/`
Then switch nav links from `#anchors` to page URLs in `src/data/site.ts`.

## 4. Launch readiness
- Custom domain on Cloudflare (domain registration is the only paid item).
- Set `site.seo.indexable = true`, remove `Disallow: /` from `robots.txt` and the `X-Robots-Tag` header from `_headers`.
- Add `sitemap.xml`, LocalBusiness structured data (JSON-LD) once NAP details are confirmed, Google Business Profile link.
- Analytics: Cloudflare Web Analytics (free, cookie-less).
- Optional: a headless CMS (e.g. Decap/Tina/Sanity free tier) if staff need to edit content without developers.
