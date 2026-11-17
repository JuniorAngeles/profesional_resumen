"use client"

import { Languages } from "lucide-react"
import type { MouseEvent } from "react"

import { buttonVariants } from "@/components/ui/button"
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n-config"

export type LanguageSwitchProps = {
  targetLocale: Locale
  label: string
  ariaLabel: string
}

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365

export function LanguageSwitcher({ targetLocale, label, ariaLabel }: LanguageSwitchProps) {
  // Conserva la sección actual (#projects) y recuerda la elección para las visitas a "/".
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.href = `/${targetLocale}${window.location.hash}`
    document.cookie = `${LOCALE_COOKIE}=${targetLocale}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; SameSite=Lax`
  }

  return (
    <a
      href={`/${targetLocale}`}
      hrefLang={targetLocale}
      onClick={handleClick}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={buttonVariants({ variant: "ghost", size: "sm" })}
    >
      <Languages data-icon="inline-start" aria-hidden="true" />
      {label}
    </a>
  )
}
