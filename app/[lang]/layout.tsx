import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { getContent, siteUrl } from "@/lib/content"
import { defaultLocale, localeConfig, locales, otherLocale } from "@/lib/i18n"
import { getI18n, getLocale } from "@/lib/locale"
import { getPersonJsonLd } from "@/lib/seo"
import { THEME_INIT_SCRIPT } from "@/lib/theme"

import "../globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const { site, profile } = getContent(locale)
  const alternate = otherLocale(locale)

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: site.title,
      template: site.titleTemplate,
    },
    description: site.description,
    keywords: site.keywords,
    authors: [{ name: profile.name, url: siteUrl }],
    creator: profile.name,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((lang) => [lang, `/${lang}`])),
        "x-default": `/${defaultLocale}`,
      },
    },
    openGraph: {
      type: "profile",
      locale: localeConfig[locale].ogLocale,
      alternateLocale: localeConfig[alternate].ogLocale,
      url: `/${locale}`,
      siteName: profile.name,
      title: site.title,
      description: site.description,
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const { locale, t, content } = await getI18n()

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getPersonJsonLd(content, locale)) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:ring-2 focus:ring-ring"
        >
          {t.common.skipToContent}
        </a>
        <Navbar />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
