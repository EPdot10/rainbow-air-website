import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { routes } from "@/data/site";

import { getDict, setRequestLocale } from "@/i18n/server";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VeuIntro } from "@/components/veu/VeuIntro";
import { VeuQuestionnaire } from "@/components/veu/VeuQuestionnaire";

/** 3. VEU Discount Program – intro, official link, eligibility questionnaire. */
export function VeuView({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const { c: content, ui } = getDict();
  const h = content.veuPage.hero;
  const c = content.veuPage.check;
  return (
    <>
      <BreadcrumbJsonLd locale={locale} path={routes.veu} name={ui.nav.veu} />
      <PageHero eyebrow={h.eyebrow} title={h.title} body={h.body} crumb={ui.nav.veu} image={h.image}>
        <ButtonLink href="#eligibility" size="lg">
          {ui.veu.checkEligibility}
          <ArrowRight className="size-[1.1rem]" aria-hidden />
        </ButtonLink>
        <ButtonLink href="#about-veu" size="lg" variant="ghost-light">
          {ui.veu.whatIsVeu}
        </ButtonLink>
      </PageHero>
      <VeuIntro />
      <section id="eligibility" aria-labelledby="eligibility-title" className="scroll-mt-24 bg-surface py-20 sm:py-24">
        <div className="container-page max-w-4xl">
          <SectionHeading id="eligibility-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} align="center" />
          <div className="mt-10">
            <VeuQuestionnaire />
          </div>
        </div>
      </section>
    </>
  );
}
