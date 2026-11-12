# Deployment – GitHub + Cloudflare Pages (free)

## 1. GitHub repository
```bash
# repository: github.com/<account>/rainbow-air-website
git remote add origin https://github.com/<account>/rainbow-air-website.git
git push -u origin main
```

## 2. Cloudflare Pages (Git integration → automatic deploys)
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

## 3. Verify
- Open the `*.pages.dev` URL, refresh the page, try `/#quote` directly, and a mistyped URL (should show the friendly “coming soon” page).
- Response headers should include `X-Robots-Tag: noindex, nofollow` (demo).

## Notes
- The site is a static export, so no Workers/Functions are needed in Phase 1.
- When the enquiry endpoint is added (Phase 2), set `NEXT_PUBLIC_ENQUIRY_ENDPOINT` under Settings → Environment variables and redeploy.
