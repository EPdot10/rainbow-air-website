import type { ImageKey } from "@/data/images";
import { resolveImage } from "@/lib/images";
import { cn } from "@/lib/cn";

interface SmartImageProps {
  image: ImageKey;
  /** `sizes` attribute for responsive remote images. */
  sizes?: string;
  className?: string;
  priority?: boolean;
  maxWidth?: number;
  fit?: "cover" | "contain";
}

/**
 * Image component for the static export.
 * Fills its (aspect-ratio sized) parent, so space is reserved before load (no layout shift).
 * Uses a downloaded local WebP when available, otherwise the remote source with srcset.
 */
export function SmartImage({
  image,
  sizes = "100vw",
  className,
  priority = false,
  maxWidth,
  fit = "cover",
}: SmartImageProps) {
  const img = resolveImage(image, maxWidth);
  return (
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={img.srcSet ? sizes : undefined}
      alt={img.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      referrerPolicy="no-referrer"
      className={cn(
        "absolute inset-0 h-full w-full",
        fit === "cover" ? "object-cover" : "object-contain",
        className,
      )}
    />
  );
}
