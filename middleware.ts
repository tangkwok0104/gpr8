import { NextRequest, NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "./app/lib/site";

/**
 * Traditional Chinese is the default. Only a visitor whose browser asks for Simplified
 * (zh-CN / zh-Hans / zh-SG) or plain English gets moved off it.
 */
function preferredLocale(req: NextRequest): Locale {
  const header = req.headers.get("accept-language")?.toLowerCase() ?? "";

  if (/zh-(cn|sg|hans)|zh-hans/.test(header)) return "zh-hans";
  if (/\bzh\b|zh-(hk|tw|mo|hant)/.test(header)) return "zh-hant";
  if (header.includes("en")) return "en";

  return DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${preferredLocale(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|img|favicon.ico|robots.txt|sitemap.xml).*)"],
};
