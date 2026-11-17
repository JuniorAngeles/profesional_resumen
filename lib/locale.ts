import { notFound } from "next/navigation"
import { lang } from "next/root-params"

import { getContent } from "@/lib/content"
import { getDictionary, hasLocale, type Locale } from "@/lib/i18n"

// Solo para Server Components: lee el idioma del segmento [lang] sin pasarlo por props.
export async function getLocale(): Promise<Locale> {
  const value = await lang()
  if (!hasLocale(value)) notFound()
  return value
}

export async function getI18n() {
  const locale = await getLocale()
  return { locale, t: getDictionary(locale), content: getContent(locale) }
}
