# Enquiry email setup (Cloudflare Worker + Turnstile + Resend)

Both forms POST to `/api/enquiry` (worker/index.js). The Worker verifies Cloudflare Turnstile, then sends the
enquiry by email through Resend. Free tiers: Workers 100k requests/day; Resend 3,000 emails/month (100/day).
Attachments are sent directly in the email and not stored.

## 1. Resend
1. Sign up at resend.com with the inbox that should receive test enquiries.
2. API Keys → Create API key (permission: Sending access) → copy it.
3. Until a domain is verified, Resend can only deliver to the account's own email address.
   For the client's inbox later: Domains → add `rainbowair.com.au` → add the DNS records → then set
   `MAIL_FROM` (e.g. `Rainbow Air Website <enquiries@rainbowair.com.au>`) and change `ENQUIRY_TO`.

## 2. Turnstile
Cloudflare dashboard → Turnstile → Add widget → hostname `rainbow-air-website.wangxcep.workers.dev`
(add the real domain later), mode "Managed". Copy the **site key** (public → `TURNSTILE_SITE_KEY` in
`src/data/form.ts`) and the **secret key** (→ Worker secret).

## 3. Worker secrets
Workers & Pages → rainbow-air-website → Settings → Variables and Secrets → Add (type **Secret**):
`TURNSTILE_SECRET`, `RESEND_API_KEY`, `ENQUIRY_TO`. Secrets survive redeploys.

Until all three are set, the forms show "couldn't be sent – please call" (never a false success).
