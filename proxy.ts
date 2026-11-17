import { NextResponse, type NextRequest } from "next/server"

import { defaultLocale, hasLocale, LOCALE_COOKIE, locales, type Locale } from "@/lib/i18n-config"

// Ordena los idiomas de Accept-Language por su peso q (ej. "en-US,en;q=0.9,es;q=0.8").
function parseAcceptLanguage(header: string) {
  return header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";")
      const quality = params.find((param) => param.trim().startsWith("q="))
      return { language: tag.toLowerCase().split("-")[0], q: quality ? Number(quality.split("=")[1]) : 1 }
    })
    .filter(({ language, q }) => language && q > 0)
    .sort((a, b) => b.q - a.q)
    .map(({ language }) => language)
}

function getPreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  if (cookieLocale && hasLocale(cookieLocale)) return cookieLocale

  const accepted = parseAcceptLanguage(request.headers.get("accept-language") ?? "")
  return accepted.find(hasLocale) ?? defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )
  if (hasLocalePrefix) return

  const url = request.nextUrl.clone()
  url.pathname = `/${getPreferredLocale(request)}${pathname === "/" ? "" : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Excluye internos de Next y archivos con extensión (CV, favicon, sitemap.xml, robots.txt).
  matcher: ["/((?!_next|.*\\..*).*)"],
}
