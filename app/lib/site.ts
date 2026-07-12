/**
 * Single source of truth for the company's contact details.
 *
 * These strings appear in the header, footer, contact page, structured data, and the
 * contact form's fallback error message. Changing the email in one place changes it
 * everywhere — which is the point, given the previous site had the address buried in
 * an API route and nowhere on the page.
 */
export const SITE = {
  domain: "gpr8.com",
  // Canonical is the APEX. www.gpr8.com 308-redirects here (which is also what the old
  // Hostinger site did), so every canonical tag, sitemap entry and hreflang must point
  // at the apex — pointing them at a URL that redirects is a self-inflicted SEO wound.
  url: "https://gpr8.com",
  email: "ops@globalpresources.com",
  phone: "+852 5617 8624",
  // E.164, for the tel: link — the display string above carries the spaces.
  phoneHref: "+85256178624",
  address: {
    "zh-hant": "香港九龍紅磡崇安街18號半島廣場906室",
    "zh-hans": "香港九龙红磡崇安街18号半岛广场906室",
    en: "Unit 906, 18 Sung On Street, Hung Hom, Kowloon, Hong Kong",
  },
} as const;

/**
 * Traditional Chinese first — it is the default. This is a Hong Kong company whose
 * clients are mostly Hong Kong and mainland Chinese; English is the third audience,
 * not the first.
 */
export const LOCALES = ["zh-hant", "zh-hans", "en"] as const;
export const DEFAULT_LOCALE = "zh-hant";
export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** For <html lang> and Intl formatters. */
export const HTML_LANG: Record<Locale, string> = {
  "zh-hant": "zh-Hant-HK",
  "zh-hans": "zh-Hans-CN",
  en: "en",
};

export const INTL_LOCALE: Record<Locale, string> = {
  "zh-hant": "zh-HK",
  "zh-hans": "zh-CN",
  en: "en-GB",
};
