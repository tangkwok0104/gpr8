/* eslint-disable @next/next/no-img-element */

/**
 * GPR's REAL logo — a blue globe crossed by a band of gold, copper and silver.
 * "Global" (the sphere) and "Resources" (the three metals).
 *
 * This is the company's existing mark, which they have used for about a year. It is NOT
 * ours to redesign, so it is reproduced rather than reinterpreted.
 *
 * Provenance and its limits, so nobody has to re-derive this later:
 *   - It appears NOWHERE on the old gpr8.com. The old header rendered no logo at all,
 *     and the only logo path in that codebase sat in unreachable dead code, pointing at
 *     a PNG that was never deployed (it still 500s).
 *   - The only source we could obtain was a 454px desktop screenshot, kept alongside
 *     this work at .tmp/SOURCE-logo-screenshot.png.
 *   - public/img/gpr-logo.svg was auto-traced from that screenshot (colour-separated,
 *     vectorised per layer, recomposed with the sampled brand colours).
 *
 * It is faithful at every size the site uses it (16–48px) and indistinguishable from the
 * original there. Above roughly 200px the traced curves show their raster origin.
 * If GPR ever supplies the original vector (AI / EPS / SVG) or a high-resolution export,
 * drop it in as public/img/gpr-logo.svg and delete this note — nothing else changes.
 *
 * Brand colours sampled from the source: #293E92 blue, #F0CB32 gold, #A8581A copper,
 * #C7C7C7 silver.
 */
export function Mark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <img
      src="/img/gpr-logo.svg"
      alt=""
      aria-hidden="true"
      className={className}
      // Intrinsic size of the traced artwork — prevents layout shift while it loads.
      width={1362}
      height={1260}
    />
  );
}

export function Logo({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-3">
      <Mark className="h-10 w-10 shrink-0" />
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
