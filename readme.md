# GPR — Global Partner & Resources Limited

The public site for a Hong Kong physical bullion dealer. Next.js App Router, three
locales (`en`, `zh-hant`, `zh-hans`), deployed on Vercel at **[gpr8.com](https://gpr8.com)**.

## Getting started

```bash
npm install
cp .env.example .env.local   # every key in here is optional; see below
npm run dev                  # http://localhost:3000
```

Useful checks: `npm run typecheck`, `npm run lint`, `npm run build`.

## Deploying

`main` is the production branch, and it is connected to Vercel: **pushing to `main`
deploys the live site.** Any other branch gets a preview URL.

This is deliberate, and it replaced a worse setup. Until July 2026 the project had no Git
connection at all — production was whatever someone last uploaded with `vercel --prod`
from their laptop, including uncommitted edits. That meant the repo was not a record of
what the public was actually being served. Now it is. Don't reintroduce a manual
`vercel --prod` habit; push instead.

## The price panel — read this before touching it

The homepage quotes an indicative bid and ask, derived from live gold spot. It is the one
part of this site where being wrong costs money, so it has rules.

- **Gold comes from a live feed** ([gold-api.com](https://api.gold-api.com/price/XAU)),
  refreshed every 5 minutes. FX (USD→HKD/CNY) comes from Frankfurter's ECB daily rates.
  Neither needs an API key.
- **`METAL_PRICE_API_KEY` is optional** and is now only an FX fallback. It used to be the
  gold source, and that was the bug: its free plan publishes a single daily close stamped
  23:59:59 UTC, so the site rendered "as of 07:59 HKT" and served a price up to two days
  stale. At one point that was 2.6% above the real market — wider than the entire 1.5%
  dealing spread — meaning the site advertised a bid *above* what gold was actually worth.
  Do not put a once-daily source back in front of this panel.
- **A stale or implausible price is refused, not displayed.** Quotes older than 72 hours
  (enough slack for the weekend market close) or outside a sane USD/oz band render as
  "unavailable". On a page about the price of gold, "call us" is a fine answer and a wrong
  number is not.

## Layout

```
app/[lang]/        pages, one route group per locale
app/components/    spot-panel.tsx is the price panel
app/lib/spot.ts    price fetching, the spread, and the staleness guards
middleware.ts      locale detection and redirects
```
