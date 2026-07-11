"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "../lib/site";

/**
 * macOS-style segmented control (raised active pill on a recessed track), per the
 * brand rules — not an outlined box with coloured text.
 *
 * Swapping language keeps you on the page you were reading: /zh/about ⇄ /en/about.
 */
export function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname() || `/${lang}`;
  const rest = pathname.replace(/^\/(en|zh)/, "") || "";

  const options: { code: Locale; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "zh", label: "中文" },
  ];

  return (
    <div className="inline-flex gap-0.5 rounded-full bg-surface-2/80 p-0.5">
      {options.map((opt) => {
        const active = opt.code === lang;
        return (
          <Link
            key={opt.code}
            href={`/${opt.code}${rest}`}
            aria-current={active ? "true" : undefined}
            className={
              active
                ? "rounded-full bg-ink px-3.5 py-1.5 text-[0.72rem] font-semibold tracking-wide text-text shadow-sm shadow-black/30"
                : "rounded-full px-3.5 py-1.5 text-[0.72rem] font-medium tracking-wide text-muted transition-colors hover:text-text"
            }
          >
            {opt.label}
          </Link>
        );
      })}
    </div>
  );
}
