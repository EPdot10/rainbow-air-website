import { TBC, type Project, type SystemSolution } from "./types";
import type { ImageKey } from "./images";
import { routes } from "./site";

/**
 * Page copy, organised by page (Australian English).
 * Client-supplied wording is marked "client copy". Items marked ⚠ need client
 * confirmation before public launch (see docs / project open-questions list).
 */

/* ───────────────────────── Home ───────────────────────── */

export const hero = {
  eyebrow: "Melbourne, VIC · Heating & Cooling",
  title: "Air Conditioning Installation & VEU Discount Upgrades in Melbourne",
  slogan: "Better Air. Better Living.",
  body: "From VEU discount applications to new installations, replacements and repairs, Rainbow Air helps Melbourne homes switch to efficient reverse cycle heating and cooling. Replacing gas ducted heating? Check whether you may be eligible for a Victorian Energy Upgrades (VEU) discount.",
  primaryCta: { label: "Our Services", href: routes.services },
  secondaryCta: { label: "Request a Quote" },
  image: "heroLivingRoom" as const,
};

/** Home-page VEU highlight (links to the VEU Discount Program page). */
export const veuStrip = {
  eyebrow: "Victorian Energy Upgrades (VEU) Program",
  title: "Replacing gas ducted heating? You may be eligible for a VEU discount.",
  body: "Take our quick eligibility check. Any discount is confirmed after assessment and shown in your written quotation.",
  cta: "Check VEU Eligibility",
  href: `${routes.veu}#eligibility`,
};

export const homeCopy = {
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
    title: "Confirm Your System & Quote",
    body: "We'll contact you about your home, arrange a site assessment where needed and provide a written quotation.",
  },
  {
    step: "03",
    icon: "calendar",
    title: "Schedule Your Installation",
    body: "Once the quotation and scope of work are confirmed, we'll agree on an installation time with you.",
  },
] as const;

/**
 * Home showcase sections.
 * Reviews are SAMPLE placeholders ("Robot" names, cartoon avatars) until the client supplies
 * real, verifiable reviews. Commercial images are illustrative stock photography.
 */
export const homeShowcase = {
  /** Team introduction (replaces Commercial Projects, v0.5.0). ⚠ Experience figures = team experience, to be substantiated. */
  team: {
    eyebrow: "Our Team",
    title: "Experienced Heating & Cooling Specialists",
    body: "The Rainbow Air team has been working in Melbourne's heating and cooling industry since 2010. Over that time our installers have completed thousands of projects – from single-room split systems to whole-home ducted upgrades and commercial VRF systems – so we know how to choose, install and look after the right system for each property.",
    stats: [
      { value: "Since 2010", label: "Team experience in heating & cooling" },
      { value: "10,000+", label: "VEU air conditioning installations" },
      { value: "All major brands", label: "Supplied and installed" },
    ],
    cta: "About Rainbow Air",
  },
  reviews: {
    eyebrow: "Customer Reviews",
    title: "What Our Customers Say",
    subtitle: "Feedback from Melbourne homeowners.",
  },
  brands: {
    eyebrow: "Brands We Install",
    /** Client copy. ⚠ Licences to be confirmed (licence numbers recommended on the About page). */
    title: "Fully Licensed Plumbing & Electrical Installers for All Major AC Brands",
    note: "Brand names and logos are trademarks of their respective owners.",
  },
};

/** System types the team installs (home "Our Team" section). */
export const installTypes: { id: string; title: string; type: string; image: ImageKey }[] = [
  { id: "t1", title: "Split Systems", type: "Residential", image: "splitLivingRoom" },
  { id: "t2", title: "Ducted Systems", type: "Residential", image: "galleryDuctedOutlet" },
  { id: "t3", title: "Multi-Split Systems", type: "Residential", image: "multiOutdoorUnits" },
  { id: "t4", title: "Commercial & VRF Systems", type: "Commercial", image: "commercialOffice" },
];

/** SAMPLE reviews (client decision 2026-11-15) – "Robot" names until real reviews are supplied. */
export const sampleReviews = [
  {
    id: "r1",
    name: "Robot 1",
    detail: "VEU gas ducted replacement",
    quote:
      "We finally replaced our old gas ducted heater. The team checked our eligibility first, explained how the VEU discount would show on the quote, and the new system was running by the end of the day.",
  },
  {
    id: "r2",
    name: "Robot 2",
    detail: "Split system installation",
    quote:
      "Quick to respond and easy to deal with. They helped us pick the right size unit for the main bedroom and left everything clean.",
  },
  {
    id: "r3",
    name: "Robot 3",
    detail: "Multi-split, 3 rooms",
    quote:
      "We wanted separate control for three rooms without three outdoor units. The multi-split option was explained clearly and the install was tidy.",
  },
  {
    id: "r4",
    name: "Robot 4",
    detail: "Replacement",
    quote:
      "Our old air conditioner gave up in the middle of summer. Rainbow Air came out quickly, gave us a clear written quote and had the replacement in within the week.",
  },
  {
    id: "r5",
    name: "Robot 5",
    detail: "Repair",
    quote:
      "Honest advice – they told us a repair made more sense than a new unit for now. Really appreciated that.",
  },
  {
    id: "r6",
    name: "Robot 6",
    detail: "Ducted reverse cycle",
    quote:
      "From the site visit to the final handover, we always knew who to call. The ducted system is quiet and heats the whole house well.",
  },
  {
    id: "r7",
    name: "Robot 7",
    detail: "VEU upgrade",
    quote:
      "The VEU paperwork sounded complicated but they handled it and the discount was already applied in our quote. Would recommend to friends.",
  },
];

/** Bottom brand strip (client list). Logos: official files via Wikimedia Commons. */
export const brandLogos: { name: string; image: ImageKey }[] = [
  { name: "Midea", image: "logoMidea" },
  { name: "Daikin", image: "logoDaikin" },
  { name: "Mitsubishi Heavy Industries", image: "logoMhi" },
  { name: "Mitsubishi Electric", image: "logoMitsubishiElectric" },
  { name: "Rinnai", image: "logoRinnai" },
  { name: "Fujitsu", image: "logoFujitsu" },
];

/* ───────────────────────── Our Services ───────────────────────── */

export const servicesCopy = {
  hero: {
    eyebrow: "Our Services",
    title: "Heating & Cooling Services for Melbourne Homes",
    body: "From VEU rebate heating upgrades to new installations, replacements and repairs – one team looks after your project from the first assessment to aftercare.",
    image: "splitLivingRoom" as const,
  },
  list: {
    eyebrow: "What We Do",
    title: "Our Services",
    subtitle: "Choose the service that fits your home, or talk to us and we'll recommend the right option.",
  },
  how: {
    eyebrow: "How We Work",
    title: "A Clear Process, Start to Finish",
    subtitle: "No guesswork – you'll know the equipment, scope and price before any work begins.",
  },
  why: {
    eyebrow: "Why Rainbow Air",
    title: "Why Homeowners Choose Us",
    link: "More about Rainbow Air",
  },
  systems: {
    eyebrow: "Systems",
    title: "Which System Suits Your Home?",
    subtitle: "A quick comparison of the three main types of reverse cycle heating and cooling.",
  },
  help: {
    title: "Not Sure Which System Yet? We Can Help You Choose",
    body: "Tell us which rooms need heating or cooling and what you currently use at home. We'll recommend a suitable system and let you know whether a site assessment is needed.",
    cta: "Help Me Choose",
  },
};

export const services = [
  {
    id: "veu",
    featured: true,
    title: "Government Rebate Heating Upgrade (VEU)",
    summary:
      "Replace your gas ducted heating with an efficient reverse cycle air conditioner and let us handle the Victorian Energy Upgrades (VEU) process. Working with our VEU Accredited Provider partner, we assess your eligibility, look after the program paperwork, install your new system and make sure the discount is applied directly to your quote.",
    steps: ["Eligibility check", "VEU paperwork", "Installation", "Rebate applied in your quote"],
    primary: { label: "Check VEU Eligibility", href: `${routes.veu}#eligibility` },
    quoteItem: "Government Rebate Heating Upgrade (VEU)",
  },
  {
    id: "new",
    title: "New Air Conditioning Installation",
    summary:
      "Adding heating and cooling to a room or the whole home? We'll recommend split, multi-split or ducted options to suit your layout and budget, then install it properly.",
    quoteItem: "New Installation",
  },
  {
    id: "replacement",
    title: "Air Conditioner Replacement",
    summary:
      "Old system failing or costly to run? We remove the existing unit and replace it with an efficient modern system sized for your space.",
    quoteItem: "Replacement",
  },
  {
    id: "repair",
    title: "Air Conditioning Repairs",
    summary:
      "System not heating, cooling or running as it should? Tell us what's happening and we'll arrange an inspection and a clear repair quote.",
    quoteItem: "Repair",
  },
] as const;

export const serviceSteps = [
  { step: "01", title: "Enquiry", body: "Tell us about your home, your current system and what you'd like to achieve." },
  { step: "02", title: "Assessment & Quote", body: "We confirm suitability (including VEU eligibility where relevant) and send a written quotation with a defined scope." },
  { step: "03", title: "Installation", body: "Our team installs and commissions your system, with attention to the details that matter." },
  { step: "04", title: "Aftercare", body: "One clear point of contact for warranty questions and installation-related support." },
] as const;

export const serviceWhy = [
  { title: "VEU upgrades made easy", body: "We work with a VEU Accredited Provider and handle the process for you – any eligible discount is shown in your quote." },
  { title: "Clear, written quotes", body: "Equipment, scope and price confirmed before work begins – no surprises." },
  { title: "One team, start to finish", body: "From assessment and installation to aftercare." },
] as const;

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
      "Delivers air to multiple rooms through ductwork – a common replacement for gas ducted heating. Suitability depends on roof space, layout and zoning needs.",
    image: "wholeHomeExterior",
    bestFor: ["Whole-home comfort", "Replaces gas ducted heating", "Optional zoning"],
    enquiryValue: "Ducted Air Conditioning – help me choose",
  },
];

/* ───────────────────────── VEU Discount Program ───────────────────────── */

export const veuPage = {
  hero: {
    eyebrow: "Victorian Energy Upgrades (VEU)",
    title: "VEU Air Conditioning Discount in Victoria",
    body: "The Victorian Energy Upgrades (VEU) program offers Victorian households discounts on approved energy-efficient products. Replacing gas heating with a high-efficiency reverse cycle air conditioner is one of the biggest VEU discounts available – and we apply it for homes across Melbourne.",
    image: "galleryDuctedOutlet" as const,
  },
  intro: {
    eyebrow: "About the Program",
    title: "What Is the VEU Program?",
    points: [
      {
        title: "A Victorian Government program",
        body: "VEU offers discounts on approved energy-efficient products to help Victorians lower their energy bills.",
      },
      {
        title: "Gas heating → reverse cycle",
        body: "Households can receive a discount when they remove and replace a gas heater – including whole-home gas ducted heating – with an approved high-efficiency reverse cycle air conditioner.",
      },
      {
        title: "Discount applied through an Accredited Provider",
        body: "You don't apply to the government yourself. VEU discounts are applied by an Accredited Provider – Rainbow Air works with our Accredited Provider partner to handle the program requirements and apply the discount to your quote.",
      },
      {
        title: "Old gas heater disconnected",
        body: "For this upgrade, your existing gas ducted heater is decommissioned (disconnected) as part of the installation.",
      },
      {
        title: "New system installed, rebate applied",
        body: "We install your new high-efficiency reverse cycle air conditioner and the VEU rebate is applied to your price – no claim forms for you to lodge.",
      },
    ],
    officialCta: "For more details, view the Victorian Government's official VEU program website",
    officialHref: "https://www.energy.vic.gov.au/households/victorian-energy-upgrades-for-households/heating-and-cooling",
  },
  check: {
    eyebrow: "VEU Eligibility Check",
    title: "Is Your Home Eligible for a VEU Rebate?",
    subtitle: "Answer a few quick questions. It takes about a minute and helps us understand whether a VEU upgrade may suit your home.",
  },
  /** Short FAQ under the questionnaire (also marked up as FAQPage for search engines). */
  faq: {
    eyebrow: "VEU FAQ",
    title: "VEU Discount – Common Questions",
    items: [
      {
        q: "What is the VEU discount?",
        a: "It is a Victorian Government incentive under the Victorian Energy Upgrades (VEU) program. It lowers the upfront cost of approved energy-efficient products, including high-efficiency reverse cycle air conditioners that both heat and cool.",
      },
      {
        q: "Who can get the VEU heating and cooling discount?",
        a: "Victorian households can access the discount when an approved high-efficiency reverse cycle air conditioner is installed through an Accredited Provider. Program conditions apply – for example, renters usually need their landlord's approval. Our eligibility check helps us confirm your situation.",
      },
      {
        q: "How much is the VEU discount?",
        a: "It depends on your existing heater, the size and model of the new system, and current program settings. We confirm the amount after assessment and show it clearly in your written quotation.",
      },
      {
        q: "Do I need to apply to the government myself?",
        a: "No. Rainbow Air and our VEU Accredited Provider partner handle the program paperwork, and the discount is applied directly to your quote.",
      },
      {
        q: "Does my old gas heater have to be removed?",
        a: "For a gas heating replacement, your existing gas heater is decommissioned (disconnected) as part of the installation. We explain what this involves before any work starts.",
      },
    ],
  },
  /** Client copy – shown under the final Submit button. */
  disclaimerTitle: "VEU Rebate Disclaimer:",
  disclaimer:
    "This offer requires your existing gas ducted heater to be disconnected as part of the upgrade. Submitting an enquiry does not guarantee VEU rebate eligibility. Eligibility is subject to assessment and applicable VEU program requirements.",
};

/* ───────────────────────── Service Areas & Projects ───────────────────────── */

export const projectsCopy = {
  hero: {
    eyebrow: "Service Areas & Projects",
    title: "Where We Work",
    body: "Rainbow Air installs, replaces and repairs air conditioning for homes across Melbourne and surrounding areas. Include your suburb or postcode when you enquire and we'll confirm whether we can visit.",
    image: "galleryOutdoorPaved" as const,
  },
  areas: {
    title: "Service Area",
    summary: "Servicing Melbourne metro and surrounding areas.",
    mainTitle: "Main service areas",
    /** ⚠ Interim list – to be confirmed by the client. Suburb names stay in English in every language. */
    suburbs: [
      "Melbourne CBD", "Box Hill", "Burwood", "Camberwell", "Hawthorn",
      "Kew", "Doncaster", "Ringwood", "Glen Waverley", "Mount Waverley",
      "Oakleigh", "Clayton", "Springvale", "Dandenong", "Narre Warren",
      "Berwick", "Caulfield", "Bentleigh", "Brighton", "Point Cook",
    ],
    note: "Not sure whether we cover your area? Send us an enquiry with your suburb or postcode and our team will confirm with you.",
    cta: "Send an Enquiry",
  },
  gallery: {
    eyebrow: "Projects",
    title: "Melbourne Installation Projects",
    subtitle: "Air conditioning installation solutions for Melbourne homes.",
    similarCta: "Request a Quote",
    servicesCta: "View Our Services",
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

/* ───────────────────────── About & Aftercare ───────────────────────── */

export const aboutCopy = {
  hero: {
    eyebrow: "About & Aftercare",
    title: "About Rainbow Air",
    body: "Rainbow Air provides air conditioning advice, equipment supply, installation, replacement and repairs for Melbourne homes – and, working with a VEU Accredited Provider, helps households upgrade from gas heating with the Victorian Energy Upgrades discount.",
    image: "galleryModernHome" as const,
  },
  company: { title: "Company Information" },
  why: {
    eyebrow: "Why Rainbow Air",
    title: "Why Choose Rainbow Air?",
  },
  aftercare: {
    eyebrow: "Aftercare",
    title: "Equipment Warranty & Installation Aftercare",
    cta: "Contact Aftercare",
    note: "Need help after your installation? Email us at {email} – we reply within 24 hours on business days.",
  },
};

/**
 * Company highlights (client, 2026-11-15) shown as one merged block.
 * ⚠ The first two need substantiation: the company's ABN became active in Oct 2026, so the wording
 * refers to the team's experience. Confirm accuracy with the client before public launch.
 */
export const companyHighlights = [
  { stat: "Since 2010", label: "Our team has been installing heating & cooling since 2010" },
  { stat: "10,000+", label: "VEU air conditioning installations completed by our team" },
  { stat: "Worry-free", label: "We understand customer and VEU program requirements, with aftercare you can rely on" },
  { stat: "No hidden fees", label: "Fair pricing – your written quote shows what you pay" },
];

/** Client copy – "Why Choose Rainbow Air?" */
export const benefits = [
  { icon: "fit", title: "The Right Fit", body: "Solutions shaped around your home, not a one-size-fits-all package." },
  { icon: "quote", title: "No Guesswork", body: "Clear quotes and a defined scope before work begins." },
  { icon: "care", title: "Done with Care", body: "Thoughtful installation, with attention to the details that matter." },
  { icon: "contact", title: "One Clear Contact", body: "A straightforward point of contact from planning to aftercare." },
  { icon: "rebate", title: "Rebate Guidance", body: "Help understanding VEU options and eligibility requirements." },
] as const;

/** Client copy – "Equipment Warranty & Installation Aftercare" */
export const aftercarePoints = [
  { icon: "shield", title: "Know Your Cover", body: "Understand the manufacturer's warranty for your specific system." },
  { icon: "alert", title: "Installation Concerns?", body: "Tell us what happened, and we'll help clarify the next steps." },
  { icon: "compass", title: "Support That Makes Sense", body: "Clear guidance on whether to contact Rainbow Air or the manufacturer." },
  { icon: "clipboard", title: "Help Us Help You", body: "Have your installation details and a brief description of the issue ready." },
] as const;

/* ───────────────────────── Contact ───────────────────────── */

export const contactCopy = {
  hero: {
    eyebrow: "Contact Us",
    title: "Get in Touch",
    body: "Send an online enquiry below, call us, or message us on social media. We'll confirm the service area, system and the information needed for a quotation.",
  },
  details: { title: "Contact Details" },
  social: { title: "Follow & message us" },
};

export const pendingValue = TBC;
