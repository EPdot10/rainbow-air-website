/**
 * Quote enquiry form configuration.
 *
 * While `endpoint` is empty the form runs in DEMO MODE: it validates input
 * but never reports a successful submission, because nothing is sent or stored.
 *
 * To go live, point `endpoint` at a handler that accepts JSON POST
 * (e.g. a Cloudflare Pages Function at /api/enquiry with Turnstile + email notification),
 * or set NEXT_PUBLIC_ENQUIRY_ENDPOINT at build time.
 */
export const formConfig = {
  endpoint: process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ?? "",
};

export const isDemoMode = () => !formConfig.endpoint;

export const enquiryTypes = [
  "Package / Product Quote",
  "Help Me Choose",
  "VEU Eligibility Enquiry",
  "General Enquiry",
] as const;

export const installationRequirements = ["New Installation", "Replacement", "Not Sure Yet"] as const;

export const roomOptions = ["1", "2", "3", "4", "5+", "Whole home", "Not sure"] as const;

export type EnquiryType = (typeof enquiryTypes)[number];
