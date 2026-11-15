/**
 * Language (locale) helpers.
 *
 * English lives at the root ("/our-services/"); Chinese versions live under a prefix
 * ("/zh-hans/our-services/", "/zh-hant/our-services/"). Every internal link keeps the
 * current prefix, and the visitor's choice is stored so it is remembered across pages,
 * refreshes and return visits.
 */

export const locales = ["en", "zh-hans", "zh-hant"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, { short: string; name: string; htmlLang: string }> = {
  en: { short: "EN", name: "English", htmlLang: "en-AU" },
  "zh-hans": { short: "简", name: "简体中文", htmlLang: "zh-Hans" },
  "zh-hant": { short: "繁", name: "繁體中文", htmlLang: "zh-Hant" },
};

export const LOCALE_STORAGE_KEY = "rainbow-air-locale";

export function localeFromPath(pathname: string | null | undefined): Locale {
  const seg = (pathname ?? "/").split("/")[1];
  return seg === "zh-hans" || seg === "zh-hant" ? seg : "en";
}

/** Remove any locale prefix: "/zh-hans/contact/" → "/contact/". */
export function stripLocale(pathname: string): string {
  const stripped = pathname.replace(/^\/(zh-hans|zh-hant)(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}

/** Add the locale prefix to an internal href (keeps ?query and #hash). External links are untouched. */
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const base = stripLocale(href);
  return locale === "en" ? base : `/${locale}${base}`;
}
