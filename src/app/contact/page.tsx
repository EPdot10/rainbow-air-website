import type { Metadata } from "next";
import { contactCopy } from "@/data/content";
import { PageHero } from "@/components/layout/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us & Request a Quote",
  description: "Contact Rainbow Air or send an online enquiry for air conditioning installation in Melbourne.",
  alternates: { canonical: "/contact/" },
};

/** 5. Contact & Quote – static details + online enquiry form (#enquiry). */
export default function ContactPage() {
  const h = contactCopy.hero;
  return (
    <>
      <PageHero eyebrow={h.eyebrow} title={h.title} body={h.body} crumb="Contact Us" />
      <ContactSection />
    </>
  );
}
