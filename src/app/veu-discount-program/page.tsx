import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { veuPage } from "@/data/content";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VeuIntro } from "@/components/veu/VeuIntro";
import { VeuQuestionnaire } from "@/components/veu/VeuQuestionnaire";

export const metadata: Metadata = {
  title: "VEU Discount Program",
  description:
    "Replacing gas ducted heating in Victoria? Learn how the Victorian Energy Upgrades (VEU) discount works and check whether your home may be eligible.",
  alternates: { canonical: "/veu-discount-program/" },
};

/** 3. VEU Discount Program – plain-English intro, official link, eligibility questionnaire (Demo Mode). */
export default function VeuPage() {
  const h = veuPage.hero;
  const c = veuPage.check;
  return (
    <>
      <PageHero eyebrow={h.eyebrow} title={h.title} body={h.body} crumb="VEU Discount Program" image={h.image}>
        <ButtonLink href="#eligibility" size="lg">
          Check Eligibility
          <ArrowRight className="size-[1.1rem]" aria-hidden />
        </ButtonLink>
        <ButtonLink href="#about-veu" size="lg" variant="ghost-light">
          What is VEU?
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
