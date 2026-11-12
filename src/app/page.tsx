import type { Metadata } from "next";
import { homeCopy } from "@/data/content";
import { Hero } from "@/components/sections/Hero";
import { FeaturedPackages } from "@/components/sections/FeaturedPackages";
import { InstallationProcess } from "@/components/sections/InstallationProcess";
import { BrandsPartners, CommercialProjects, CustomerReviews } from "@/components/sections/HomeShowcase";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = { alternates: { canonical: "/" } };

/**
 * 1. Home – hero (with VEU card), featured packages, how it works, commercial projects,
 * customer reviews, brands & partners, contact call-to-action.
 * Reviews / partners / brands / commercial projects are labelled SAMPLE placeholders.
 */
export default function HomePage() {
  const c = homeCopy.cta;
  return (
    <>
      <Hero />
      <FeaturedPackages />
      <InstallationProcess />
      <CommercialProjects />
      <CustomerReviews />
      <BrandsPartners />
      <CtaBand title={c.title} body={c.body} primary={c.primary} secondary={c.secondary} />
    </>
  );
}
