/**
 * Shared content types. Every piece of homepage content lives in /src/data
 * so it can be edited without touching components.
 */

/** `demo` = placeholder/reference content that must be replaced or confirmed before launch. */
import type { ImageKey } from "./images";

export type ContentStatus = "demo" | "confirmed";

export const TBC = "To Be Confirmed";

export type SystemType = "Split System" | "Multi-Split System" | "Ducted Air Conditioning";

export interface ImageAsset {
  /** Stable id – also the file name used by `npm run images:download`. */
  id: string;
  /** Remote source used until the image is downloaded into /public/images. */
  remote: string;
  alt: string;
  /** Natural aspect ratio (width / height) – reserves space to avoid layout shift. */
  ratio: number;
  kind: "stock" | "product";
  source: string;
  sourceUrl: string;
  licence: string;
  /** CSS object-position focal point for cropped (cover) use, e.g. "50% 20%". */
  position?: string;
  /** True when the remote host supports width-based resizing (Unsplash). */
  resizable?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  status: ContentStatus;
  brand: string;
  series: string;
  /** Full model numbers exactly as published by the source. */
  model: string;
  systemType: SystemType;
  ratedCooling: string;
  ratedHeating: string;
  /** Extra line shown under the capacities, e.g. nominal size class. */
  capacityNote?: string;
  keyFeatures: string[];
  /** Typical rooms / use. */
  suitableFor: string;
  /** Equipment warranty – period and terms. */
  warranty: string;
  /** Full spec sheet shown in the "View Specifications" dialog. */
  specs: Spec[];
  image: ImageKey;
  sourceUrl: string;
  sourceAccessed: string;
}

export interface InstallPackage {
  id: string;
  status: ContentStatus;
  label: string;
  name: string;
  /** "Rainbow Air [series / full model]" – placeholder until models are confirmed. */
  modelLabel: string;
  tagline: string;
  systemType: SystemType;
  suitableFor: string;
  highlights: Spec[];
  /** What the package includes (units, standard installation, old unit removal policy). */
  includes: string[];
  /** Items that must be confirmed on site (non-standard pipework, access, electrical). */
  siteConfirm: string[];
  /** Leave as null until the client confirms pricing – UI then shows "Request a Quote". */
  price: string | null;
  image: ImageKey;
  imageCaption: string;
  referenceProductIds: string[];
}

export interface SystemSolution {
  id: string;
  name: SystemType;
  /** Chinese/English name shown in the comparison, e.g. "Split System". */
  description: string;
  image: ImageKey;
  bestFor: string[];
  enquiryValue: string;
}

export interface Project {
  id: string;
  status: ContentStatus;
  title: string;
  category: string;
  image: ImageKey;
  /** Wide tiles span two columns on desktop. */
  wide?: boolean;
}
