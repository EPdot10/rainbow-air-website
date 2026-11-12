# Rainbow Air – Website (Phase 1 homepage demo)

**Better Air. Better Living.** Marketing site for Rainbow Air, a Melbourne air conditioning supply & installation business.

Phase 1 is a single, high-fidelity, interactive **homepage demo** for client review. It is **not** a public launch:
product data, imagery, contact details and company information are placeholders and are clearly labelled as such.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) with **static export** (`output: "export"`) | Pre-rendered HTML for SEO; deploys to Cloudflare Pages as plain static files, no adapter or server runtime |
| Language | TypeScript (strict) | |
| Styling | Tailwind CSS v4 (design tokens in `src/app/globals.css`) | |
| UI primitives | Radix UI Dialog (menu, spec sheet, lightbox) + small local components | Accessible focus-trapping without a heavy library (shadcn/ui-style approach) |
| Icons | lucide-react | Consistent line icons |
| Fonts | Outfit (headings) + Figtree (body), self-hosted via `@fontsource-variable` | No Google Fonts request at runtime |
| Motion | CSS transitions + one IntersectionObserver (`RevealObserver`) | SSR-safe, ~0 KB, respects `prefers-reduced-motion` |
| Hosting | Cloudflare Pages (free `*.pages.dev`) | |

## Run locally

Requires Node.js 20+ (22 recommended – see `.nvmrc`).

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # typecheck + lint + production build
npm run build        # static site written to ./out
npm start            # serve ./out locally (uses npx serve)
```

## Project structure

```
src/
  app/                 layout (SEO/metadata, fonts), page (section order), globals.css (design tokens), icons
  components/
    layout/            Header (sticky, mobile menu, active-section highlight), Footer
    sections/          Hero, FeaturedPackages, ServiceTypes, ProductShowcase, WhyChooseUs,
                       InstallationProcess, VeuBanner, QuoteCTA
    cards/             PackageCard, ProductCard (+ specification dialog)
    gallery/           ProjectGallery (+ lightbox)
    forms/             QuoteEnquiryForm (validation, prefill, Demo Mode)
    ui/                Button, SectionHeading/Eyebrow, SmartImage, Reveal, RevealObserver, DemoBadge
  context/QuoteContext  "Get a Quote" buttons pre-fill the form and scroll to it
  data/                ALL editable content – see below
  lib/                 image resolver, class helper
public/
  brand/               web logos (transparent + reversed), favicon source
  images/              locally downloaded images (after `npm run images:download`)
  _headers, robots.txt noindex + security headers for the demo deployment
brand-assets/          original client logo files and full-resolution transparent masters
scripts/               download-images.mjs
docs/                  sources, client confirmation list, deployment guide, Phase 2 plan
```

## Editing content

Everything shown on the page comes from `src/data/` – no copy is hard-coded in components.

| File | Contains |
|---|---|
| `site.ts` | Brand, SEO, contact details, company info, navigation, footer links |
| `content.ts` | Hero and section copy, system types, benefits, process steps, gallery items, VEU block |
| `packages.ts` | Installation packages (set `price` when confirmed – otherwise “Request a Quote” is shown) |
| `products.ts` | Product cards and spec sheets (**currently Midea demo data**) |
| `images.ts` | Image registry: source URL, alt text, licence for every image |
| `form.ts` | Enquiry form options and submission endpoint |

Values equal to `TBC` (“To Be Confirmed”) are rendered in a muted, italic style so gaps are obvious in review.

## Images

Images are currently loaded from Unsplash and mdhome.com.au. To self-host optimised WebP copies:

```bash
npm run images:download -- --stock-only   # Unsplash only (allowed to self-host)
npm run images:download                   # also Midea product images – only with permission
```

This writes `public/images/*.webp` and `src/data/image-manifest.json`; components switch to the local files automatically.
To replace an image, edit its entry in `src/data/images.ts` (or drop a file in `public/images/` and add it to the manifest).

## Quote form

The form runs in **Demo Mode** until an endpoint is configured: it validates input but never shows a false “sent” message.
To go live, set `NEXT_PUBLIC_ENQUIRY_ENDPOINT` (Cloudflare Pages → Settings → Environment variables) to a JSON POST handler,
for example a Cloudflare Pages Function with Turnstile + email notification (see `docs/PHASE-2.md`).

## Deployment

Cloudflare Pages, connected to this GitHub repository – every push to `main` deploys automatically.
Build command `npm run build`, output directory `out`. Full steps: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

The demo is deliberately **noindex** (`site.seo.indexable`, `public/robots.txt`, `public/_headers`). Flip all three at launch.

## Further documentation

- [`docs/CONTENT-SOURCES.md`](docs/CONTENT-SOURCES.md) – every temporary image and product data source
- [`docs/CLIENT-CONFIRMATION.md`](docs/CLIENT-CONFIRMATION.md) – information Rainbow Air needs to supply before launch
- [`docs/PHASE-2.md`](docs/PHASE-2.md) – recommended next steps
