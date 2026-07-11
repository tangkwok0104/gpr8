import "server-only";

const TROY_OUNCES_PER_KG = 32.1507466;
const TWELVE_HOURS = 60 * 60 * 12;

/**
 * The dealing spread either side of spot: we buy at spot − 1.5%, we sell at spot + 1.5%.
 *
 * This drives the indicative bid/ask shown on the site. It is NOT a quote — a real
 * price is confirmed by the dealer at the time of trade, because spot moves and the
 * spread widens or tightens with size. The UI says so, in every language.
 */
export const DEALER_SPREAD = 0.015;

export type CurrencyCode = "USD" | "HKD" | "CNY";
type ByCurrency = Record<CurrencyCode, number>;

export type SpotPrices = {
  /** Mid — the London reference, per kilogram. */
  spot: ByCurrency;
  /** What we pay you, per kilogram. */
  bid: ByCurrency;
  /** What you pay us, per kilogram. */
  ask: ByCurrency;
  spreadPct: number;
  /** Unix seconds, from the data provider — not our clock. */
  timestamp: number;
};

/**
 * Gold reference price per kilogram, in the three currencies we quote.
 *
 * Two things here are deliberate, and were wrong in the previous site:
 *
 * 1. The API key stays on the server. It used to sit in a client component with a
 *    hardcoded fallback, so it shipped in the JS bundle for anyone to read and burn —
 *    on a 100-call/month tier.
 *
 * 2. `revalidate` makes this ONE upstream call per 12 hours for the whole site. The old
 *    code fetched per browser, so quota burn scaled with traffic: the site got more
 *    likely to break the more people visited it.
 *
 * FX comes from the same call rather than the hardcoded 7.8 / 7.12 the old component
 * used, so the HKD and CNY figures track reality.
 *
 * Returns null on any failure. A missing price renders as "unavailable" — we never
 * substitute a stale or invented number on a page about the price of gold.
 */
export async function getSpotPrices(): Promise<SpotPrices | null> {
  const apiKey = process.env.METAL_PRICE_API_KEY;
  if (!apiKey) {
    console.error("[spot] METAL_PRICE_API_KEY is not set");
    return null;
  }

  try {
    const res = await fetch(
      `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=USD&currencies=XAU,HKD,CNY`,
      { next: { revalidate: TWELVE_HOURS }, signal: AbortSignal.timeout(8000) },
    );

    if (!res.ok) {
      console.error("[spot] provider returned", res.status);
      return null;
    }

    const data = await res.json();
    const rates = data?.rates;

    // XAU is quoted as troy ounces per 1 USD, so an ounce costs its inverse.
    const xau = Number(rates?.XAU);
    const hkd = Number(rates?.HKD);
    const cny = Number(rates?.CNY);

    if (!xau || !hkd || !cny || xau <= 0) {
      console.error("[spot] unexpected payload shape", data);
      return null;
    }

    const usdPerKg = (1 / xau) * TROY_OUNCES_PER_KG;
    const spot: ByCurrency = {
      USD: usdPerKg,
      HKD: usdPerKg * hkd,
      CNY: usdPerKg * cny,
    };

    const scale = (by: number): ByCurrency => ({
      USD: spot.USD * by,
      HKD: spot.HKD * by,
      CNY: spot.CNY * by,
    });

    return {
      spot,
      bid: scale(1 - DEALER_SPREAD),
      ask: scale(1 + DEALER_SPREAD),
      spreadPct: DEALER_SPREAD * 100,
      timestamp: Number(data?.timestamp) || Math.floor(Date.now() / 1000),
    };
  } catch (err) {
    console.error("[spot] fetch failed", err);
    return null;
  }
}
