import type { Locale } from "@/lib/locale";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { routes } from "@/data/site";

import { getDict, setRequestLocale } from "@/i18n/server";
import { PageHero } from "@/components/layout/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { SocialRow } from "@/components/social/SocialIcons";

/** 6. Contact Us – compact hero with social icons, then the enquiry form (#enquiry) and contact details. */
export function ContactView({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const { c, ui } = getDict();
  const h = c.contactCopy.hero;
  return (
    <>
      <BreadcrumbJsonLd locale={locale} path={routes.contact} name={ui.nav.contact} />
      <PageHero compact eyebrow={h.eyebrow} title={h.title} body={h.body} crumb={ui.nav.contact} extra={<SocialRow tone="light" />} />
      <ContactSection />
    </>
  );
}
