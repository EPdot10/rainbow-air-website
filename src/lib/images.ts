import manifest from "@/data/image-manifest.json";
import { images, type ImageKey } from "@/data/images";
import type { ImageAsset } from "@/data/types";

/** Local copies written by `npm run images:download` (id → /images/<id>.webp). */
const local = manifest as Record<string, string>;

export interface ResolvedImage extends ImageAsset {
  src: string;
  srcSet?: string;
  isLocal: boolean;
}

const UNSPLASH_WIDTHS = [480, 768, 1080, 1440, 1920, 2400];

/** Returns the best available source: a downloaded local file, else the remote URL. */
export function resolveImage(key: ImageKey, maxWidth = 1920): ResolvedImage {
  const asset: ImageAsset = images[key];
  const localSrc = local[asset.id];
  if (localSrc) return { ...asset, src: localSrc, isLocal: true };

  if (asset.resizable) {
    const widths = UNSPLASH_WIDTHS.filter((w) => w <= maxWidth);
    return {
      ...asset,
      src: `${asset.remote}&w=${widths[widths.length - 1]}`,
      srcSet: widths.map((w) => `${asset.remote}&w=${w} ${w}w`).join(", "),
      isLocal: false,
    };
  }
  return { ...asset, src: asset.remote, isLocal: false };
}
