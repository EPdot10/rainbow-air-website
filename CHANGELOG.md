# Changelog

Every push to `main` is deployed automatically to Cloudflare. Each entry lists the **commit ID** of that
version so it can be restored. Newest first. Add an entry here with every push.

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
