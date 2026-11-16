import launch from "./launch.json";
import { TBC, type NavItem } from "./types";

/**
 * Brand, company, contact, navigation and social settings.
 * Anything marked To Be Confirmed must be supplied by Rainbow Air before launch.
 */

export const routes = {
  home: "/",
  services: "/our-services/",
  veu: "/veu-discount-program/",
  projects: "/service-areas-projects/",
  about: "/about-aftercare/",
  contact: "/contact/",
  privacy: "/privacy-policy/",
  terms: "/terms-and-conditions/",
} as const;

export const site = {
  name: "Rainbow Air",
  slogan: "Better Air. Better Living.",
  descriptor: "Heating & Cooling",
  /** Canonical site address – switches to rainbowair.com.au when launch.json says launched. */
  url: launch.launched ? launch.productionUrl : launch.stagingUrl,
  locale: "en_AU",
  seo: {
    title: "Rainbow Air | Air Conditioning Installation Melbourne",
    description:
      "VEU-discounted air conditioning, new installations, replacements and repairs for Melbourne homes. Check your VEU eligibility and request a quote from Rainbow Air.",
    /** Search engines allowed only after launch (src/data/launch.json). */
    indexable: launch.launched,
  },
  intro:
    "Rainbow Air helps Melbourne households upgrade to efficient reverse cycle air conditioning – from VEU discount applications to installation, replacement and repairs.",
  contact: {
    /** Owner's mobile for now (client instruction, 2026-11-15). */
    phone: "0433 600 166",
    email: "info@rainbowair.com.au",
    serviceArea: "Melbourne & surrounding areas, Victoria",
    hours: TBC,
  },
  company: {
    legalName: "Rainbow Heating and Cooling Pty Ltd",
    acn: "703 700 985",
    abn: "73 703 700 985",
    licence: TBC,
    insurance: TBC,
    /** VEU Accredited Provider number – to be supplied. */
    veuAccreditation: TBC,
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

export const telHref = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`;

export const mainNav: NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "Our Services", href: routes.services },
  { label: "VEU Discount Program", href: routes.veu },
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
  { label: "Privacy Policy", href: routes.privacy },
  { label: "Terms and Conditions", href: routes.terms },
  { label: "Quick Enquiry", href: `${routes.contact}#enquiry` },
];

/** Short, factual points under the hero. */
export const heroHighlights = [
  "VEU discount applications",
  "New installations & replacements",
  "Serving Melbourne & surrounds",
];

/**
 * Floating contact button + Contact page social rows.
 * Brand items use official platform icons (simple-icons, CC0) in each platform's own brand colour.
 *  - `href: null` → account not confirmed yet; shown as "coming soon".
 *  - phone / email become tap-to-call / tap-to-email links automatically from `value`.
 *  - WeChat has no public profile URL – set `value` to the WeChat ID.
 */
export interface SocialChannel {
  id: "rednote" | "phone" | "wechat" | "whatsapp" | "facebook" | "email";
  label: string;
  href: string | null;
  value?: string;
  color: string;
  /** Icon colour on top of the ball. */
  ink?: string;
}

export const socialChannels: SocialChannel[] = [
  { id: "rednote", label: "RedNote", href: "https://xhslink.cn/o/68M4U64cBJe", color: "#ff2442" },
  { id: "phone", label: "Phone", href: null, value: site.contact.phone, color: "#fbd40a", ink: "#03224f" },
  { id: "wechat", label: "WeChat", href: null, value: TBC, color: "#07c160" },
  { id: "whatsapp", label: "WhatsApp", href: null, color: "#25d366" },
  { id: "facebook", label: "Facebook", href: null, color: "#0866ff" },
  { id: "email", label: "Email", href: null, value: site.contact.email, color: "#4a3aa8" },
];
