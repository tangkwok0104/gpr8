"use client";

import { useState } from "react";
import type { CurrencyCode, SpotPrices } from "../lib/spot";
import { INTL_LOCALE, type Locale } from "../lib/site";

type Dict = {
  spot: {
    title: string;
    subtitle: string;
    unit: string;
    bidLabel: string;
    bidNote: string;
    askLabel: string;
    askNote: string;
    spotLabel: string;
    spreadNote: string;
    asOf: string;
    disclaimer: string;
    unavailable: string;
  };
};

const CURRENCIES: CurrencyCode[] = ["USD", "HKD", "CNY"];

const SYMBOL: Record<CurrencyCode, string> = {
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
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const intl = INTL_LOCALE[lang];

  const money = (value: number) =>
    value.toLocaleString(intl, { maximumFractionDigits: 0 });

  return (
    <div className="rounded-sm border border-line bg-card p-8 shadow-sm shadow-ink/[0.03]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="eyebrow">{dict.spot.title}</h2>
          <p className="mt-1.5 text-sm text-muted">{dict.spot.subtitle}</p>
        </div>

        <div className="inline-flex gap-0.5 rounded-full bg-well p-0.5" role="group">
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
                    ? "rounded-full bg-card px-4 py-1.5 text-[0.72rem] font-semibold tracking-wide text-ink shadow-sm shadow-ink/10"
                    : "rounded-full px-4 py-1.5 text-[0.72rem] font-medium tracking-wide text-muted transition-colors hover:text-ink"
                }
              >
                {code}
              </button>
            );
          })}
        </div>
      </div>

      {prices ? (
        <>
          {/* Bid and ask carry equal weight — a dealer quotes two prices, not one. */}
          <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
            <div className="bg-card px-6 py-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-muted">
                {dict.spot.bidLabel}
              </p>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-lg text-muted">
                  {SYMBOL[currency]}
                </span>
                <span className="tabular font-display text-4xl font-bold leading-none text-ink sm:text-[2.75rem]">
                  {money(prices.bid[currency])}
                </span>
              </p>
              <p className="mt-2.5 text-xs text-muted">{dict.spot.bidNote}</p>
            </div>

            <div className="bg-card px-6 py-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-gold">
                {dict.spot.askLabel}
              </p>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-lg text-muted">
                  {SYMBOL[currency]}
                </span>
                <span className="tabular font-display text-4xl font-bold leading-none text-gold-hover sm:text-[2.75rem]">
                  {money(prices.ask[currency])}
                </span>
              </p>
              <p className="mt-2.5 text-xs text-muted">{dict.spot.askNote}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted">
            <span>
              {dict.spot.spotLabel}{" "}
              <span className="tabular font-medium text-ink">
                {SYMBOL[currency]}
                {money(prices.spot[currency])}
              </span>{" "}
              {dict.spot.unit}
            </span>
            <span>{dict.spot.spreadNote}</span>
            <span>
              {dict.spot.asOf}{" "}
              <time
                dateTime={new Date(prices.timestamp * 1000).toISOString()}
                className="tabular"
              >
                {new Date(prices.timestamp * 1000).toLocaleString(intl, {
                  dateStyle: "medium",
                  timeStyle: "short",
                  timeZone: "Asia/Hong_Kong",
                })}{" "}
                HKT
              </time>
            </span>
          </div>
        </>
      ) : (
        <p className="py-8 text-sm text-muted">{dict.spot.unavailable}</p>
      )}

      <div className="rule-gold mt-8" />
      <p className="mt-5 max-w-3xl text-xs leading-relaxed text-muted">
        {dict.spot.disclaimer}
      </p>
    </div>
  );
}
