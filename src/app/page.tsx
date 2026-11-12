import type { Metadata } from "next";
import { homeCopy } from "@/data/content";
import { Hero } from "@/components/sections/Hero";
import { VeuStrip } from "@/components/sections/VeuStrip";
import { FeaturedPackages } from "@/components/sections/FeaturedPackages";
import { InstallationProcess } from "@/components/sections/InstallationProcess";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = { alternates: { canonical: "/" } };

/** 1. Home – hero, VEU highlight, featured packages, how it works, contact call-to-action. */
export default function HomePage() {
  const c = homeCopy.cta;
  return (
    <>
      <Hero />
      <VeuStrip />
      <FeaturedPackages />
      <InstallationProcess />
      <CtaBand title={c.title} body={c.body} primary={c.primary} secondary={c.secondary} />
    </>
  );
}
