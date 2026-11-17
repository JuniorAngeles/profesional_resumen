"use client"

import { Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { LanguageSwitcher, type LanguageSwitchProps } from "./language-switcher"
import { ThemeToggle, type ThemeToggleLabels } from "./theme-toggle"

type NavLink = { label: string; href: string }

type NavbarClientProps = {
  brand: string
  initials: string
  homeHref: string
  links: NavLink[]
  labels: { nav: string; openMenu: string; closeMenu: string }
  themeLabels: ThemeToggleLabels
  languageSwitch: LanguageSwitchProps
}

export function NavbarClient({
  brand,
  initials,
  homeHref,
  links,
  labels,
  themeLabels,
  languageSwitch,
}: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:pt-4">
      <nav
        aria-label={labels.nav}
        className={cn(
          "mx-auto flex h-14 max-w-5xl items-center justify-between rounded-2xl border px-3 transition-all duration-300 sm:px-4",
          isScrolled || isOpen
            ? "border-border bg-background/80 shadow-sm backdrop-blur-md"
            : "border-transparent bg-transparent"
        )}
      >
        <a href={homeHref} className="flex items-center gap-2 font-semibold" onClick={closeMenu}>
          <span className="grid size-8 place-items-center rounded-lg bg-foreground text-xs font-bold text-background">
            {initials}
          </span>
          <span className="hidden sm:inline">{brand}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <LanguageSwitcher {...languageSwitch} />
          <ThemeToggle labels={themeLabels} />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? labels.closeMenu : labels.openMenu}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-2 max-w-5xl rounded-2xl border bg-background/95 p-2 shadow-lg backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
