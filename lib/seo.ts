import type { Content } from "@/lib/content"
import { siteUrl } from "@/lib/content"
import type { Locale } from "@/lib/i18n"

// Datos estructurados schema.org para que los buscadores entiendan quién es el autor del sitio.
export function getPersonJsonLd({ profile }: Content, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: profile.summary,
    url: `${siteUrl}/${locale}`,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressCountry: "DO" },
    knowsLanguage: ["es", "en"],
    sameAs: profile.socials
      .filter((social) => social.url.startsWith("http"))
      .map((social) => social.url),
  }
}
