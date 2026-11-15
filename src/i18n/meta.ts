import type { Metadata } from "next";
import { routes } from "@/data/site";
import { localizeHref, type Locale } from "@/lib/locale";
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

/** Title, description, canonical and language alternates for a page in a locale. */
export function pageMetadata(page: PageKey, locale: Locale): Metadata {
  const m = dict(locale).ui.meta;
  const path = paths[page];
  const own = page === "home" ? { title: m.siteTitle, description: m.siteDescription } : m[page];
  return {
    ...(page === "home" ? { title: { absolute: m.siteTitle } } : { title: own.title }),
    description: own.description || m.siteDescription,
    alternates: {
      canonical: localizeHref(path, locale),
      languages: {
        "en-AU": path,
        "zh-Hans": localizeHref(path, "zh-hans"),
        "zh-Hant": localizeHref(path, "zh-hant"),
      },
    },
  };
}
