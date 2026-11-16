import type { Locale } from "@/lib/locale";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { routes } from "@/data/site";

import { getDict, setRequestLocale } from "@/i18n/server";
import { quoteHref } from "@/lib/quote";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Aftercare, CompanyHighlights, CompanyInfo } from "@/components/sections/AboutSections";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

/** 5. About & Aftercare – highlights, why choose us, warranty & aftercare, company information. */
export function AboutView({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const { c, ui } = getDict();
  const h = c.aboutCopy.hero;
  return (
    <>
      <BreadcrumbJsonLd locale={locale} path={routes.about} name={ui.nav.about} />
      <PageHero eyebrow={h.eyebrow} title={h.title} body={h.body} crumb={ui.nav.about} image={h.image}>
        <ButtonLink href="#aftercare" size="lg">
          {ui.about.warrantyAftercare}
        </ButtonLink>
        <ButtonLink href={quoteHref({ type: "aftercare" })} size="lg" variant="ghost-light">
          {c.aboutCopy.aftercare.cta}
        </ButtonLink>
      </PageHero>
      <CompanyHighlights />
      <WhyChooseUs />
      <Aftercare />
      <CompanyInfo />
    </>
  );
}
