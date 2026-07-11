import type { Locale } from "./site";

const dictionaries = {
  "zh-hant": () => import("../dictionaries/zh-hant.json").then((m) => m.default),
  "zh-hans": () => import("../dictionaries/zh-hans.json").then((m) => m.default),
  en: () => import("../dictionaries/en.json").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
