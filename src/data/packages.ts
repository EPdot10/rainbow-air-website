import type { InstallPackage } from "./types";

/**
 * DEMO INSTALLATION PACKAGES.
 *
 * Package structure is a proposal for the client to review. Pricing, equipment,
 * unit counts, installation scope and old-unit removal policy are NOT confirmed.
 * `price` stays null until confirmed – the UI then shows "Request a Quote".
 */

export const packages: InstallPackage[] = [
  {
    id: "single-room-comfort",
    status: "demo",
    label: "Package A",
    name: "Single Room Comfort",
    tagline: "Efficient heating and cooling for the room you use most.",
    systemType: "Split System",
    suitableFor: "Bedrooms, home offices and smaller living spaces",
    highlights: [
      { label: "System", value: "Wall-mounted split system" },
      { label: "Example capacity", value: "2.6 kW – 3.5 kW size class" },
      { label: "Indoor units", value: "1" },
    ],
    installScope: [
      "Site check of indoor and outdoor unit positions",
      "Standard back-to-back style installation",
      "System commissioning and handover",
    ],
    price: null,
    image: "mideaEos",
    imageCaption: "Shown: Midea EOS Series (reference model)",
    referenceProductIds: ["midea-eos-35", "midea-breezeless-35"],
  },
  {
    id: "multi-room-comfort",
    status: "demo",
    label: "Package B",
    name: "Multi-Room Comfort",
    tagline: "Separate temperature control for several rooms, one outdoor unit.",
    systemType: "Multi-Split System",
    suitableFor: "Homes that need individual control across 2–4 rooms",
    highlights: [
      { label: "System", value: "Multi-split, one outdoor unit" },
      { label: "Indoor units (example)", value: "2 to 4 rooms" },
      { label: "Example outdoor unit", value: "7.1 kW cooling / 8.0 kW heating" },
    ],
    installScope: [
      "Room-by-room sizing discussion",
      "Indoor unit and pipework route planning",
      "Commissioning of each indoor unit",
    ],
    price: null,
    image: "mideaMulti",
    imageCaption: "Shown: Midea MULTI Series outdoor unit (reference model)",
    referenceProductIds: ["midea-multi-0371"],
  },
  {
    id: "whole-home-comfort",
    status: "demo",
    label: "Package C",
    name: "Whole Home Comfort",
    tagline: "Discreet, whole-home heating and cooling through ceiling outlets.",
    systemType: "Ducted Air Conditioning",
    suitableFor: "Homes wanting a central system with optional zoning",
    highlights: [
      { label: "System", value: "Ducted reverse cycle" },
      { label: "Example capacity range", value: "7 kW – 17 kW size class" },
      { label: "Zoning", value: "Optional, subject to layout" },
    ],
    installScope: [
      "Roof-space and layout assessment",
      "Duct design and outlet placement",
      "Controller set-up and handover",
    ],
    price: null,
    image: "mideaDuctedRac",
    imageCaption: "Shown: Midea Ducted Series – RAC (reference model)",
    referenceProductIds: ["midea-ducted-rac-90", "midea-vesta-140"],
  },
];

/** Disclosure shown beneath the package cards (wording supplied in the brief). */
export const packageDisclosure = [
  "Standard installation inclusions and exclusions will be confirmed in your written quotation.",
  "Additional work such as extended pipework, difficult access or electrical upgrades may incur extra costs.",
];
