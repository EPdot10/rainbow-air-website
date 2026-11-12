import { TBC, type Project, type SystemSolution } from "./types";

/**
 * Page copy, organised by page. Wording follows the client's copy document
 * ("Rainbow Air｜首版网站文案"), translated to Australian English.
 * Bracketed client placeholders are shown as "To Be Confirmed" until supplied.
 */

/* ───────────────────────── 1. Home ───────────────────────── */

export const hero = {
  eyebrow: "Melbourne Heating & Cooling",
  title: "Home Air Conditioning Installation & Replacement in Melbourne",
  slogan: "Better Air. Better Living.",
  body: "Shop Rainbow Air air conditioners and explore our featured installation packages. Replacing an old heating or cooling system at home? You can also check whether your project may be eligible for a Victorian Energy Upgrades (VEU) discount.",
  primaryCta: { label: "View Packages", href: "#packages" },
  secondaryCta: { label: "Request a Quote" },
  image: "heroLivingRoom" as const,
};

export const homeCopy = {
  packages: {
    eyebrow: "Installation Packages",
    title: "Featured Air Conditioning Packages",
    subtitle:
      "Three starting points for different homes – from a single bedroom to whole-home comfort. Every package is confirmed in a written quotation.",
    productsLink: "Explore Our Air Conditioners",
  },
  process: {
    eyebrow: "How It Works",
    title: "From Selection to Installation",
    subtitle: "Three simple steps from your first enquiry to a comfortable home.",
    projectsLink: "View Our Projects",
  },
  cta: {
    title: "Ready to talk about your home?",
    body: "Tell us which rooms you'd like to heat or cool and we'll help you with the next step.",
    primary: "Request a Quote",
    secondary: "Contact Us",
  },
};

export const processSteps = [
  {
    step: "01",
    icon: "message",
    title: "Tell Us What You Need",
    body: "Share your suburb, the rooms you want to heat or cool, and whether it's a new installation or a replacement.",
  },
  {
    step: "02",
    icon: "clipboard",
    title: "Confirm Your Model & Quote",
    body: "We'll contact you about your home, arrange a site assessment where needed and provide a written quotation.",
  },
  {
    step: "03",
    icon: "calendar",
    title: "Schedule Your Installation",
    body: "Once the quotation and scope of work are confirmed, we'll agree on an installation time with you.",
  },
] as const;

/* ─────────────── 2. Air Conditioning Installation ─────────────── */

export const installationCopy = {
  hero: {
    eyebrow: "Air Conditioning Installation",
    title: "Choose the Right Air Conditioning for Your Rooms",
    body: "Adding air conditioning to one room, or want separate temperature control across several rooms? Tell us how you use each room, your layout and your existing system, and we'll help you compare suitable installation options.",
    image: "splitLivingRoom" as const,
  },
  systems: {
    eyebrow: "Systems",
    title: "Which System Suits Your Home?",
    subtitle: "A quick comparison of the three main types of home heating and cooling.",
  },
  products: {
    eyebrow: "Products",
    title: "Rainbow Air Air Conditioners",
    subtitle:
      "Compare rated cooling and heating capacity, key features and equipment warranty by model. Found one you like? Ask for an installed quote for your home.",
    demoNotice:
      "Demo product data: the models below are Midea Australia reference products shown to preview this layout. They are not Rainbow Air models and will be replaced with confirmed Rainbow Air product information before launch.",
    packagesLink: "View Featured Packages",
  },
  help: {
    title: "Not Sure Which Model Yet? We Can Help You Choose",
    body: "Tell us which rooms need heating or cooling and what you currently use at home. We'll contact you to recommend a suitable system and model, and let you know whether a site assessment is needed.",
    cta: "Help Me Choose",
  },
};

export const solutions: SystemSolution[] = [
  {
    id: "split",
    name: "Split System",
    description:
      "One indoor unit paired with one outdoor unit – ideal for heating and cooling a single bedroom, study or living room.",
    image: "splitLivingRoom",
    bestFor: ["Single rooms", "Apartments & units", "Targeted comfort"],
    enquiryValue: "Split System – help me choose",
  },
  {
    id: "multi-split",
    name: "Multi-Split System",
    description:
      "One outdoor unit connected to several indoor units – for homes that want separate temperature control in multiple rooms.",
    image: "multiOutdoorUnits",
    bestFor: ["2–4 rooms", "Limited outdoor space", "Room-by-room control"],
    enquiryValue: "Multi-Split System – help me choose",
  },
  {
    id: "ducted",
    name: "Ducted Air Conditioning",
    description:
      "Delivers air to multiple rooms through ductwork. Suitability depends on your roof space, home layout and zoning needs.",
    image: "wholeHomeExterior",
    bestFor: ["Whole-home comfort", "Discreet ceiling outlets", "Optional zoning"],
    enquiryValue: "Ducted Air Conditioning – help me choose",
  },
];

/** VEU block – lives on the Installation page (per the copy document). */
export const veu = {
  eyebrow: "Victorian Energy Upgrades",
  title: "Is Your Air Conditioning Upgrade Eligible for a VEU Discount?",
  body: [
    "If you're planning to replace an older heating or cooling system, tell us your suburb, your existing equipment and the rooms you'd like the new system installed in, and ask whether a Victorian Energy Upgrades (VEU) discount may apply. For eligible projects, the applicable discount will be listed in your written quotation.",
    "Eligible equipment and discount amounts depend on a project assessment.",
  ],
  /** Roles of Rainbow Air and the accredited provider – published once confirmed. */
  participation: TBC,
  cta: "Check Eligibility",
  officialInfo: {
    label: "About the VEU program (Victorian Government)",
    href: "https://www.energy.vic.gov.au/victorian-energy-upgrades",
  },
};

/* ─────────────── 3. Service Areas & Projects ─────────────── */

export const projectsCopy = {
  hero: {
    eyebrow: "Service Areas & Projects",
    title: "Check Whether We Service Your Area",
    body: "Rainbow Air installs and replaces air conditioning for homes across Melbourne. Include your suburb or postcode when you enquire and we'll confirm whether we can visit.",
    image: "galleryOutdoorPaved" as const,
  },
  areas: {
    title: "Service Area",
    mainAreas: TBC,
    suburbs: TBC,
    note: "Not sure if we cover your suburb? Send an enquiry with your suburb or postcode and we'll confirm.",
  },
  gallery: {
    eyebrow: "Projects",
    title: "Melbourne Installation Projects",
    subtitle: "Explore air conditioning installation solutions for Melbourne homes.",
    note:
      "Images in this gallery are illustrative stock photography used for design preview. They do not show Rainbow Air projects. Real project photos – with suburb, customer needs and the installed system – will replace them once available.",
    similarCta: "Enquire About a Similar Installation",
    modelsCta: "View Our Models",
  },
};

/** ILLUSTRATIVE gallery – stock imagery only, no client names, suburbs or dates. */
export const projects: Project[] = [
  { id: "p1", status: "demo", title: "Wall-mounted split system", category: "Split System", image: "galleryWallUnit", wide: true },
  { id: "p2", status: "demo", title: "Outdoor unit placement", category: "Outdoor Unit", image: "galleryOutdoorPaved" },
  { id: "p3", status: "demo", title: "Ducted ceiling outlet", category: "Ducted", image: "galleryDuctedOutlet" },
  { id: "p4", status: "demo", title: "Installation detail", category: "Installation", image: "galleryInstallDetail", wide: true },
  { id: "p5", status: "demo", title: "Compact outdoor unit", category: "Outdoor Unit", image: "galleryOutdoorGarden", wide: true },
  { id: "p6", status: "demo", title: "Comfort in a modern home", category: "Living Areas", image: "galleryModernHome" },
];

export const illustrativeLabel = "Illustrative Installation Image";

/* ─────────────── 4. About & Aftercare ─────────────── */

export const aboutCopy = {
  hero: {
    eyebrow: "About & Aftercare",
    title: "About Rainbow Air",
    body: "Rainbow Air provides air conditioning selection, equipment supply, installation and replacement for Melbourne homes. We recommend models based on how you use each room and the conditions of your home, and confirm the installation scope with you before any work begins.",
    image: "galleryModernHome" as const,
  },
  company: { title: "Company Information" },
  why: {
    eyebrow: "Why Rainbow Air",
    title: "Why Choose Rainbow Air?",
    subtitle: "Clear advice, clear quotations and support from start to finish.",
  },
  aftercare: {
    eyebrow: "Aftercare",
    title: "Equipment Warranty & Installation Aftercare",
    equipment:
      "Equipment warranty is provided according to each model's warranty terms – details are listed in the specifications for that model.",
    workmanshipLabel: "Workmanship warranty",
    workmanship: TBC,
    howTo:
      "Need help after your installation? Please provide the installation address or suburb, the installation date, and the equipment model or quotation number so we can find your records.",
    cta: "Contact Aftercare",
  },
};

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

/* ─────────────── 5. Contact & Quote ─────────────── */

export const contactCopy = {
  hero: {
    eyebrow: "Contact Us",
    title: "Tell Us Where You'd Like Air Conditioning Installed",
    body: "Fill in your contact details and installation needs. Rainbow Air will contact you to confirm the service area, model and the information needed for a quotation.",
  },
  details: { title: "Contact Details" },
  form: { title: "Online Enquiry" },
};
