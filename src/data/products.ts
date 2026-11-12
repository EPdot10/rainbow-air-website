import { TBC, type Product } from "./types";

/**
 * DEMO PRODUCT DATA — Midea Australia reference models.
 *
 * Rainbow Air has not yet supplied its own model list. These entries are real
 * Midea products used ONLY to demonstrate the layout. They are labelled as Midea
 * on the page and must not be presented as Rainbow Air products.
 *
 * Rules followed:
 *  - Model numbers, brand and source URL are kept exactly as published.
 *  - Where mdhome.com.au does not state a rated kW figure, the value is "To Be Confirmed".
 *    (Capacity selector labels such as "3.5 kW" are shown as a nominal size class only.)
 *  - Replace this file with client-confirmed Rainbow Air data before launch.
 */

const ACCESSED = "13 Nov 2026";

export const products: Product[] = [
  {
    id: "midea-eos-35",
    status: "demo",
    brand: "Midea",
    series: "EOS Series",
    model: "MFEP35VB-N / MFEP35VB-W",
    systemType: "Split System",
    ratedCooling: TBC,
    ratedHeating: TBC,
    capacityNote: "Listed under the 3.5 kW size option",
    keyFeatures: ["Wi-Fi app control", "3D airflow", "Tool-free filter removal"],
    specs: [
      { label: "Size option (as listed)", value: "3.5 kW" },
      { label: "Suggested room area (as listed)", value: "16–23 m²" },
      { label: "Indoor unit H×W×D", value: "295 × 795 × 225 mm" },
      { label: "Outdoor unit H×W×D", value: "554 × 805 × 330 mm" },
      { label: "Cooling star rating (hot / mixed / cold zone)", value: "6.5 / 6.0 / 6.5" },
      { label: "Heating star rating (hot / mixed / cold zone)", value: "4.0 / 3.5 / 3.0" },
      { label: "Power supply", value: "Single phase" },
      { label: "Rated cooling / heating capacity", value: TBC },
    ],
    image: "mideaEos",
    sourceUrl: "https://mdhome.com.au/product/eos-series/",
    sourceAccessed: ACCESSED,
  },
  {
    id: "midea-breezeless-35",
    status: "demo",
    brand: "Midea",
    series: "Breezeless Series",
    model: "FA35",
    systemType: "Split System",
    ratedCooling: TBC,
    ratedHeating: TBC,
    capacityNote: "Listed under the 3.5 kW size option",
    keyFeatures: ["TwinFlap breezeless airflow", "Quiet operation (21 dB(A) as listed)", "Humidity control via app"],
    specs: [
      { label: "Size option (as listed)", value: "3.5 kW" },
      { label: "Suggested room area (as listed)", value: "16–23 m²" },
      { label: "Indoor unit H×W×D", value: "325 × 940 × 193 mm" },
      { label: "Outdoor unit H×W×D", value: "554 × 800 × 333 mm" },
      { label: "Cooling star rating (hot / mixed / cold zone)", value: "4.5 / 4.5 / 5.0" },
      { label: "Heating star rating (hot / mixed / cold zone)", value: "4.0 / 3.0 / 2.5" },
      { label: "Power supply", value: "Single phase" },
      { label: "Rated cooling / heating capacity", value: TBC },
    ],
    image: "mideaBreezeless",
    sourceUrl: "https://mdhome.com.au/product/breezeless-series/",
    sourceAccessed: ACCESSED,
  },
  {
    id: "midea-gaia-50",
    status: "demo",
    brand: "Midea",
    series: "GAIA Series",
    model: "MFCA50VA-N / MFCA50VA-W",
    systemType: "Split System",
    ratedCooling: TBC,
    ratedHeating: TBC,
    capacityNote: "Listed under the 5.0 kW size option",
    keyFeatures: ["Fresh air exchange", "H13 HEPA air filter", "56°C self-purification"],
    specs: [
      { label: "Size option (as listed)", value: "5.0 kW" },
      { label: "Suggested room area (as listed)", value: "23–33 m²" },
      { label: "Indoor unit H×W×D (as listed)", value: "239 × 1088 × 336 mm" },
      { label: "Outdoor unit H×W×D", value: "673 × 890 × 342 mm" },
      { label: "Cooling star rating (hot / mixed / cold zone)", value: "4.5 / 4.0 / 4.5" },
      { label: "Heating star rating (hot / mixed / cold zone)", value: "3.5 / 3.0 / 2.5" },
      { label: "Power supply", value: "Single phase" },
      { label: "Rated cooling / heating capacity", value: TBC },
    ],
    image: "mideaGaia",
    sourceUrl: "https://mdhome.com.au/product/gaia-series/",
    sourceAccessed: ACCESSED,
  },
  {
    id: "midea-multi-0371",
    status: "demo",
    brand: "Midea",
    series: "MULTI Series (outdoor unit)",
    model: "MULMI0371B",
    systemType: "Multi-Split System",
    ratedCooling: "7.1 kW",
    ratedHeating: "8.0 kW",
    capacityNote: "Connects up to 3 indoor units",
    keyFeatures: ["Up to 3 indoor units", "Split, cassette or bulkhead indoor options", "Inverter, R32 refrigerant"],
    specs: [
      { label: "Cooling capacity (as listed)", value: "7.1 kW" },
      { label: "Heating capacity (as listed)", value: "8.0 kW" },
      { label: "Maximum indoor units", value: "3" },
      { label: "Outdoor unit H×W×D", value: "673 × 890 × 342 mm" },
      { label: "Cooling star rating (hot / mixed / cold zone)", value: "4.5 / 3.5 / 3.5" },
      { label: "Heating star rating (hot / mixed / cold zone)", value: "3 / 3 / 2.5" },
      { label: "Refrigerant", value: "R32" },
      { label: "Power supply", value: "Single phase" },
    ],
    image: "mideaMulti",
    sourceUrl: "https://mdhome.com.au/product/multi-series/",
    sourceAccessed: ACCESSED,
  },
  {
    id: "midea-ducted-rac-90",
    status: "demo",
    brand: "Midea",
    series: "Ducted Series – RAC",
    model: "DUCMI90IB / UCMI90OB",
    systemType: "Ducted Air Conditioning",
    ratedCooling: "9.0 kW",
    ratedHeating: "10.5 kW",
    capacityNote: "Middle static pressure, slim indoor unit",
    keyFeatures: ["Constant air volume control", "Built-in drain pump", "R32 refrigerant"],
    specs: [
      { label: "Cooling capacity (as listed)", value: "9.0 kW" },
      { label: "Heating capacity (as listed)", value: "10.5 kW" },
      { label: "Indoor airflow (high)", value: "1400 m³/h" },
      { label: "Indoor noise (high)", value: "45 dB(A)" },
      { label: "External static pressure", value: "0–160 Pa" },
      { label: "Indoor unit size (as listed)", value: "1360 × 720 × 248 mm" },
      { label: "Refrigerant", value: "R32" },
      { label: "Power supply", value: "Single phase" },
    ],
    image: "mideaDuctedRac",
    sourceUrl: "https://mdhome.com.au/product/ducted-series-rac/",
    sourceAccessed: ACCESSED,
  },
  {
    id: "midea-vesta-140",
    status: "demo",
    brand: "Midea",
    series: "Vesta Ducted",
    model: "DUCMI140IHC / UCMI140OC",
    systemType: "Ducted Air Conditioning",
    ratedCooling: TBC,
    ratedHeating: TBC,
    capacityNote: "Listed under the 14 kW size option",
    keyFeatures: ["Smart zoning control", "Slim, splittable indoor unit", "Up to 75 m pipe length (as listed)"],
    specs: [
      { label: "Size option (as listed)", value: "14 kW" },
      { label: "Outdoor unit H×W×D", value: "975 × 980 × 415 mm" },
      { label: "Rated current (max)", value: "31 A" },
      { label: "Refrigerant", value: "R32 (3.5 kg)" },
      { label: "Max pipe length / height difference", value: "75 m / 30 m" },
      { label: "Pre-charged line length", value: "20 m" },
      { label: "Power supply", value: "Single phase" },
      { label: "Rated cooling / heating capacity", value: TBC },
    ],
    image: "mideaVesta",
    sourceUrl: "https://mdhome.com.au/product/vesta-ducted/",
    sourceAccessed: ACCESSED,
  },
];

export const productById = (id: string) => products.find((p) => p.id === id);

/** Text used to prefill the quote form's "Preferred Package / Model" field. */
export const productQuoteLabel = (p: Product) => `${p.brand} ${p.series} – ${p.model}`;
