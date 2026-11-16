import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-static";

/** Before launch: block all crawlers. After launch: allow everything except the API, and point to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  if (!site.seo.indexable) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
