/**
 * Online enquiry form configuration.
 *
 * While `endpoint` is empty the form runs in DEMO MODE: it validates input
 * but never reports a successful submission, because nothing is sent or stored.
 *
 * To go live, point `endpoint` at a handler that accepts JSON POST and emails the
 * enquiry to Rainbow Air (e.g. a Cloudflare Worker route at /api/enquiry with
 * Turnstile + an email service), or set NEXT_PUBLIC_ENQUIRY_ENDPOINT at build time.
 */
export const formConfig = {
  endpoint: process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ?? "",
};

export const isDemoMode = () => !formConfig.endpoint;

/** Enquiry types – `key` is used in links (?type=…), `label` is what the visitor sees. */
export const enquiryTypes = [
  { key: "package", label: "Package / Model Quote" },
  { key: "help", label: "Help Me Choose" },
  { key: "veu", label: "VEU Eligibility Enquiry" },
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
  /** Shown only after a real, successful submission (never in Demo Mode). */
  success:
    "We've received your enquiry. Rainbow Air will contact you by the phone number or email you provided to confirm the next steps.",
};
