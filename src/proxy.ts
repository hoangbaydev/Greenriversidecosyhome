import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, isValidLocale, LOCALE_COOKIE } from "@/lib/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

function withLocaleCookie(response: NextResponse, locale: string) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    const segment = pathname.split("/")[1];
    if (segment && !isValidLocale(segment)) {
      return NextResponse.redirect(
        new URL(`/${defaultLocale}${pathname}`, request.url)
      );
    }
    return withLocaleCookie(NextResponse.next(), segment!);
  }

  const preferred = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    preferred && isValidLocale(preferred) ? preferred : defaultLocale;

  const response = NextResponse.redirect(
    new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)
  );
  return withLocaleCookie(response, locale);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
