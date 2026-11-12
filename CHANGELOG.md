# Changelog

Every push to `main` is deployed automatically to Cloudflare. Each release below has a **git tag**
so any version can be restored. Newest first.

## How to roll back

**Fastest (no code change):** Cloudflare dashboard → Workers & Pages → `rainbow-air-website` →
**Deployments** → choose an earlier deployment → **Rollback**.

**Via git (keeps history):**

```bash
git revert <commit>            # undo one change, then push → redeploys
# or restore the whole site to a tagged version:
git checkout v0.2.1 -- .        # copy that version's files into the working tree
git commit -m "revert: restore v0.2.1" && git push
```

Never force-push `main`.

---

## v0.3.0 – 2026-11-13 · Fuller home page, contact options, changelog
- Home VEU card restyled as a dark frosted-glass card inside the hero (no stark white box); shown in the hero on all screen sizes.
- Home page gains three new sections: **Commercial & Large-Scale Projects** (illustrative images), **Customer Reviews**
  (clearly labelled *sample* placeholders) and **Brands & Partner Companies** (logo placeholders).
- Floating button now has 7 channels in rainbow order: Xiaohongshu, Instagram, Phone, WeChat, WhatsApp, Facebook, Email –
  using official platform icons (simple-icons, CC0). Phone/email become tap-to-call / tap-to-email once confirmed.
- Added this changelog and version tags.

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
