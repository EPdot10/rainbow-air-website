import type { Metadata } from "next";
import { homeCopy } from "@/data/content";
import { Hero } from "@/components/sections/Hero";
import { InstallationProcess } from "@/components/sections/InstallationProcess";
import { BrandStrip, CustomerReviews, TeamIntro } from "@/components/sections/HomeShowcase";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = { alternates: { canonical: "/" } };

/**
 * 1. Home – hero (with VEU card), how it works, our team, customer reviews carousel, contact call-to-action, brands strip above the footer.
 * Packages & product showcase were removed in v0.4.0 (see src/archive/packages-products).
 */
export default function HomePage() {
  const c = homeCopy.cta;
  return (
    <>
      <Hero />
      <InstallationProcess />
      <TeamIntro />
      <CustomerReviews />
      <CtaBand title={c.title} body={c.body} primary={c.primary} secondary={c.secondary} />
      <BrandStrip />
    </>
  );
}
