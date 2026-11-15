import { cache } from "react";
import type { Locale } from "@/lib/locale";

/**
 * Locale for the page being rendered (server components). Each page view calls
 * setRequestLocale() first; sections below it read getLocale(). Client components use
 * useLocale() (from the URL) instead.
 */
const store = cache(() => ({ locale: "en" as Locale }));

export function setRequestLocale(locale: Locale) {
  store().locale = locale;
}

export function getLocale(): Locale {
  return store().locale;
}

import { dict } from "./index";

/** Dictionary for the page being rendered (server components). */
export function getDict() {
  return dict(getLocale());
}
