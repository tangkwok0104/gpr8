/**
 * Single source of truth for the company's contact details.
 *
 * These strings appear in the header, footer, contact page, structured data, and the
 * contact form's fallback error message. Changing the email in one place changes it
 * everywhere — which is the whole point, given the previous site had the address
 * buried in an API route and nowhere on the page.
 */
export const SITE = {
  domain: "gpr8.com",
  url: "https://www.gpr8.com",
  email: "kent@globalpresources.com",
  phone: "+852 5617 8624",
  // E.164, for the tel: link — the display string above carries the spaces.
  phoneHref: "+85256178624",
  address: {
    en: "Unit 906, 18 Sung On Street, Hung Hom, Kowloon, Hong Kong",
    zh: "香港九龍紅磡祟安街18號半島廣場906室",
  },
} as const;

export const LOCALES = ["en", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
