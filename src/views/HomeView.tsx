import type { Locale } from "@/lib/locale";
import { getDict, setRequestLocale } from "@/i18n/server";
import { Hero } from "@/components/sections/Hero";
import { InstallationProcess } from "@/components/sections/InstallationProcess";
import { BrandStrip, CustomerReviews, TeamIntro } from "@/components/sections/HomeShowcase";
import { CtaBand } from "@/components/sections/CtaBand";


/** Reviews are hidden until the client supplies real customer reviews (fill homeShowcase.reviews, then set true). */
const SHOW_REVIEWS = false;
/** 1. Home – hero (VEU card), how it works, our team, reviews carousel, call-to-action, brand strip. */
export function HomeView({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const c = getDict().c.homeCopy.cta;
  return (
    <>
      <Hero />
      <InstallationProcess />
      <TeamIntro />
      {SHOW_REVIEWS && <CustomerReviews />}
      <CtaBand title={c.title} body={c.body} primary={c.primary} secondary={c.secondary} />
      <BrandStrip />
    </>
  );
}
