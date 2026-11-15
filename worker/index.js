/**
 * Rainbow Air – Cloudflare Worker.
 *
 * Static pages are served directly from ./out (assets). Only /api/* reaches this code
 * (see `run_worker_first` in wrangler.jsonc), so normal page views cost nothing extra.
 *
 * POST /api/enquiry  (multipart/form-data)
 *   kind = "quote" | "veu", form fields, optional files ("photos", "floorPlan"),
 *   "cf-turnstile-response" (Turnstile token), "website" (honeypot – must be empty).
 * → verifies Turnstile, then emails the enquiry (with attachments) via Resend.
 *
 * Secrets (Cloudflare dashboard → Worker → Settings → Variables and Secrets, type "Secret"):
 *   TURNSTILE_SECRET  – Turnstile widget secret key
 *   RESEND_API_KEY    – Resend API key
 *   ENQUIRY_TO        – inbox that receives enquiries (comma-separate for several)
 * Optional:
 *   MAIL_FROM         – sender, e.g. "Rainbow Air Website <enquiries@rainbowair.com.au>"
 *                       (needs a verified domain in Resend; defaults to Resend's test sender)
 */

const MAX_FILES = 6; // 5 photos + 1 floor plan
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_TOTAL_BYTES = 26 * 1024 * 1024;
const FILE_TYPES = /^(image\/(jpeg|png|webp|heic|heif|gif)|application\/pdf)$/;

const QUOTE_FIELDS = [
  ["fullName", "Name"],
  ["phone", "Contact number"],
  ["email", "Email"],
  ["suburb", "Suburb / postcode"],
  ["enquiryType", "Enquiry type"],
  ["installation", "Installation requirement"],
  ["rooms", "Number of rooms"],
  ["roomNames", "Which rooms"],
  ["preferred", "Preferred service / system"],
  ["existing", "Existing heating / cooling"],
  ["message", "Notes"],
];

const VEU_FIELDS = [
  ["gas", "Gas ducted heating"],
  ["vic", "Property in Victoria"],
  ["disconnect", "Agrees to disconnect old gas heater"],
  ["address", "Street address"],
  ["suburb", "Suburb"],
  ["postcode", "Postcode"],
  ["name", "Name"],
  ["phone", "Contact number"],
  ["email", "Email"],
  ["notes", "Notes"],
  ["consent", "Consent to be contacted"],
];

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const clean = (v, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const isPhone = (v) => /^[\d\s()+-]+$/.test(v) && v.replace(/\D/g, "").length >= 8 && v.replace(/\D/g, "").length <= 12;

function toBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}

async function verifyTurnstile(token, ip, secret) {
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const data = await res.json().catch(() => ({}));
  return data.success === true;
}

function validate(kind, v) {
  if (kind === "quote") {
    if (v.fullName.length < 2) return "name";
    if (!isPhone(v.phone)) return "phone";
    if (v.email && !isEmail(v.email)) return "email";
    if (v.suburb.length < 3) return "suburb";
    if (!v.enquiryType || !v.installation) return "enquiryType";
    return null;
  }
  if (v.gas !== "Yes" || v.vic !== "Yes" || v.disconnect !== "Yes") return "eligibility";
  if (v.address.length < 4 || v.suburb.length < 2 || !/^3\d{3}$/.test(v.postcode)) return "address";
  if (v.name.length < 2) return "name";
  if (!isPhone(v.phone)) return "phone";
  if (!isEmail(v.email)) return "email";
  if (v.consent !== "Yes") return "consent";
  return null;
}

async function handleEnquiry(request, env) {
  if (request.method !== "POST") return json({ ok: false, error: "method" }, 405);

  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ ok: false, error: "origin" }, 403);

  if (!env.TURNSTILE_SECRET || !env.RESEND_API_KEY || !env.ENQUIRY_TO) return json({ ok: false, error: "not_configured" }, 503);

  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_TOTAL_BYTES + 1024 * 1024) return json({ ok: false, error: "too_large" }, 413);

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  // Honeypot: real visitors never see this field. Pretend success so bots learn nothing.
  if (clean(form.get("website"))) return json({ ok: true });

  const token = clean(form.get("cf-turnstile-response"), 4096);
  if (!token || !(await verifyTurnstile(token, request.headers.get("cf-connecting-ip"), env.TURNSTILE_SECRET)))
    return json({ ok: false, error: "verification" }, 400);

  const kind = form.get("kind") === "veu" ? "veu" : "quote";
  const fields = kind === "veu" ? VEU_FIELDS : QUOTE_FIELDS;
  const values = Object.fromEntries(fields.map(([k]) => [k, clean(form.get(k))]));
  const invalid = validate(kind, values);
  if (invalid) return json({ ok: false, error: "invalid", field: invalid }, 400);

  // Attachments (VEU questionnaire only).
  const attachments = [];
  if (kind === "veu") {
    const files = [...form.getAll("photos"), ...form.getAll("floorPlan")].filter((f) => typeof f === "object" && f && f.size > 0);
    if (files.length > MAX_FILES) return json({ ok: false, error: "too_many_files" }, 400);
    let total = 0;
    for (const [i, f] of files.entries()) {
      if (f.size > MAX_FILE_BYTES) return json({ ok: false, error: "file_too_large" }, 413);
      if (f.type && !FILE_TYPES.test(f.type)) return json({ ok: false, error: "file_type" }, 400);
      total += f.size;
      if (total > MAX_TOTAL_BYTES) return json({ ok: false, error: "too_large" }, 413);
      const isPlan = form.getAll("floorPlan").includes(f);
      const safeName = (f.name || `file-${i + 1}`).replace(/[^\w.\- ]+/g, "_").slice(0, 80);
      attachments.push({ filename: `${isPlan ? "floor-plan" : `photo-${i + 1}`}-${safeName}`, content: toBase64(await f.arrayBuffer()) });
    }
  }

  const page = clean(form.get("page"), 300);
  const title = kind === "veu" ? "VEU rebate eligibility enquiry" : "Website enquiry";
  const who = kind === "veu" ? values.name : values.fullName;
  const where = kind === "veu" ? `${values.suburb} ${values.postcode}` : values.suburb;
  const subject = `${title} – ${who} (${where})`.slice(0, 180);
  const rows = fields.filter(([k]) => values[k]);
  const sent = new Date().toLocaleString("en-AU", { timeZone: "Australia/Melbourne" });

  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#152034">
<h2 style="color:#03224f;margin:0 0 12px">${esc(title)}</h2>
<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px">
${rows.map(([k, label]) => `<tr><td style="border:1px solid #e2e7ef;background:#f6f8fb;font-weight:bold;vertical-align:top">${esc(label)}</td><td style="border:1px solid #e2e7ef;white-space:pre-wrap">${esc(values[k])}</td></tr>`).join("\n")}
</table>
<p style="font-size:12px;color:#637085;margin-top:16px">Sent ${esc(sent)} (Melbourne time)${page ? ` from ${esc(page)}` : ""}${attachments.length ? ` · ${attachments.length} attachment(s)` : ""}</p>
</body></html>`;
  const text = `${title}\n\n${rows.map(([k, label]) => `${label}: ${values[k]}`).join("\n")}\n\nSent ${sent}${page ? ` from ${page}` : ""}`;

  const replyTo = isEmail(values.email) ? values.email : undefined;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: env.MAIL_FROM || "Rainbow Air Website <onboarding@resend.dev>",
      to: env.ENQUIRY_TO.split(",").map((s) => s.trim()).filter(Boolean),
      reply_to: replyTo,
      subject,
      html,
      text,
      attachments: attachments.length ? attachments : undefined,
    }),
  });
  if (!res.ok) {
    console.error("Resend error", res.status, await res.text().catch(() => ""));
    return json({ ok: false, error: "send_failed" }, 502);
  }
  return json({ ok: true });
}

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/enquiry" || url.pathname === "/api/enquiry/") return handleEnquiry(request, env);
    if (url.pathname.startsWith("/api/")) return json({ ok: false, error: "not_found" }, 404);
    return env.ASSETS.fetch(request);
  },
};

export default worker;
