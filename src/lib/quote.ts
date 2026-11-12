import { routes } from "@/data/site";
import type { EnquiryKey } from "@/data/form";

export interface QuoteParams {
  type?: EnquiryKey;
  /** Package or model, pre-filled into "Preferred Package / Model" (editable). */
  item?: string;
  install?: "new" | "replacement" | "unsure";
}

/**
 * Link to the online enquiry form with pre-filled values.
 * Any "Get a Quote" button on any page uses this, so the form opens with
 * the chosen package/model already selected.
 */
export function quoteHref(p: QuoteParams = {}) {
  const q = new URLSearchParams();
  if (p.type) q.set("type", p.type);
  if (p.item) q.set("item", p.item);
  if (p.install) q.set("install", p.install);
  const qs = q.toString();
  return `${routes.contact}${qs ? `?${qs}` : ""}#enquiry`;
}
