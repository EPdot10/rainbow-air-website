import type { Project, SystemSolution } from "./types";

/** Section copy and smaller content blocks for the homepage. */

export const hero = {
  eyebrow: "Melbourne Heating & Cooling",
  title: "Home Air Conditioning Installation & Replacement in Melbourne",
  slogan: "Better Air. Better Living.",
  body: "Discover Rainbow Air air conditioning solutions and featured installation packages for Melbourne homes. Whether you're installing a new system or replacing an existing heating and cooling unit, we'll help you explore suitable options and request a tailored quote.",
  primaryCta: { label: "View Packages", href: "#packages" },
  secondaryCta: { label: "Request a Quote", href: "#quote" },
  image: "heroLivingRoom" as const,
};

export const sectionCopy = {
  packages: {
    eyebrow: "Installation Packages",
    title: "Featured Air Conditioning Packages",
    subtitle:
      "Three starting points for different homes – from a single bedroom to whole-home comfort. Every package is tailored to your rooms and confirmed in a written quotation.",
  },
  solutions: {
    eyebrow: "Systems",
    title: "Find the Right Air Conditioning Solution",
    subtitle:
      "Not sure which type of system suits your home? Here's how the three main options compare.",
  },
  products: {
    eyebrow: "Products",
    title: "Explore Our Air Conditioners",
    subtitle:
      "A selection of reverse cycle systems for Melbourne homes. Compare capacities and features, then request an installed quote.",
    demoNotice:
      "Demo product data: the models below are Midea Australia reference products shown to preview this layout. They are not Rainbow Air models and will be replaced with confirmed Rainbow Air product information before launch.",
  },
  why: {
    eyebrow: "About & Aftercare",
    title: "Why Choose Rainbow Air?",
    subtitle:
      "Choosing a new heating and cooling system should be straightforward. We focus on clear advice, clear quotations and support from start to finish.",
  },
  process: {
    eyebrow: "How It Works",
    title: "From Selection to Installation",
    subtitle: "Three simple steps from your first enquiry to a comfortable home.",
  },
  projects: {
    eyebrow: "Service Areas & Projects",
    title: "Our Installation Projects",
    subtitle: "Explore air conditioning installation solutions for Melbourne homes.",
    note:
      "Images in this gallery are illustrative stock photography used for design preview. They do not show Rainbow Air projects. Real project photos will replace them once available.",
    serviceArea: "We service homes across Melbourne, Victoria. Detailed suburb coverage will be published soon.",
  },
  quote: {
    eyebrow: "Contact Us",
    title: "Get Your Air Conditioning Quote",
    body: "Tell us about your home and what you're looking for. Our team will contact you to discuss suitable options and the information needed for a quotation.",
  },
};

export const solutions: SystemSolution[] = [
  {
    id: "split",
    name: "Split System",
    description:
      "Ideal for heating and cooling individual rooms such as bedrooms, home offices and living areas.",
    image: "splitLivingRoom",
    bestFor: ["Single rooms", "Apartments & units", "Targeted comfort"],
    enquiryValue: "Split System – help me choose",
  },
  {
    id: "multi-split",
    name: "Multi-Split System",
    description:
      "Connect multiple indoor units to one outdoor unit for flexible temperature control across different rooms.",
    image: "multiOutdoorUnits",
    bestFor: ["2–4 rooms", "Limited outdoor space", "Room-by-room control"],
    enquiryValue: "Multi-Split System – help me choose",
  },
  {
    id: "ducted",
    name: "Ducted Air Conditioning",
    description:
      "A whole-home heating and cooling solution with discreet ductwork and optional zoning, subject to your home's layout and installation requirements.",
    image: "wholeHomeExterior",
    bestFor: ["Whole-home comfort", "Discreet ceiling outlets", "Optional zoning"],
    enquiryValue: "Ducted Air Conditioning – help me choose",
  },
];

export const benefits = [
  {
    icon: "ruler",
    title: "Tailored Air Conditioning Solutions",
    body: "Recommendations based on your rooms, layout and heating and cooling needs.",
  },
  {
    icon: "file",
    title: "Clear Installation Quotations",
    body: "Understand the proposed equipment, installation scope and any additional work before proceeding.",
  },
  {
    icon: "route",
    title: "From Selection to Installation",
    body: "Support throughout product selection, quotation and installation coordination.",
  },
  {
    icon: "shield",
    title: "Aftercare Support",
    body: "Information and assistance for equipment warranties and installation-related enquiries.",
  },
] as const;

export const processSteps = [
  {
    step: "01",
    icon: "message",
    title: "Tell Us What You Need",
    body: "Share your suburb, the rooms you want to heat or cool, and whether you're installing a new system or replacing an existing one.",
  },
  {
    step: "02",
    icon: "clipboard",
    title: "Choose Your System & Get a Quote",
    body: "We'll discuss your requirements, recommend suitable options and arrange a site assessment where needed.",
  },
  {
    step: "03",
    icon: "calendar",
    title: "Schedule Your Installation",
    body: "Once the quotation and scope are confirmed, we'll coordinate a suitable installation time.",
  },
] as const;

/** ILLUSTRATIVE gallery – stock imagery only, no client names, suburbs or dates. */
export const projects: Project[] = [
  { id: "p1", status: "demo", title: "Wall-mounted split system", category: "Split System", image: "galleryWallUnit", wide: true },
  { id: "p2", status: "demo", title: "Outdoor unit placement", category: "Outdoor Unit", image: "galleryOutdoorPaved" },
  { id: "p3", status: "demo", title: "Ducted ceiling outlet", category: "Ducted", image: "galleryDuctedOutlet" },
  { id: "p4", status: "demo", title: "Installation detail", category: "Installation", image: "galleryInstallDetail" },
  { id: "p5", status: "demo", title: "Compact outdoor unit", category: "Outdoor Unit", image: "galleryOutdoorGarden" },
  { id: "p6", status: "demo", title: "Comfort in a modern home", category: "Living Areas", image: "galleryModernHome", wide: true },
];

export const illustrativeLabel = "Illustrative Installation Image";

export const veu = {
  eyebrow: "Victorian Energy Upgrades",
  title: "Considering an Air Conditioning Upgrade?",
  body: [
    "Replacing an older heating or cooling system? Your project may be eligible for a discount under the Victorian Energy Upgrades (VEU) program, depending on the existing equipment, selected system and applicable program requirements.",
    "Eligibility and any available discount must be confirmed before a final quotation is issued.",
  ],
  cta: "Ask About VEU Eligibility",
  officialInfo: {
    label: "About the VEU program (Victorian Government)",
    href: "https://www.energy.vic.gov.au/victorian-energy-upgrades",
  },
};
