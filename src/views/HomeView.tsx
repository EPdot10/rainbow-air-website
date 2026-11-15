import type { Locale } from "@/lib/locale";
import { getDict, setRequestLocale } from "@/i18n/server";
import { Hero } from "@/components/sections/Hero";
import { InstallationProcess } from "@/components/sections/InstallationProcess";
import { BrandStrip, CustomerReviews, TeamIntro } from "@/components/sections/HomeShowcase";
import { CtaBand } from "@/components/sections/CtaBand";

/** 1. Home – hero (VEU card), how it works, our team, reviews carousel, call-to-action, brand strip. */
export function HomeView({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const c = getDict().c.homeCopy.cta;
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
