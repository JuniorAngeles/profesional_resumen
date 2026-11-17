// Configuración sin diccionarios: la usa el proxy, que no necesita cargar las traducciones.
export const locales = ["es", "en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "es"

// Cookie que guarda el idioma elegido con el selector; el proxy la prioriza sobre el navegador.
export const LOCALE_COOKIE = "NEXT_LOCALE"

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}
