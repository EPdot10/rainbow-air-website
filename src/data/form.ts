/**
 * Online enquiry configuration.
 * Both forms (Contact enquiry and VEU questionnaire) POST multipart data to the Cloudflare
 * Worker at /api/enquiry (worker/index.js), which checks Turnstile and emails the enquiry.
 */
export const formConfig = {
  endpoint: "/api/enquiry",
};

/**
 * Cloudflare Turnstile site key (public – safe to commit). Set it from the Turnstile widget in the
 * Cloudflare dashboard. Local/test hosts always use Cloudflare's "always passes" test key.
 */
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const TURNSTILE_TEST_KEY = "1x00000000000000000000AA";

export function turnstileSiteKey(): string {
  const local = typeof window !== "undefined" && /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
  return local || !TURNSTILE_SITE_KEY ? TURNSTILE_TEST_KEY : TURNSTILE_SITE_KEY;
}

export type SubmitResult = { ok: true } | { ok: false; error: string };

/** Sends an enquiry (fields + optional files) to the Worker. */
export async function submitEnquiry(data: FormData): Promise<SubmitResult> {
  try {
    data.set("page", window.location.href);
    const res = await fetch(formConfig.endpoint, { method: "POST", body: data });
    const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (res.ok && body.ok) return { ok: true };
    return { ok: false, error: body.error ?? `http_${res.status}` };
  } catch {
    return { ok: false, error: "network" };
  }
}

/** Visitor-facing message for a failed submission. */
export function submitErrorMessage(error: string): string {
  if (error === "verification") return "The security check didn't complete. Please try again.";
  if (error === "file_too_large" || error === "too_large") return "One of the files is too large. Each file must be under 5 MB.";
  if (error === "file_type") return "Please upload photos (JPG, PNG, HEIC) or a PDF floor plan.";
  return "Sorry, your enquiry couldn't be sent. Please try again, or call us on 0433 600 166.";
}

/** Enquiry types – `key` is used in links (?type=…), `label` is what the visitor sees. */
export const enquiryTypes = [
  { key: "veu", label: "VEU Discount Upgrade" },
  { key: "new", label: "New Installation Quote" },
  { key: "replacement", label: "Replacement Quote" },
  { key: "repair", label: "Repair Enquiry" },
  { key: "help", label: "Help Me Choose" },
  { key: "aftercare", label: "Aftercare Enquiry" },
  { key: "general", label: "General Enquiry" },
] as const;

export type EnquiryKey = (typeof enquiryTypes)[number]["key"];

export const installationRequirements = [
  { key: "new", label: "New Installation" },
  { key: "replacement", label: "Replacing an Old System" },
  { key: "unsure", label: "Not Sure Yet" },
] as const;

export const roomOptions = ["1", "2", "3", "4", "5+", "Whole home", "Not sure"] as const;

export const formCopy = {
  submit: "Send Enquiry",
  /** Shown after a successful submission. */
  success:
    "We've received your enquiry. Rainbow Air will contact you by the phone number or email you provided to confirm the next steps.",
};
