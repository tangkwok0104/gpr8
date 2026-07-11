"use client";

import { useState } from "react";
import type { SpotPrices } from "../lib/spot";
import type { Locale } from "../lib/site";

type Dict = {
  spot: {
    title: string;
    subtitle: string;
    unit: string;
    asOf: string;
    disclaimer: string;
    unavailable: string;
  };
};

const CURRENCIES = ["USD", "HKD", "CNY"] as const;
type Currency = (typeof CURRENCIES)[number];

const SYMBOL: Record<Currency, string> = {
  USD: "US$",
  HKD: "HK$",
  CNY: "¥",
};

export function SpotPanel({
  prices,
  dict,
  lang,
}: {
  prices: SpotPrices | null;
  dict: Dict;
  lang: Locale;
}) {
  const [currency, setCurrency] = useState<Currency>("USD");

  return (
    <div className="rounded-sm border border-gold/15 bg-surface/70 p-8 backdrop-blur-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="eyebrow">{dict.spot.title}</h3>
          <p className="mt-1.5 text-sm text-muted">{dict.spot.subtitle}</p>
        </div>

        {/* Segmented control — raised active pill, recessed track. */}
        <div
          className="inline-flex gap-0.5 rounded-full bg-surface-2/80 p-0.5"
          role="group"
        >
          {CURRENCIES.map((code) => {
            const active = code === currency;
            return (
              <button
                key={code}
                type="button"
                onClick={() => setCurrency(code)}
                aria-pressed={active}
                className={
                  active
                    ? "rounded-full bg-ink px-4 py-1.5 text-[0.72rem] font-semibold tracking-wide text-text shadow-sm shadow-black/30"
                    : "rounded-full px-4 py-1.5 text-[0.72rem] font-medium tracking-wide text-muted transition-colors hover:text-text"
                }
              >
                {code}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        {prices ? (
          <>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-2xl text-muted">
                {SYMBOL[currency]}
              </span>
              <span className="tabular font-display text-5xl font-bold leading-none text-gold-bright sm:text-6xl">
                {prices[currency].toLocaleString(
                  lang === "zh" ? "zh-HK" : "en-US",
                  { maximumFractionDigits: 0 },
                )}
              </span>
              <span className="text-sm text-muted">{dict.spot.unit}</span>
            </div>
            <p className="mt-4 text-xs text-muted/70">
              {dict.spot.asOf}{" "}
              <time
                dateTime={new Date(prices.timestamp * 1000).toISOString()}
                className="tabular"
              >
                {new Date(prices.timestamp * 1000).toLocaleString(
                  lang === "zh" ? "zh-HK" : "en-GB",
                  {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: "Asia/Hong_Kong",
                  },
                )}{" "}
                HKT
              </time>
            </p>
          </>
        ) : (
          <p className="py-4 text-sm text-muted">{dict.spot.unavailable}</p>
        )}
      </div>

      <div className="rule-gold mt-8" />
      <p className="mt-5 text-xs leading-relaxed text-muted/70">
        {dict.spot.disclaimer}
      </p>
    </div>
  );
}
