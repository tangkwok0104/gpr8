/**
 * The GPR mark: a gold ingot seen in trimetric projection, reduced to three faces.
 * Hand-rolled SVG — the previous site's logo was a PNG that never made it into the
 * repo and 500s in production to this day.
 */
export function Mark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* top face */}
      <path d="M9 9.5 L23 9.5 L26 13 L6 13 Z" fill="#E8CE7E" />
      {/* front face */}
      <path d="M6 13 L26 13 L24 23 L8 23 Z" fill="#C8A44D" />
      {/* shadowed right bevel */}
      <path d="M26 13 L24 23 L20.5 23 L22.5 13 Z" fill="#8A6D2B" />
      {/* struck line, standing in for the assay mark */}
      <path d="M11 17.5 H19" stroke="#0A0A0B" strokeOpacity="0.35" strokeWidth="1.2" />
    </svg>
  );
}

export function Logo({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-3">
      <Mark className="h-8 w-8 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold tracking-wide text-text">
          GPR
        </span>
        <span className="mt-1 hidden text-[0.6rem] uppercase tracking-widest text-muted sm:block">
          {name}
        </span>
      </span>
    </span>
  );
}
