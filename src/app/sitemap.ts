import type { MetadataRoute } from "next";
import { routes, site } from "@/data/site";
import { localizeHref } from "@/lib/locale";

export const dynamic = "force-static";

const pages: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: routes.home, priority: 1, changeFrequency: "monthly" },
  { path: routes.services, priority: 0.9, changeFrequency: "monthly" },
  { path: routes.veu, priority: 0.9, changeFrequency: "monthly" },
  { path: routes.contact, priority: 0.8, changeFrequency: "yearly" },
  { path: routes.projects, priority: 0.7, changeFrequency: "monthly" },
  { path: routes.about, priority: 0.7, changeFrequency: "yearly" },
  { path: routes.privacy, priority: 0.2, changeFrequency: "yearly" },
  { path: routes.terms, priority: 0.2, changeFrequency: "yearly" },
];

/** Every page in all three languages, each listing its language alternates (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  const abs = (p: string) => `${site.url}${p}`;
  const lastModified = new Date();
  return pages.flatMap(({ path, priority, changeFrequency }) => {
    const languages = {
      "en-AU": abs(path),
      "zh-Hans": abs(localizeHref(path, "zh-hans")),
      "zh-Hant": abs(localizeHref(path, "zh-hant")),
      "x-default": abs(path),
    };
    return (["en", "zh-hans", "zh-hant"] as const).map((loc) => ({
      url: abs(localizeHref(path, loc)),
      lastModified,
      changeFrequency,
      priority: loc === "en" ? priority : Math.round(priority * 0.9 * 10) / 10,
      alternates: { languages },
    }));
  });
}
