import type { InstallPackage } from "./types";

/**
 * DEMO INSTALLATION PACKAGES (structure follows the client's copy document).
 *
 * Card format from the copy: "Rainbow Air [Series / full model] | [Package name]",
 * photo, indoor units & rated capacity, suitable rooms, what the package includes,
 * and what must be confirmed on site.
 *
 * Models, pricing, unit counts, inclusions and old-unit removal policy are NOT confirmed.
 * `price` stays null until confirmed – the UI then shows "Request a Quote".
 */

export const packages: InstallPackage[] = [
  {
    id: "single-room-comfort",
    status: "demo",
    label: "Package A",
    name: "Single Room Comfort",
    modelLabel: "[Rainbow Air series / model – to be confirmed]",
    tagline: "Efficient heating and cooling for the room you use most.",
    systemType: "Split System",
    suitableFor: "Bedrooms, home offices and smaller living spaces",
    highlights: [
      { label: "Indoor units", value: "1" },
      { label: "Example capacity", value: "2.6 kW – 3.5 kW size class" },
    ],
    includes: ["Indoor and outdoor unit", "Standard installation", "Old unit removal & disposal – to be confirmed"],
    siteConfirm: ["Pipework beyond the standard run", "Work at height or difficult access", "Electrical upgrades"],
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
    modelLabel: "[Rainbow Air series / model – to be confirmed]",
    tagline: "Separate temperature control for several rooms from one outdoor unit.",
    systemType: "Multi-Split System",
    suitableFor: "Homes that need individual control across 2–4 rooms",
    highlights: [
      { label: "Indoor units", value: "2 to 4 (example)" },
      { label: "Example outdoor unit", value: "7.1 kW cooling / 8.0 kW heating" },
    ],
    includes: ["One outdoor unit and the agreed indoor units", "Standard installation", "Old unit removal & disposal – to be confirmed"],
    siteConfirm: ["Pipework route between rooms", "Work at height or difficult access", "Electrical upgrades"],
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
    modelLabel: "[Rainbow Air series / model – to be confirmed]",
    tagline: "Discreet, whole-home heating and cooling through ceiling outlets.",
    systemType: "Ducted Air Conditioning",
    suitableFor: "Homes wanting a central system with optional zoning",
    highlights: [
      { label: "System", value: "Ducted reverse cycle" },
      { label: "Example capacity range", value: "7 kW – 17 kW size class" },
    ],
    includes: ["Indoor and outdoor unit", "Ductwork and ceiling outlets", "Standard installation and controller set-up"],
    siteConfirm: ["Roof-space access and layout", "Zoning requirements", "Electrical upgrades"],
    price: null,
    image: "mideaDuctedRac",
    imageCaption: "Shown: Midea Ducted Series – RAC (reference model)",
    referenceProductIds: ["midea-ducted-rac-90", "midea-vesta-140"],
  },
];

/** Shown beneath the package cards (from the client's copy document). */
export const packageDisclosure = [
  "VEU discounts depend on your existing equipment, the selected model and project eligibility. Your written quotation will show any confirmed discount and the amount payable.",
  "If on-site work goes beyond the package scope, we'll list the required work and costs in your quotation.",
];
