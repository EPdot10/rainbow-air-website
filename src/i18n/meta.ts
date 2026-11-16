import type { Metadata } from "next";
import { routes, site } from "@/data/site";
import { localizeHref, type Locale } from "@/lib/locale";
import { resolveImage } from "@/lib/images";
import { dict } from "./index";

export type PageKey = "home" | "services" | "veu" | "projects" | "about" | "contact" | "privacy" | "terms";

const paths: Record<PageKey, string> = {
  home: routes.home,
  services: routes.services,
  veu: routes.veu,
  projects: routes.projects,
  about: routes.about,
  contact: routes.contact,
  privacy: routes.privacy,
  terms: routes.terms,
};

const ogLocale: Record<Locale, string> = { en: "en_AU", "zh-hans": "zh_CN", "zh-hant": "zh_TW" };
const ogImage = resolveImage("heroLivingRoom", 1440);

/**
 * Per page and language: title, description, canonical URL, hreflang alternates (+ x-default),
 * and the matching Open Graph / Twitter preview (what shows when the link is shared).
 */
export function pageMetadata(page: PageKey, locale: Locale): Metadata {
  const m = dict(locale).ui.meta;
  const path = paths[page];
  const own = page === "home" ? { title: m.siteTitle, description: m.siteDescription } : m[page];
  // Layout adds " | Rainbow Air" to these via its title template; the home title is used as-is.
  const shareTitle = page === "home" ? { absolute: m.siteTitle } : own.title;
  const description = own.description || m.siteDescription;
  const url = localizeHref(path, locale);
  return {
    title: page === "home" ? { absolute: m.siteTitle } : own.title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "en-AU": path,
        "zh-Hans": localizeHref(path, "zh-hans"),
        "zh-Hant": localizeHref(path, "zh-hant"),
        "x-default": path,
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      url,
      title: shareTitle,
      description,
      locale: ogLocale[locale],
      alternateLocale: (Object.keys(ogLocale) as Locale[]).filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [{ url: ogImage.src, width: 1440, height: 960, alt: ogImage.alt }],
    },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: [ogImage.src] },
  };
}
