# GPR — Brand Definition

**Client project.** Global Partner & Resources Limited (環球夥伴資源有限公司), a Hong
Kong physical gold bullion dealer. This is Kent's company brand — it is NOT 67Lab and
must never inherit 67Lab's DNA.

## Positioning

A discreet Hong Kong bullion house, not a fintech app and not a retail coin shop. The
customer is a mainland-Chinese or Hong Kong investor moving meaningful capital into
physical metal. The feeling to earn is **discretion, weight, and permanence** — the
quiet of a private bank's back office, not the noise of a trading platform.

The visual brief in one line: *morning light on a marble desk, and a gold bar.*

## Palette

**Day theme, single mode. There is no dark mode and no toggle** — a dark site looks
sharp to a designer but reads as unfamiliar to a lot of buyers, and this page has to
work for a 55-year-old client on a bright screen, not for us.

Gold is the only accent and it is used sparingly — an accent that appears everywhere
stops reading as gold and starts reading as yellow.

| Token | Hex | Use |
|---|---|---|
| `paper` | `#FBF9F5` | Page background. Warm off-white, never pure `#FFF`. |
| `card` | `#FFFFFF` | Cards, panels — the only place true white appears. |
| `well` | `#F3EFE7` | Recessed elements: segmented-control tracks, footer. |
| `ink` | `#1A1714` | Body text and the primary button. Warm near-black. |
| `muted` | `#6E675E` | Secondary text, captions, placeholders. |
| `line` | `#E3DCD0` | Borders, dividers. Not for readable text. |
| `gold` | `#8A6A2E` | Gold at **text** weight. Dark enough to pass contrast on paper. |
| `gold-fill` | `#A8813C` | Rules, numerals, icon strokes, filled shapes. |
| `gold-hover` | `#6E5423` | Hover on gold text and on the primary button. |
| `gold-tint` | `#EFE6D2` | Faint background washes, selection. |
| `positive` / `negative` | `#2F7D4F` / `#B03B33` | Form success/failure only. Desaturated. |

**The contrast trap:** the obvious "gold" (`#C8A44D`) fails contrast on a light
background — it is a *dark-theme* gold. On paper, gold used as text must be darkened to
`#8A6A2E`; the brighter tone survives only as a fill, where nothing has to be read
through it.

**Forbidden:** indigo, purple, and the violet gradients of the previous site. Pure white
page backgrounds. Bright saturated yellow (`#FFD700` and friends) — it reads cheap.
Dark mode.

## Type

- **Display** — Cormorant Garamond, 600/700. Headlines, the wordmark, figures. A serif
  is the entire reason this reads as a bullion house rather than a SaaS landing page.
- **Body** — Inter, 400/500. Tight, neutral, legible at small sizes.
- **Chinese** — system CJK stack (PingFang → Microsoft JhengHei/YaHei → Noto).

## Languages

Three, in this order of priority:

1. **繁體中文 (`/zh-hant`) — the default.** A Hong Kong company's own language. A visitor
   with no signal lands here.
2. **简体中文 (`/zh-hans`)** — most of the client base is mainland. Written natively for a
   mainland reader (您, 什么, 价差), not machine-converted from Traditional.
3. **English (`/en`)** — the third audience, not the first.

The old site put English first and had no Simplified at all, which had it backwards.
- **Numerals** — tabular figures for all prices. Prices that jitter as digits change
  look broken.

## Rules

- **No emoji, ever.** Icons are hand-rolled SVG.
- **No `hover:underline`.** Links shift colour (`muted` → `gold-bright`) or take a
  border highlight. An underline on hover reads as unstyled browser chrome.
- **Density over padding.** Fill space with substance, not air.
- **Gold is structural, not decorative** — a hairline rule, a figure, one CTA. Never a
  gold gradient wash.
- **Photography is real** (Higgsfield-generated, shipped as WebP). No vector filler,
  no stock-looking clip art.

## Honesty constraints (this is a financial services site)

These are not style preferences — they are the difference between a credible dealer and
a liability.

- **No invented testimonials.** The previous site shipped "John Doe" and "Jane Smith"
  with five-star reviews. They are deleted and not replaced with anything fabricated.
  Trust is carried by verifiable facts instead: named refiners, the physical address,
  the company registration.
- **No invented numbers.** No "$2B traded", no "10,000 clients", no founding year we
  cannot verify. Every factual claim on the site traces back to copy Kent's company
  already published.
- **Prices are indicative, always labelled.** The site shows a two-way price — bid and
  ask, ±1.5% around spot — because that is what a dealer actually quotes. It is
  timestamped, and every language states plainly that the real price is confirmed by the
  dealer at the time of dealing. It is never presented as a dealable quote. The old site
  showed a single number with a 2% markup silently baked in, which is the opposite of
  this rule.
