"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "../lib/site";

/**
 * macOS-style segmented control (raised active pill on a recessed track) — not an
 * outlined box with coloured text.
 *
 * Switching language keeps you on the page you were reading: /zh-hans/about ⇄ /en/about.
 * Traditional sits first because it is the default.
 */
const LABEL: Record<Locale, string> = {
  "zh-hant": "繁",
  "zh-hans": "简",
  en: "EN",
};

export function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname() || `/${lang}`;
  // Strip the leading locale segment. zh-hant must be tested before zh-hans would
  // ever partially match, so match the full set explicitly.
  const rest = pathname.replace(/^\/(zh-hant|zh-hans|en)/, "") || "";

  return (
    <div className="inline-flex gap-0.5 rounded-full bg-well p-0.5">
      {LOCALES.map((code) => {
        const active = code === lang;
        return (
          <Link
            key={code}
            href={`/${code}${rest}`}
            hrefLang={code}
            aria-current={active ? "true" : undefined}
            className={
              active
                ? "rounded-full bg-card px-3 py-1.5 text-[0.72rem] font-semibold tracking-wide text-ink shadow-sm shadow-ink/10"
                : "rounded-full px-3 py-1.5 text-[0.72rem] font-medium tracking-wide text-muted transition-colors hover:text-ink"
            }
          >
            {LABEL[code]}
          </Link>
        );
      })}
    </div>
  );
}
