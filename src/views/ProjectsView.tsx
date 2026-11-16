import type { Locale } from "@/lib/locale";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { routes } from "@/data/site";

import { getDict, setRequestLocale } from "@/i18n/server";
import { quoteHref } from "@/lib/quote";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { ProjectGallery } from "@/components/gallery/ProjectGallery";

/** 4. Service Areas & Projects. */
export function ProjectsView({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const { c, ui } = getDict();
  const h = c.projectsCopy.hero;
  return (
    <>
      <BreadcrumbJsonLd locale={locale} path={routes.projects} name={ui.nav.projects} />
      <PageHero eyebrow={h.eyebrow} title={h.title} body={h.body} crumb={ui.nav.projects} image={h.image}>
        <ButtonLink href={quoteHref()} size="lg">
          {ui.common.requestQuote}
        </ButtonLink>
        <ButtonLink href="#projects" size="lg" variant="ghost-light">
          {ui.projects.viewProjects}
        </ButtonLink>
      </PageHero>
      <ServiceArea />
      <ProjectGallery />
    </>
  );
}
