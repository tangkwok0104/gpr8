import "server-only";

const TROY_OUNCES_PER_KG = 32.1507466;

/** Spot moves all day. Five minutes is fresh enough for an indicative quote. */
const SPOT_TTL = 60 * 5;

/** FX here is a daily central-bank fix. Refetching it faster than hourly buys nothing. */
const FX_TTL = 60 * 60;

/**
 * Refuse to print a quote older than this.
 *
 * Gold trades from Sunday 22:00 UTC to Friday 21:00 UTC, so an honest quote can be ~49
 * hours old across a weekend. 72 hours clears that gap while still catching a feed that
 * has silently frozen — which is the failure this guard exists for. The old panel sat on
 * a two-day-old price for days without complaint, because nothing ever checked the age.
 */
const MAX_QUOTE_AGE = 60 * 60 * 72;

/** Gold has not traded outside this band in living memory, and won't tomorrow either. */
const MIN_USD_PER_OZ = 500;
const MAX_USD_PER_OZ = 20_000;

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
 * Live gold, in US dollars per troy ounce.
 *
 * gold-api.com is a live tick, free, and needs no key. That last part matters more than
 * it looks: the previous source (metalpriceapi) was on a 100-call/month free plan whose
 * `latest` endpoint only ever publishes a once-daily close, stamped 23:59:59 UTC. The
 * site faithfully rendered that as "07:59 HKT" and looked broken, because it was — the
 * displayed price could be two days behind the market, by more than the dealing spread.
 * A gold dealer quoting yesterday's price is quoting the wrong side of today's.
 */
async function fetchGold(): Promise<{ usdPerOz: number; timestamp: number } | null> {
  try {
    const res = await fetch("https://api.gold-api.com/price/XAU", {
      next: { revalidate: SPOT_TTL },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      console.error("[spot] gold provider returned", res.status);
      return null;
    }

    const data = await res.json();
    const usdPerOz = Number(data?.price);
    const updatedAt = Date.parse(data?.updatedAt ?? "");

    if (!Number.isFinite(usdPerOz) || usdPerOz < MIN_USD_PER_OZ || usdPerOz > MAX_USD_PER_OZ) {
      console.error("[spot] gold price outside sane band", data);
      return null;
    }

    if (!Number.isFinite(updatedAt)) {
      console.error("[spot] gold quote has no usable timestamp", data);
      return null;
    }

    const timestamp = Math.floor(updatedAt / 1000);
    const age = Math.floor(Date.now() / 1000) - timestamp;

    if (age > MAX_QUOTE_AGE) {
      console.error("[spot] gold quote is stale:", age, "seconds old");
      return null;
    }

    return { usdPerOz, timestamp };
  } catch (err) {
    console.error("[spot] gold fetch failed", err);
    return null;
  }
}

/**
 * US dollar into the two other currencies we quote.
 *
 * Frankfurter republishes the ECB daily reference rates: free, no key, no quota. The old
 * metalpriceapi key stays wired as a fallback so FX is genuinely redundant — its FX is a
 * day old, but so is the ECB's, so nothing is lost. If the key is unset we simply skip it.
 */
async function fetchFx(): Promise<{ HKD: number; CNY: number } | null> {
  const usable = (hkd: number, cny: number) =>
    Number.isFinite(hkd) && Number.isFinite(cny) && hkd > 0 && cny > 0
      ? { HKD: hkd, CNY: cny }
      : null;

  try {
    const res = await fetch(
      "https://api.frankfurter.dev/v1/latest?base=USD&symbols=HKD,CNY",
      { next: { revalidate: FX_TTL }, signal: AbortSignal.timeout(8000) },
    );

    if (res.ok) {
      const data = await res.json();
      const rates = usable(Number(data?.rates?.HKD), Number(data?.rates?.CNY));
      if (rates) return rates;
      console.error("[spot] unexpected FX payload shape", data);
    } else {
      console.error("[spot] FX provider returned", res.status);
    }
  } catch (err) {
    console.error("[spot] FX fetch failed", err);
  }

  const apiKey = process.env.METAL_PRICE_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=USD&currencies=HKD,CNY`,
      { next: { revalidate: FX_TTL }, signal: AbortSignal.timeout(8000) },
    );

    if (!res.ok) {
      console.error("[spot] FX fallback returned", res.status);
      return null;
    }

    const data = await res.json();
    const rates = usable(Number(data?.rates?.HKD), Number(data?.rates?.CNY));
    if (!rates) console.error("[spot] unexpected FX fallback payload shape", data);
    return rates;
  } catch (err) {
    console.error("[spot] FX fallback fetch failed", err);
    return null;
  }
}

/**
 * Gold reference price per kilogram, in the three currencies we quote.
 *
 * Returns null on any failure, including a price that is merely old. A missing price
 * renders as "unavailable" — we never substitute a stale or invented number on a page
 * about the price of gold. "Call us" is a fine answer; a wrong bid is not.
 */
export async function getSpotPrices(): Promise<SpotPrices | null> {
  const [gold, fx] = await Promise.all([fetchGold(), fetchFx()]);
  if (!gold || !fx) return null;

  const usdPerKg = gold.usdPerOz * TROY_OUNCES_PER_KG;
  const spot: ByCurrency = {
    USD: usdPerKg,
    HKD: usdPerKg * fx.HKD,
    CNY: usdPerKg * fx.CNY,
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
    timestamp: gold.timestamp,
  };
}
