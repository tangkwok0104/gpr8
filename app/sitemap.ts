import type { MetadataRoute } from "next";
import { LOCALES, SITE, DEFAULT_LOCALE } from "./lib/site";

const PAGES = ["", "/about", "/contact", "/privacy", "/terms"];

/**
 * Every page in every language, each carrying its alternates — so Google serves the
 * Traditional page to Hong Kong, the Simplified page to the mainland, and English to
 * everyone else, instead of picking one at random.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((lang) =>
    PAGES.map((page) => ({
      url: `${SITE.url}/${lang}${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? ("daily" as const) : ("monthly" as const),
      priority: page === "" ? (lang === DEFAULT_LOCALE ? 1 : 0.9) : 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [
            l === "zh-hant" ? "zh-Hant" : l === "zh-hans" ? "zh-Hans" : "en",
            `${SITE.url}/${l}${page}`,
          ]),
        ),
      },
    })),
  );
}
