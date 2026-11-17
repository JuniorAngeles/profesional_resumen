import { localeConfig, otherLocale } from "@/lib/i18n"
import { getI18n } from "@/lib/locale"
import { navSections, sectionIds } from "@/lib/sections"

import { NavbarClient } from "./navbar-client"

export async function Navbar() {
  const { locale, t, content } = await getI18n()
  const targetLocale = otherLocale(locale)

  return (
    <NavbarClient
      brand={content.profile.name}
      initials={content.profile.initials}
      homeHref={`#${sectionIds.home}`}
      links={navSections.map((section) => ({
        label: t.nav.links[section],
        href: `#${sectionIds[section]}`,
      }))}
      labels={{ nav: t.nav.label, openMenu: t.nav.openMenu, closeMenu: t.nav.closeMenu }}
      themeLabels={t.theme}
      languageSwitch={{
        targetLocale,
        label: localeConfig[targetLocale].label,
        ariaLabel: t.language.switchLabel,
      }}
    />
  )
}
