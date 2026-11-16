import { site, socialChannels } from "@/data/site";
import { resolveImage } from "@/lib/images";
import type { Locale } from "@/lib/locale";
import { localizeHref } from "@/lib/locale";
import { dict } from "@/i18n";
import { routes } from "@/data/site";

/**
 * schema.org structured data (JSON-LD): tells search engines in a machine-readable way who the business is,
 * how to contact it, where it works and what it offers. No ratings/reviews are marked up (sample reviews only).
 */
function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

const abs = (p: string) => (p.startsWith("http") ? p : `${site.url}${p}`);
const businessId = `${site.url}/#business`;

/** Site-wide: the business + the website (in the root layout). */
export function BusinessJsonLd() {
  const image = resolveImage("heroLivingRoom", 1440).src;
  const sameAs = socialChannels.filter((c) => c.href?.startsWith("http")).map((c) => c.href as string);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "HVACBusiness",
            "@id": businessId,
            name: site.name,
            legalName: site.company.legalName,
            slogan: site.slogan,
            url: `${site.url}/`,
            logo: abs("/brand/rainbow-air-logo.png"),
            image: abs(image),
            telephone: "+61 433 600 166",
            email: site.contact.email,
            taxID: `ABN ${site.company.abn}`,
            address: { "@type": "PostalAddress", addressRegion: "VIC", addressCountry: "AU" },
            areaServed: [
              { "@type": "City", name: "Melbourne" },
              { "@type": "State", name: "Victoria" },
            ],
            knowsLanguage: ["en", "zh-Hans", "zh-Hant"],
            knowsAbout: [
              "Victorian Energy Upgrades (VEU) program",
              "VEU heating and cooling discount",
              "Reverse cycle air conditioning",
              "Gas heater replacement",
              "Split system and ducted air conditioning",
            ],
            ...(sameAs.length ? { sameAs } : {}),
          },
          {
            "@type": "WebSite",
            "@id": `${site.url}/#website`,
            url: `${site.url}/`,
            name: site.name,
            publisher: { "@id": businessId },
            inLanguage: ["en-AU", "zh-Hans", "zh-Hant"],
          },
        ],
      }}
    />
  );
}

/** Services page: the four services, in the page's language. */
export function ServicesJsonLd({ locale }: { locale: Locale }) {
  const { c } = dict(locale);
  const pageUrl = abs(localizeHref(routes.services, locale));
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: c.servicesCopy.list.title,
        itemListElement: c.services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: s.title,
            description: s.summary,
            serviceType: "Air conditioning",
            url: `${pageUrl}#service-${s.id}`,
            provider: { "@id": businessId },
            areaServed: [
              { "@type": "City", name: "Melbourne" },
              { "@type": "State", name: "Victoria" },
            ],
          },
        })),
      }}
    />
  );
}

/** Breadcrumb trail for inner pages (Home › Page). */
export function BreadcrumbJsonLd({ locale, path, name }: { locale: Locale; path: string; name: string }) {
  const { ui } = dict(locale);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.common.home, item: abs(localizeHref(routes.home, locale)) },
          { "@type": "ListItem", position: 2, name, item: abs(localizeHref(path, locale)) },
        ],
      }}
    />
  );
}

/** VEU page: the VEU upgrade as a service (Victoria) + the FAQ, in the page's language. */
export function VeuJsonLd({ locale }: { locale: Locale }) {
  const { c, ui } = dict(locale);
  const pageUrl = abs(localizeHref(routes.veu, locale));
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Service",
            "@id": `${pageUrl}#service`,
            name: c.veuPage.hero.title,
            alternateName: ["VEU rebate", "VEU discount", "Victorian Energy Upgrades air conditioning discount"],
            description: ui.meta.veu.description,
            serviceType: "Reverse cycle air conditioning upgrade – Victorian Energy Upgrades (VEU)",
            url: pageUrl,
            provider: { "@id": businessId },
            areaServed: [
              { "@type": "State", name: "Victoria" },
              { "@type": "City", name: "Melbourne" },
            ],
          },
          {
            "@type": "FAQPage",
            "@id": `${pageUrl}#faq`,
            mainEntity: c.veuPage.faq.items.map((it) => ({
              "@type": "Question",
              name: it.q,
              acceptedAnswer: { "@type": "Answer", text: it.a },
            })),
          },
        ],
      }}
    />
  );
}
