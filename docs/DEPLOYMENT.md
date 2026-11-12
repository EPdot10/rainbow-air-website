# Deployment – GitHub + Cloudflare (free)

The site is a static export (`out/`). It can be hosted either as a **Cloudflare Worker with static assets**
(current setup, `wrangler.jsonc`, free `*.workers.dev` URL) or on **Cloudflare Pages** (free `*.pages.dev` URL).
Both are free and both auto-deploy on every push to `main`.

## Current setup – Cloudflare Workers Builds
- Worker name: `rainbow-air-website` (must match `name` in `wrangler.jsonc`)
- Live demo URL: https://rainbow-air-website.wangxcep.workers.dev
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy` (reads `wrangler.jsonc` and uploads `./out` as static assets – no server code)
- Environment variable (build): `NODE_VERSION` = `22`

Without `wrangler.jsonc`, `wrangler deploy` tries to auto-configure the OpenNext server adapter, which fails for a
static export – keep the file in the repo.

## Alternative – Cloudflare Pages

### GitHub repository
```bash
# repository: github.com/<account>/rainbow-air-website
git remote add origin https://github.com/<account>/rainbow-air-website.git
git push -u origin main
```

### Pages setup (Git integration → automatic deploys)
1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Import an existing Git repository**.
2. Connect GitHub, authorise the Cloudflare Pages app for the `rainbow-air-website` repository.
3. Project name: `rainbow-air-demo` (gives `https://rainbow-air-demo.pages.dev`; if taken, choose a similar name).
4. Production branch: `main`.
5. Build settings:
   - Framework preset: **Next.js (Static HTML Export)** (or *None*)
   - Build command: `npm run build`
   - Build output directory: `out`
   - Environment variable: `NODE_VERSION` = `22`
6. **Save and Deploy.**

Every `git push` to `main` now triggers a production deployment; other branches get preview URLs.
HTTPS is automatic on `*.pages.dev`. Free plan only – no paid add-ons are needed.

## Verify
- Open the `*.pages.dev` URL, refresh the page, try `/#quote` directly, and a mistyped URL (should show the friendly “coming soon” page).
- Response headers should include `X-Robots-Tag: noindex, nofollow` (demo).

## Notes
- The site is a static export, so no Workers/Functions are needed in Phase 1.
- When the enquiry endpoint is added (Phase 2), set `NEXT_PUBLIC_ENQUIRY_ENDPOINT` under Settings → Environment variables and redeploy.
