import type { Metadata } from "next";
import { aboutCopy } from "@/data/content";
import { quoteHref } from "@/lib/quote";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { CompanyInfo, Aftercare } from "@/components/sections/AboutSections";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

export const metadata: Metadata = {
  title: "About & Aftercare",
  description: "About Rainbow Air, equipment warranty and installation aftercare for Melbourne homes.",
  alternates: { canonical: "/about-aftercare/" },
};

/** 4. About & Aftercare (reviews to be added once a review source is set up). */
export default function AboutPage() {
  const h = aboutCopy.hero;
  return (
    <>
      <PageHero eyebrow={h.eyebrow} title={h.title} body={h.body} crumb="About & Aftercare" image={h.image}>
        <ButtonLink href="#aftercare" size="lg">
          Warranty & Aftercare
        </ButtonLink>
        <ButtonLink href={quoteHref({ type: "aftercare" })} size="lg" variant="ghost-light">
          {aboutCopy.aftercare.cta}
        </ButtonLink>
      </PageHero>
      <CompanyInfo />
      <WhyChooseUs />
      <Aftercare />
    </>
  );
}
