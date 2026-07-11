/**
 * The GPR mark: a gold ingot in trimetric projection, reduced to three faces.
 * Hand-rolled SVG — the previous site's logo was a PNG that was never committed and
 * still 500s in production.
 */
export function Mark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* top face — the only face that carries a marking, as on a real cast bar */}
      <path d="M9 9.5 L23 9.5 L26 13 L6 13 Z" fill="#D4B063" />
      {/* front face */}
      <path d="M6 13 L26 13 L24 23 L8 23 Z" fill="#A8813C" />
      {/* shadowed right bevel */}
      <path d="M26 13 L24 23 L20.5 23 L22.5 13 Z" fill="#6E5423" />
      {/* struck line on the top face, standing in for the assay mark */}
      <path
        d="M12 11.2 H20"
        stroke="#6E5423"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
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
