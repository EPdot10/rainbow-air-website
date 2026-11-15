import type { Metadata } from "next";
import { homeCopy } from "@/data/content";
import { Hero } from "@/components/sections/Hero";
import { InstallationProcess } from "@/components/sections/InstallationProcess";
import { BrandStrip, CommercialProjects, CustomerReviews } from "@/components/sections/HomeShowcase";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = { alternates: { canonical: "/" } };

/**
 * 1. Home – hero (with VEU card), how it works, commercial projects (illustrative),
 * customer reviews carousel (SAMPLE), contact call-to-action, brands strip above the footer.
 * Packages & product showcase were removed in v0.4.0 (see src/archive/packages-products).
 */
export default function HomePage() {
  const c = homeCopy.cta;
  return (
    <>
      <Hero />
      <InstallationProcess />
      <CommercialProjects />
      <CustomerReviews />
      <CtaBand title={c.title} body={c.body} primary={c.primary} secondary={c.secondary} />
      <BrandStrip />
    </>
  );
}
