import en from "@/content/i18n/en.json"
import es from "@/content/i18n/es.json"
import type { Locale } from "@/lib/i18n-config"

export { defaultLocale, hasLocale, LOCALE_COOKIE, locales, type Locale } from "@/lib/i18n-config"

export const localeConfig: Record<Locale, { label: string; ogLocale: string }> = {
  es: { label: "ES", ogLocale: "es_DO" },
  en: { label: "EN", ogLocale: "en_US" },
}

export type Dictionary = typeof es

// `en` se tipa como Dictionary para que TypeScript avise si le falta una clave.
const dictionaries: Record<Locale, Dictionary> = { es, en }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export function otherLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es"
}

// Reemplaza marcadores como {name} por sus valores: format("Hola {name}", { name: "Ana" }).
export function format(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match)
}
