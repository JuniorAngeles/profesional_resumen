import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { Reveal } from "./reveal"

type SectionProps = {
  id: string
  eyebrow: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function Section({ id, eyebrow, title, description, children, className }: SectionProps) {
  const headingId = `${id}-title`

  return (
    <section id={id} aria-labelledby={headingId} className={cn("py-20 sm:py-28", className)}>
      <div className="mx-auto max-w-5xl px-4">
        <Reveal className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-sm text-brand">{eyebrow}</p>
          <h2 id={headingId} className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base text-pretty text-muted-foreground sm:text-lg">{description}</p>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
