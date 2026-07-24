import Image from "next/image";
import type { ImageAsset } from "@/types/content";
import { cn } from "@/lib/utils";

/**
 * Photographic duotone treatment: a grayscale base graded toward charcoal
 * shadows and amber highlights, with a grain overlay so stock photography
 * stops reading as stock. One component so the look is consistent everywhere.
 */
export function DuotoneImage({
  image,
  priority = false,
  sizes = "100vw",
  className,
  imgClassName,
  /** Dial the amber grade up for hero, down for dense grids. */
  intensity = "base",
}: {
  image: ImageAsset;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  intensity?: "subtle" | "base" | "strong";
}) {
  const tintOpacity =
    intensity === "strong" ? "opacity-90" : intensity === "subtle" ? "opacity-40" : "opacity-70";

  return (
    <div className={cn("grain-overlay relative overflow-hidden bg-ink-800", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        className={cn("duotone h-full w-full object-cover", imgClassName)}
      />
      {/* Charcoal→amber duotone grade */}
      <div
        aria-hidden
        className={cn(
          "duotone-tint pointer-events-none absolute inset-0",
          tintOpacity,
        )}
      />
      {/* Shadow-side charcoal wash for text legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/10 to-transparent"
      />
    </div>
  );
}
