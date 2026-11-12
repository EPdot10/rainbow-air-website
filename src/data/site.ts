import { TBC, type NavItem } from "./types";

/**
 * Brand, contact, navigation and social settings.
 * Anything marked To Be Confirmed must be supplied by Rainbow Air before launch.
 */

export const routes = {
  home: "/",
  installation: "/air-conditioning-installation/",
  projects: "/service-areas-projects/",
  about: "/about-aftercare/",
  contact: "/contact/",
} as const;

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
    insurance: TBC,
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
  { label: "Home", href: routes.home },
  { label: "Air Conditioning Installation", href: routes.installation },
  { label: "Service Areas & Projects", href: routes.projects },
  { label: "About & Aftercare", href: routes.about },
  { label: "Contact Us", href: routes.contact },
];

export interface FooterLink {
  label: string;
  href?: string;
  /** Pages not yet written are shown as "Coming soon" instead of linking to placeholder content. */
  comingSoon?: boolean;
}

export const footerQuickLinks: FooterLink[] = [
  { label: "About Us", href: routes.about },
  { label: "Privacy Policy", comingSoon: true },
  { label: "Terms and Conditions", comingSoon: true },
  { label: "Quick Enquiry", href: `${routes.contact}#enquiry` },
];

/** Short, factual points under the hero. No unverified claims (experience, licences, warranties). */
export const heroHighlights = [
  "Split, multi-split & ducted systems",
  "New installations & replacements",
  "Serving homes across Melbourne",
];

/**
 * Social channels for the floating social button.
 * `href: null` until Rainbow Air confirms the account – the item then shows "Account coming soon".
 * `color` follows the logo's rainbow sequence.
 */
export interface SocialChannel {
  id: "xiaohongshu" | "instagram" | "wechat" | "facebook";
  label: string;
  href: string | null;
  /** WeChat has no public profile URL – show the WeChat ID instead. */
  handle?: string;
  color: string;
}

export const socialChannels: SocialChannel[] = [
  { id: "xiaohongshu", label: "Xiaohongshu (RED)", href: null, color: "#e8231b" },
  { id: "instagram", label: "Instagram", href: null, color: "#f7801e" },
  { id: "wechat", label: "WeChat", href: null, handle: TBC, color: "#3cb44a" },
  { id: "facebook", label: "Facebook", href: null, color: "#1450b4" },
];
