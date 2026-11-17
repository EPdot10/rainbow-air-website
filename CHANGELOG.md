# Changelog

Every push to `main` is deployed automatically to Cloudflare. Each entry lists the **commit ID** of that
version so it can be restored. Newest first. Add an entry here with every push.

## v0.9.2 – 2026-11-17 · Service area list + aftercare email note

- Service Areas & Projects: summary now “Servicing Melbourne metro and surrounding areas.” (removed “including the south-east”); new “Main service areas” panel listing 20 suburbs (interim list, names kept in English in all languages). Meta title/description updated to match.
- About & Aftercare: small centred note under the aftercare cards – email info@ for after-sales help, reply within 24 hours on business days.
- Rollback: `git revert` this commit.

## v0.9.1 – 2026-11-17 · Fix: blank enquiry form on Safari

- The quote form was wrapped in a Suspense boundary (because it reads ?type= from the URL), so the static HTML only contained an empty placeholder card until JavaScript finished. On Safari it could stay blank.
- The form is now part of the static HTML; only a tiny invisible reader for the URL parameters is deferred. Prefill from "Request a Quote" links still works.
- Rollback: `git revert` this commit.

## v0.9.0 – 2026-11-17 · Privacy Policy & Terms update (pre-launch legal review)

- Privacy Policy rewritten (EN + 简 + 繁), structure informed by the client's reference site: states Rainbow is not a VEU Accredited Provider and discloses sharing with the AP partner; names overseas providers (Cloudflare, Resend, Microsoft 365); retention (24 months for enquiries that don't proceed, job/VEU records up to 7 years); accurate cookie wording (no analytics/ads); marketing opt-out; automated decisions; data breaches; 30-day responses; links; changes. Removed "where they apply to us".
- Terms: no "by using you agree" wording; VEU discounts provided by the AP partner; explicit Australian Consumer Law carve-outs; dispute resolution (21 days, then mediation in Melbourne); severability.
- Quote form: collection notice + required consent checkbox (Worker also checks it). VEU questionnaire: collection notice above the consent box.
- "Last updated" → 17 November 2026. Traditional Chinese: 夥伴 fix.
- Rollback: `git revert` this commit.

## v0.8.0 – 2026-11-16 · Go-live settings in one file

- Turnstile site key moved from `src/data/form.ts` into `src/data/launch.json` (`turnstileSiteKey`), next to the `launched` switch.
- Build stops with a clear message if `launched` is true but the site key is empty.
- Rollback: `git revert` this commit.

## v0.7.3 – 2026-11-16 · Floating contact button: desktop info card

- Desktop (mouse + hover): clicking a ball now opens a small card with the details as text, an “open” button (call / send email / open RedNote) and a copy button (phone number, email, RedNote ID). Phones/tablets unchanged – balls open the app directly.
- RedNote account shown: “Rainbow Air Conditioning”, RedNote ID 94521675138 (`src/data/site.ts`).
- Rollback: `git revert` this commit.

## v0.7.2 – 2026-11-16 · Client answers: AP wording, hide unfinished items

- Rainbow Air is not itself a VEU Accredited Provider (works under another AP). All copy now says “working with our VEU Accredited Provider partner” (EN + 简 + 繁); services badge → “VEU Discount Available”.
- WeChat / WhatsApp / Facebook hidden until supplied (shown automatically once an href/value is added in `src/data/site.ts`). Business hours stay hidden (TBC).
- Home customer-review carousel hidden (`SHOW_REVIEWS = false` in `src/views/HomeView.tsx`) until real reviews are supplied.
- Rollback: `git revert` this commit.

## v0.7.1 – 2026-11-16 · SEO: VEU / Victoria / discount focus

- Titles & descriptions (EN + 简 + 繁) now lead with VEU, “discount/rebate” and Victoria/VIC (home, services, VEU, service areas, about).
- Home H1 → “Air Conditioning Installation & VEU Discount Upgrades in Melbourne”; eyebrow adds “VIC”. VEU page H1 → “VEU Air Conditioning Discount in Victoria”.
- New collapsed 5-question VEU FAQ at the bottom of the VEU page (no dollar figures – amounts confirmed in the quote).
- JSON-LD: VEU Service + FAQPage on the VEU page; business `knowsAbout` VEU; services list `areaServed` adds Victoria.
- Footer intro mentions Victorian Energy Upgrades (VEU).
- Rollback: `git revert` this commit (no data / config changes).

## How to roll back

**Fastest (no code change):** Cloudflare dashboard → Workers & Pages → `rainbow-air-website` →
**Deployments** → choose an earlier deployment → **Rollback**.

**Via git (keeps history):**

```bash
git revert <commit>            # undo one change, then push → redeploys
# or restore the whole site to a tagged version:
git checkout 89d3b44 -- .       # copy that version's files (example: v0.2.1) into the working tree
git commit -m "revert: restore v0.2.1" && git push
```

Never force-push `main`.

---

## v0.7.0 – 2026-11-16 · On-page SEO
- Page titles & descriptions rewritten around real search phrases (EN + 简 + 繁), e.g. "Air Conditioning Installation
  Melbourne", "VEU Gas Heater Replacement Discount".
- Per-page share previews (Open Graph / Twitter) in each language; hreflang alternates now include x-default.
- `sitemap.xml` (24 URLs, all 3 languages with alternates) and generated `robots.txt`.
- Structured data (JSON-LD): HVACBusiness + WebSite site-wide, Services list on Our Services, breadcrumbs on inner
  pages. No review/rating markup (sample reviews).
- ONE launch switch: `src/data/launch.json` → `"launched": true` moves canonical URLs/sitemap to rainbowair.com.au and
  allows indexing (robots.txt + removes the X-Robots-Tag noindex header via `scripts/postbuild.mjs`).

## v0.6.1 – 2026-11-16 · Copy review (wording & translation polish)
- Chinese: "约 10,000" → "超一万次"; fixed "真实反馈" (sample reviews), "合作安装品牌" → "我们安装的品牌",
  unified 补贴 (no more mixed 折扣/补贴), more natural phrasing across services, VEU, aftercare, contact and form text.
- English: "~10,000" → "10,000+", tidied client headline capitalisation, VEU quote item renamed to match the service.
- Stats row no longer splits Chinese numbers across lines on narrow phones.
- Legal / professional-risk items listed for client review (not changed): see project doc "rainbow-air-text-risk-review".

## v0.6.0 – 2026-11-15 · Full Simplified & Traditional Chinese translation (`063af27`)
- Whole site translated: pages, navigation, buttons, footer, floating button, enquiry form (labels, options, errors),
  VEU questionnaire, Privacy Policy & Terms (with "English version prevails" note), page titles/descriptions.
- Structure: English text stays in `src/data/content.ts` + `src/i18n/ui.ts` + `src/i18n/legal.ts`; Simplified Chinese in
  `src/i18n/zh-hans.ts`; Traditional generated by `npm run i18n:hant` (OpenCC s2tw + HK/TW wording fixes).
  Page bodies live in `src/views/*View.tsx`; each URL (EN, /zh-hans/, /zh-hant/) renders the same view per language.
- "中文版即将上线" notice removed. Chinese fonts fall back to PingFang / Microsoft YaHei / Noto; headings break at
  phrase boundaries. `<html lang>` set before first paint; Turnstile check shown in the visitor's language.
- Enquiry emails now include the website language the visitor used.

## v0.5.2 – 2026-11-15 · Attachments on the contact form
- Online Enquiry can now attach photos, short videos (MP4/MOV) or PDFs – up to 5 files, 25 MB in total (photos resized in the
  browser). Sent as email attachments via the Worker; nothing stored. Field renamed "Room Sizes or Other Notes".
- Email setup confirmed working (Resend + Turnstile secrets added in Cloudflare).

## v0.5.1 – 2026-11-15 · Turnstile site key
- Added the live Cloudflare Turnstile site key so the enquiry forms' security check works on the demo domain.

## v0.5.0 – 2026-11-15 · Client preview polish + working enquiry email (`227fbc3`)
- **Online Enquiry and VEU questionnaire now send real emails** via a Cloudflare Worker (`worker/index.js`, route `/api/enquiry`)
  → Cloudflare Turnstile anti-bot check + hidden honeypot field → Resend email. VEU photos (max 5, 5 MB each, resized in the
  browser) and an optional floor plan (image/PDF) are sent as attachments – nothing is stored on a server.
  Needs 3 secrets in Cloudflare: `TURNSTILE_SECRET`, `RESEND_API_KEY`, `ENQUIRY_TO` (see docs/EMAIL-SETUP.md).
- Removed all Sample / Demo / illustrative / draft / "To Be Confirmed" labels for the client preview. Licence, insurance and
  business hours are hidden until supplied. ⚠ Robot reviews must be replaced before public launch.
- Home: "Commercial Projects" replaced by an **Our Team** introduction (experience, system types with images).
  Brand logos always in full colour.
- Floating button & contact icons: Xiaohongshu → **RedNote**, Instagram removed, each platform in its own brand colour,
  all icons in colour; open/close animation now also plays on desktop.
- Our Services: VEU service renamed **"Government Rebate Heating Upgrade (VEU)"**. No "Pre-filled with…" notice on the form.
- VEU page: "What Is the VEU Program?", 5th point (new system installed, rebate applied), heading
  "Is Your Home Eligible for a VEU Rebate?".
- Service Areas: Melbourne metro & surrounds copy; buttons → enquiry form / Request a Quote.

## v0.4.0 – 2026-11-15 · Client revision round 1 (`edf3303`)
**Navigation:** Home → Our Services → VEU Discount Program → Service Areas & Projects → About & Aftercare → Contact Us.
- **Request a Quote** now always lands on the Online Enquiry form (desktop & mobile); Contact hero made compact and the form
  comes first on mobile.
- **Removed** home packages, the product showcase and "Explore / Browse Models" buttons. Help Me Choose and the 3 system
  cards stay ("Learn More" now goes to Help Me Choose). Backup: branch `backup/packages-products` (= `2f6b423`, the v0.3.0
  site) and folder `src/archive/packages-products/` (README explains how to restore).
- **Our Services** page (replaces Air Conditioning Installation; old URL 301-redirects): VEU one-stop service, new installation,
  replacement, repair – each Quote button pre-fills the service. Process, why us, systems, Help Me Choose.
- **VEU Discount Program** page: plain-English intro, link to the official Victorian Government site (new tab), eligibility
  questionnaire (gas ducted → Victoria → agree to disconnect → address, photos, contact). Any "No" stops the flow.
  Front-end only (Demo Mode, nothing sent). Client disclaimer under Submit (14px).
- **Home:** VEU card links to the VEU page; reviews become an auto-sliding, draggable carousel of 7 sample reviews
  ("Robot 1–7", DiceBear cartoon avatars); brand strip above the footer (Midea, Daikin, MHI, Mitsubishi Electric, Rinnai,
  Fujitsu); partner companies removed.
- **Floating button:** frosted semi-transparent ball with rainbow ring, staggered spring open/close, icon rotates to ✕.
  Xiaohongshu opens xhslink.cn/o/68M4U64cBJe in a new tab; phone/email are tap-to-call / tap-to-email; others "coming soon".
- **Contact Us:** large social icon row in the hero + small row beside the form.
- **About & Aftercare:** client copy (Why Choose Rainbow Air ×5, Warranty & Aftercare ×4) and a highlights block
  (team-experience wording – to be substantiated). Company: Rainbow Heating and Cooling Pty Ltd, ACN 703 700 985, ABN 73 703 700 985.
- **Service Areas:** "Servicing Melbourne and surrounding areas, including the south-east" + suburb prompt; placeholders removed.
- **Privacy Policy / Terms and Conditions** pages (our own wording, marked DRAFT for legal review); footer links live.
- **Languages:** EN / 简 / 繁 switcher (top bar + mobile menu), remembered via `/zh-hans/`, `/zh-hant/` URLs and the browser.
  Content stays English for now with a "中文版即将上线" notice.

## v0.3.0 – 2026-11-13 · Fuller home page, contact options, changelog (`0585c38`)
- Home VEU card restyled as a dark frosted-glass card inside the hero (no stark white box); shown in the hero on all screen sizes.
- Home page gains three new sections: **Commercial & Large-Scale Projects** (illustrative images), **Customer Reviews**
  (clearly labelled *sample* placeholders) and **Brands & Partner Companies** (logo placeholders).
- Floating button now has 7 channels in rainbow order: Xiaohongshu, Instagram, Phone, WeChat, WhatsApp, Facebook, Email –
  using official platform icons (simple-icons, CC0). Phone/email become tap-to-call / tap-to-email once confirmed.
- Added this changelog with rollback instructions.

## v0.2.1 – 2026-11-13 · VEU prominence (`89d3b44`)
- VEU card on the home page first screen, linking to `/air-conditioning-installation/#veu`.
- VEU section moved directly under the banner on the Installation page.

## v0.2.0 – 2026-11-13 · Five-page structure (`a826d43`)
- Site split into Home, Air Conditioning Installation, Service Areas & Projects, About & Aftercare, Contact Us
  following the client copy document. Navigation links to real pages.
- All quote buttons open `/contact/#enquiry` with the package/model pre-filled.
- Enquiry form follows the client field list; footer adds Online Enquiry link.
- First version of the floating social button (Xiaohongshu, Instagram, WeChat, Facebook).

## v0.1.2 – 2026-11-13 · Live QA fixes (`ef8e4a5`, `4a7a1f3`)
- Product photo white backgrounds blended into card panels; split-system photo focal point.
- Open Graph URL set to the live demo address.

## v0.1.1 – 2026-11-13 · Cloudflare deployment fix (`5a98938`)
- Added `wrangler.jsonc` so Cloudflare deploys the static export (`out/`) instead of the OpenNext server adapter.

## v0.1.0 – 2026-11-13 · Phase 1 homepage demo (`80dcbfd` … `a825665`)
- Next.js static export, Tailwind design system based on the Rainbow Air logo.
- Single-page homepage with all Phase 1 sections, Demo Mode enquiry form, docs.
