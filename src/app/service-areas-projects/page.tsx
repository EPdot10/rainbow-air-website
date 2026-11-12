import type { Metadata } from "next";
import { projectsCopy } from "@/data/content";
import { quoteHref } from "@/lib/quote";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { ProjectGallery } from "@/components/gallery/ProjectGallery";

export const metadata: Metadata = {
  title: "Service Areas & Projects",
  description: "Check whether Rainbow Air services your Melbourne suburb and explore air conditioning installation projects.",
  alternates: { canonical: "/service-areas-projects/" },
};

/** 3. Service Areas & Projects. */
export default function ProjectsPage() {
  const h = projectsCopy.hero;
  return (
    <>
      <PageHero eyebrow={h.eyebrow} title={h.title} body={h.body} crumb="Service Areas & Projects" image={h.image}>
        <ButtonLink href={quoteHref({ type: "general" })} size="lg">
          Check My Suburb
        </ButtonLink>
        <ButtonLink href="#projects" size="lg" variant="ghost-light">
          View Projects
        </ButtonLink>
      </PageHero>
      <ServiceArea />
      <ProjectGallery />
    </>
  );
}
