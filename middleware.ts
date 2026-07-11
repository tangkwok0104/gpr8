import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "zh"] as const;
const DEFAULT_LOCALE = "en";

/**
 * Hong Kong and mainland visitors land on Chinese; everyone else on English.
 * Traditional characters throughout — this is a Hong Kong company.
 */
function preferredLocale(req: NextRequest): string {
  const header = req.headers.get("accept-language")?.toLowerCase() ?? "";
  if (header.includes("zh")) return "zh";
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
