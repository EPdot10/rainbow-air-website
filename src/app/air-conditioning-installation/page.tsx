import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { installationCopy } from "@/data/content";
import { quoteHref } from "@/lib/quote";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceTypes } from "@/components/sections/ServiceTypes";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { HelpMeChoose } from "@/components/sections/HelpMeChoose";
import { VeuSection } from "@/components/sections/VeuSection";

export const metadata: Metadata = {
  title: "Air Conditioning Installation",
  description:
    "Compare split, multi-split and ducted air conditioning for your Melbourne home, browse models and ask about VEU discounts.",
  alternates: { canonical: "/air-conditioning-installation/" },
};

/** 2. Air Conditioning Installation – VEU block first (client priority), then systems, models, help me choose. */
export default function InstallationPage() {
  const h = installationCopy.hero;
  return (
    <>
      <PageHero eyebrow={h.eyebrow} title={h.title} body={h.body} crumb="Air Conditioning Installation" image={h.image}>
        <ButtonLink href="#products" size="lg">
          Browse Models
          <ArrowRight className="size-[1.1rem]" aria-hidden />
        </ButtonLink>
        <ButtonLink href={quoteHref({ type: "help" })} size="lg" variant="ghost-light">
          Help Me Choose
        </ButtonLink>
      </PageHero>
      <VeuSection />
      <ServiceTypes />
      <ProductShowcase />
      <HelpMeChoose />
    </>
  );
}
