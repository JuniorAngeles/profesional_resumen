"use client"

import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { THEME_STORAGE_KEY } from "@/lib/theme"

export type ThemeToggleLabels = { toggle: string; title: string }

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark")
  try {
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light")
  } catch {
    // El almacenamiento puede estar bloqueado (modo privado); el tema solo dura esta visita.
  }
}

export function ThemeToggle({ labels }: { labels: ThemeToggleLabels }) {
  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={labels.toggle} title={labels.title}>
      <Sun className="size-4.5 dark:hidden" />
      <Moon className="hidden size-4.5 dark:block" />
    </Button>
  )
}
