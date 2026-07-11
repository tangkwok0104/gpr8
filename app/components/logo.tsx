/**
 * The GPR mark — "The Stack": three cast bars abstracted into bands.
 *
 * It reads three ways on purpose: as stacked bullion, as a rising chart, and as an
 * equals sign — which is what a two-way (bid/ask) price is. Geometric rather than
 * illustrative, so it survives a 16px browser tab, embroidery, and a rubber stamp.
 *
 * Vector, not raster. The previous logo was a background-removed PNG that was never
 * committed to the repo and still 500s in production — a raster logo is a logo waiting
 * to go blurry or go missing.
 */
export function Mark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="7" y="8" width="18" height="4.6" rx="1" fill="#D4B063" />
      <rect x="5" y="14" width="22" height="4.6" rx="1" fill="#A8813C" />
      <rect x="9" y="20" width="14" height="4.6" rx="1" fill="#6E5423" />
    </svg>
  );
}

/** Reversed for dark surfaces — brighter golds so the stack doesn't sink into the ink. */
export function MarkReversed({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="7" y="8" width="18" height="4.6" rx="1" fill="#E8CE7E" />
      <rect x="5" y="14" width="22" height="4.6" rx="1" fill="#C8A44D" />
      <rect x="9" y="20" width="14" height="4.6" rx="1" fill="#8A6D2B" />
    </svg>
  );
}

export function Logo({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-3">
      <Mark className="h-8 w-8 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold tracking-wide text-ink">
          GPR
        </span>
        <span className="mt-1 hidden text-[0.6rem] uppercase tracking-widest text-muted sm:block">
          {name}
        </span>
      </span>
    </span>
  );
}
