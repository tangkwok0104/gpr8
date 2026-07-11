# GPR — Brand Definition

**Client project.** Global Partner & Resources Limited (環球夥伴資源有限公司), a Hong
Kong physical gold bullion dealer. This is Kent's company brand — it is NOT 67Lab and
must never inherit 67Lab's DNA.

## Positioning

A discreet Hong Kong bullion house, not a fintech app and not a retail coin shop. The
customer is a mainland-Chinese or Hong Kong investor moving meaningful capital into
physical metal. The feeling to earn is **discretion, weight, and permanence** — the
quiet of a private bank's back office, not the noise of a trading platform.

The visual brief in one line: *an obsidian desk, one lamp, and a gold bar.*

## Palette

Dark by default. Gold is the only accent and it is used sparingly — an accent that
appears everywhere stops reading as gold and starts reading as yellow.

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0A0A0B` | Page background. Near-black, faintly warm. |
| `surface` | `#141416` | Cards, panels. |
| `surface-2` | `#1D1D20` | Raised elements, inputs on dark. |
| `gold` | `#C8A44D` | Primary accent. Muted, metallic, aged — not a bright yellow. |
| `gold-bright` | `#E8CE7E` | Hover states, highlights, small emphasis only. |
| `gold-deep` | `#8A6D2B` | Borders, dividers, pressed states. |
| `text` | `#F2F0EB` | Body text. Warm white, never pure `#FFF`. |
| `muted` | `#96928A` | Secondary text, captions, placeholders. |
| `subtle` | `#3A3A3E` | Borders, disabled. Not for readable text. |
| `positive` / `negative` | `#5FA777` / `#C4574F` | Price movement only. Desaturated. |

**Forbidden:** indigo, purple, and the violet gradients of the previous site. Pure
white backgrounds. Bright saturated yellow (`#FFD700` and friends) — it reads cheap.

## Type

- **Display** — Cormorant Garamond, 600/700. Headlines, the wordmark, figures. A serif
  is the entire reason this reads as a bullion house rather than a SaaS landing page.
- **Body** — Inter, 400/500. Tight, neutral, legible at small sizes.
- **Chinese** — system CJK stack (`PingFang TC` → `Microsoft JhengHei` → `Noto Sans TC`).
  Traditional characters only; this is a Hong Kong company serving HK and mainland
  clients, and their existing copy is already 繁體.
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
- **Prices are indicative, always labelled.** The spot figure is a reference, is
  timestamped, and says so in both languages. It is never presented as a dealable quote.
