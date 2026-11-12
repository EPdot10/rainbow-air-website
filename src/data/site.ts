import { TBC, type NavItem } from "./types";

/**
 * Brand, contact and navigation settings.
 * Anything marked To Be Confirmed must be supplied by Rainbow Air before launch.
 */

export const site = {
  name: "Rainbow Air",
  slogan: "Better Air. Better Living.",
  descriptor: "Heating & Cooling",
  /** Update to the production domain at launch (used for Open Graph URLs). */
  url: "https://rainbow-air-website.wangxcep.workers.dev",
  locale: "en_AU",
  seo: {
    title: "Rainbow Air | Air Conditioning Installation Melbourne",
    description:
      "Explore air conditioning installation and replacement solutions for Melbourne homes with Rainbow Air. Discover suitable systems and request a tailored quote.",
    /** Keep false until public launch so demo content is not indexed. */
    indexable: false,
  },
  intro:
    "Rainbow Air helps Melbourne households choose, quote and install split, multi-split and ducted heating and cooling systems.",
  contact: {
    phone: TBC,
    email: TBC,
    serviceArea: "Melbourne, Victoria",
    hours: TBC,
  },
  company: {
    legalName: TBC,
    abn: TBC,
    licence: TBC,
  },
  copyrightYear: 2026,
  logo: {
    src: "/brand/rainbow-air-logo.png",
    reversedSrc: "/brand/rainbow-air-logo-reversed.png",
    width: 640,
    height: 251,
    alt: "Rainbow Air Heating & Cooling",
  },
} as const;

export const mainNav: NavItem[] = [
  { label: "Home", href: "#top", sectionId: "top" },
  { label: "Air Conditioning Installation", href: "#solutions", sectionId: "solutions" },
  { label: "Service Areas & Projects", href: "#projects", sectionId: "projects" },
  { label: "About & Aftercare", href: "#why-rainbow-air", sectionId: "why-rainbow-air" },
  { label: "Contact Us", href: "#quote", sectionId: "quote" },
];

export interface FooterLink {
  label: string;
  href?: string;
  /** Pages not yet written are shown as "Coming soon" instead of linking to placeholder content. */
  comingSoon?: boolean;
}

export const footerQuickLinks: FooterLink[] = [
  { label: "About Us", href: "#why-rainbow-air" },
  { label: "Privacy Policy", comingSoon: true },
  { label: "Terms and Conditions", comingSoon: true },
  { label: "Quick Enquiry", href: "#quote" },
];

/** Short, factual points under the hero. No unverified claims (experience, licences, warranties). */
export const heroHighlights = [
  "Split, multi-split & ducted systems",
  "New installations & replacements",
  "Serving homes across Melbourne",
];
