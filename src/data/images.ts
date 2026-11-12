import type { ImageAsset } from "./types";

/**
 * Central image registry.
 *
 * All imagery in Phase 1 is TEMPORARY:
 *  - `stock`   → Unsplash photos (Unsplash Licence), used as illustrative imagery only.
 *               They are NOT Rainbow Air projects and must never be presented as such.
 *  - `product` → Official Midea Australia product imagery from mdhome.com.au, used as
 *               internal demo reference only. Replace with Rainbow Air product images
 *               (or obtain written permission) before public launch.
 *
 * Run `npm run images:download` to save optimised WebP copies into /public/images.
 * Once downloaded, components automatically use the local copy (see src/lib/images.ts).
 */

const unsplash = (photoId: string) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=75`;

const UNSPLASH_LICENCE = "Unsplash Licence (free commercial use, no attribution required)";
const MIDEA_NOTE = "Midea Australia official product image – demo reference only, permission required for launch";

export const images = {
  // ── Lifestyle / stock ────────────────────────────────────────────────
  heroLivingRoom: {
    id: "hero-living-room",
    remote: unsplash("1758565811178-6341e9999f48"),
    alt: "Bright, modern open-plan living room with large glass doors opening to a leafy garden",
    ratio: 1.5,
    kind: "stock",
    source: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/modern-living-room-with-large-windows-overlooking-nature-aDtv0uDomA0",
    licence: UNSPLASH_LICENCE,
    resizable: true,
  },
  splitLivingRoom: {
    id: "split-living-room",
    remote: unsplash("1761330440311-16e160cad236"),
    alt: "Wall-mounted split system air conditioner above a timber-panelled feature wall in a modern living area",
    ratio: 1.5,
    kind: "stock",
    source: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/modern-living-room-with-air-conditioner-and-decor-BsHycOlU6Bg",
    licence: UNSPLASH_LICENCE,
    position: "50% 8%",
    resizable: true,
  },
  multiOutdoorUnits: {
    id: "multi-outdoor-units",
    remote: unsplash("1776860150250-757406c52438"),
    alt: "Several grey outdoor air conditioning units neatly mounted on a white exterior wall",
    ratio: 1.5,
    kind: "stock",
    source: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/three-gray-air-conditioning-units-mounted-on-a-white-wall-VsjNRXO_c2w",
    licence: UNSPLASH_LICENCE,
    resizable: true,
  },
  wholeHomeExterior: {
    id: "whole-home-exterior",
    remote: unsplash("1564013799919-ab600027ffc6"),
    alt: "Two-storey white weatherboard home with a timber extension and swimming pool",
    ratio: 1.5,
    kind: "stock",
    source: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/white-house-with-swimming-pool-g39p1kDjvSY",
    licence: UNSPLASH_LICENCE,
    resizable: true,
  },
  galleryWallUnit: {
    id: "gallery-wall-unit",
    remote: unsplash("1762341123870-d706f257a12e"),
    alt: "Close-up of a white wall-mounted indoor air conditioning unit with its louvres open",
    ratio: 1.5,
    kind: "stock",
    source: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/white-air-conditioner-unit-displaying-22-degrees-mM0vW68NY0g",
    licence: UNSPLASH_LICENCE,
    resizable: true,
  },
  galleryOutdoorPaved: {
    id: "gallery-outdoor-paved",
    remote: unsplash("1776860155275-eee24bfb1dee"),
    alt: "Outdoor heat pump unit installed beside a modern rendered home on a paved path",
    ratio: 1.5,
    kind: "stock",
    source: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/modern-house-exterior-with-heat-pump-unit-kblddocwPa0",
    licence: UNSPLASH_LICENCE,
    resizable: true,
  },
  galleryOutdoorGarden: {
    id: "gallery-outdoor-garden",
    remote: unsplash("1700124113583-81aa99ea2aa2"),
    alt: "Outdoor air conditioning unit on a gravel base beside a white wall and garden shrubs",
    ratio: 1.5,
    kind: "stock",
    source: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/a-air-conditioner-sitting-on-the-side-of-a-building--nbWCvUiFJA",
    licence: UNSPLASH_LICENCE,
    resizable: true,
  },
  galleryDuctedOutlet: {
    id: "gallery-ducted-outlet",
    remote: unsplash("1770816306659-adcf99a11aeb"),
    alt: "Circular ceiling air outlet with connected ductwork",
    ratio: 1.5,
    kind: "stock",
    source: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/circular-metal-vent-with-attached-ductwork-LI2rpZB12ms",
    licence: UNSPLASH_LICENCE,
    resizable: true,
  },
  galleryInstallDetail: {
    id: "gallery-install-detail",
    remote: unsplash("1621905251189-08b45d6a269e"),
    alt: "Technician in a hard hat and gloves working on wiring during an installation",
    ratio: 1.5,
    kind: "stock",
    source: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/electrician-installing-wiring-with-yellow-hardhat-_2AlIm-F6pw",
    licence: UNSPLASH_LICENCE,
    resizable: true,
  },
  galleryModernHome: {
    id: "gallery-modern-home",
    remote: unsplash("1724582586529-62622e50c0b3"),
    alt: "Calm, modern living room with a large sofa and soft natural light",
    ratio: 1.5,
    kind: "stock",
    source: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/a-modern-living-room-with-a-large-window-vIbxvHj9m9g",
    licence: UNSPLASH_LICENCE,
    resizable: true,
  },

  // ── Product reference imagery (Midea, demo only) ────────────────────
  mideaEos: {
    id: "midea-eos",
    remote: "https://mdhome.com.au/wp-content/uploads/2024/06/47ef92acf788c85-600x600.webp",
    alt: "Midea EOS Series wall-mounted split system indoor unit",
    ratio: 1,
    kind: "product",
    source: "Midea Australia (mdhome.com.au)",
    sourceUrl: "https://mdhome.com.au/product/eos-series/",
    licence: MIDEA_NOTE,
  },
  mideaBreezeless: {
    id: "midea-breezeless",
    remote: "https://mdhome.com.au/wp-content/uploads/2024/06/5709c5bd4567f5f-600x600.webp",
    alt: "Midea Breezeless Series wall-mounted split system indoor unit",
    ratio: 1,
    kind: "product",
    source: "Midea Australia (mdhome.com.au)",
    sourceUrl: "https://mdhome.com.au/product/breezeless-series/",
    licence: MIDEA_NOTE,
  },
  mideaGaia: {
    id: "midea-gaia",
    remote: "https://mdhome.com.au/wp-content/uploads/2024/06/4ed054ef38b6b3a-600x600.webp",
    alt: "Midea GAIA Series wall-mounted split system indoor unit",
    ratio: 1,
    kind: "product",
    source: "Midea Australia (mdhome.com.au)",
    sourceUrl: "https://mdhome.com.au/product/gaia-series/",
    licence: MIDEA_NOTE,
  },
  mideaMulti: {
    id: "midea-multi",
    remote: "https://mdhome.com.au/wp-content/uploads/2024/06/2d0e36481f5234d-600x600.webp",
    alt: "Midea MULTI Series multi-split outdoor unit",
    ratio: 1,
    kind: "product",
    source: "Midea Australia (mdhome.com.au)",
    sourceUrl: "https://mdhome.com.au/product/multi-series/",
    licence: MIDEA_NOTE,
  },
  mideaDuctedRac: {
    id: "midea-ducted-rac",
    remote: "https://mdhome.com.au/wp-content/uploads/2024/06/fde2e1eddd2a07a-600x600.webp",
    alt: "Midea Ducted Series (RAC) twin-fan outdoor unit",
    ratio: 1,
    kind: "product",
    source: "Midea Australia (mdhome.com.au)",
    sourceUrl: "https://mdhome.com.au/product/ducted-series-rac/",
    licence: MIDEA_NOTE,
  },
  mideaVesta: {
    id: "midea-vesta",
    remote: "https://mdhome.com.au/wp-content/uploads/2025/09/12-14KW-ODU1-600x400.png",
    alt: "Midea Vesta Ducted outdoor unit",
    ratio: 1.5,
    kind: "product",
    source: "Midea Australia (mdhome.com.au)",
    sourceUrl: "https://mdhome.com.au/product/vesta-ducted/",
    licence: MIDEA_NOTE,
  },
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
