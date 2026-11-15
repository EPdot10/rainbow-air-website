import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { servicesCopy } from "@/data/content";
import { quoteHref } from "@/lib/quote";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceProcess, ServiceWhy, ServicesList } from "@/components/sections/ServicesSections";
import { ServiceTypes } from "@/components/sections/ServiceTypes";
import { HelpMeChoose } from "@/components/sections/HelpMeChoose";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "VEU discount upgrades, new air conditioning installations, replacements and repairs for Melbourne homes – from Rainbow Air, a VEU Accredited Provider.",
  alternates: { canonical: "/our-services/" },
};

/** 2. Our Services – VEU one-stop service first, then new install / replacement / repair, process, why us, systems, help me choose. */
export default function ServicesPage() {
  const h = servicesCopy.hero;
  return (
    <>
      <PageHero eyebrow={h.eyebrow} title={h.title} body={h.body} crumb="Our Services" image={h.image}>
        <ButtonLink href="#services" size="lg">
          View Services
          <ArrowRight className="size-[1.1rem]" aria-hidden />
        </ButtonLink>
        <ButtonLink href={quoteHref({ type: "help" })} size="lg" variant="ghost-light">
          Help Me Choose
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
