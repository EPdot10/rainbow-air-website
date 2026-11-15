import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { getDict, setRequestLocale } from "@/i18n/server";
import { quoteHref } from "@/lib/quote";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceProcess, ServiceWhy, ServicesList } from "@/components/sections/ServicesSections";
import { ServiceTypes } from "@/components/sections/ServiceTypes";
import { HelpMeChoose } from "@/components/sections/HelpMeChoose";

/** 2. Our Services – VEU upgrade first, then new install / replacement / repair, process, why us, systems, help me choose. */
export function ServicesView({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const { c, ui } = getDict();
  const h = c.servicesCopy.hero;
  return (
    <>
      <PageHero eyebrow={h.eyebrow} title={h.title} body={h.body} crumb={ui.nav.services} image={h.image}>
        <ButtonLink href="#services" size="lg">
          {ui.services.viewServices}
          <ArrowRight className="size-[1.1rem]" aria-hidden />
        </ButtonLink>
        <ButtonLink href={quoteHref({ type: "help" })} size="lg" variant="ghost-light">
          {ui.services.helpMeChoose}
        </ButtonLink>
      </PageHero>
      <ServicesList />
      <ServiceProcess />
      <ServiceWhy />
      <ServiceTypes />
      <HelpMeChoose />
    </>
  );
}
