import type { Metadata } from "next";
import { homeCopy } from "@/data/content";
import { Hero } from "@/components/sections/Hero";
import { FeaturedPackages } from "@/components/sections/FeaturedPackages";
import { InstallationProcess } from "@/components/sections/InstallationProcess";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = { alternates: { canonical: "/" } };

/** 1. Home – hero, featured packages, how it works, contact call-to-action. */
export default function HomePage() {
  const c = homeCopy.cta;
  return (
    <>
      <Hero />
      <FeaturedPackages />
      <InstallationProcess />
      <CtaBand title={c.title} body={c.body} primary={c.primary} secondary={c.secondary} />
    </>
  );
}
