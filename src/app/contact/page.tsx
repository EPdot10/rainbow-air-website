import type { Metadata } from "next";
import { contactCopy } from "@/data/content";
import { PageHero } from "@/components/layout/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { SocialRow } from "@/components/social/SocialIcons";

export const metadata: Metadata = {
  title: "Contact Us & Request a Quote",
  description: "Contact Rainbow Air or send an online enquiry for air conditioning installation in Melbourne.",
  alternates: { canonical: "/contact/" },
};

/** 6. Contact Us – compact hero with social icons, then the online enquiry form (#enquiry) and contact details. */
export default function ContactPage() {
  const h = contactCopy.hero;
  return (
    <>
      <PageHero compact eyebrow={h.eyebrow} title={h.title} body={h.body} crumb="Contact Us" extra={<SocialRow tone="light" />} />
      <ContactSection />
    </>
  );
}
