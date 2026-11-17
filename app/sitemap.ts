import type { MetadataRoute } from "next"

import siteJson from "@/content/site.json"
import { siteUrl } from "@/lib/content"
import { locales } from "@/lib/i18n"

const languages = Object.fromEntries(locales.map((lang) => [lang, `${siteUrl}/${lang}`]))

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((lang) => ({
    url: `${siteUrl}/${lang}`,
    lastModified: siteJson.lastUpdated,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }))
}
