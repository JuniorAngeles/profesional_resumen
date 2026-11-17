import { Check } from "lucide-react"

import { AppIcon } from "@/components/icons/app-icon"
import { Reveal } from "@/components/shared/reveal"
import { Section } from "@/components/shared/section"
import { getI18n } from "@/lib/locale"
import { sectionIds } from "@/lib/sections"

export async function About() {
  const { t, content } = await getI18n()
  const { about } = content.profile

  return (
    <Section id={sectionIds.about} eyebrow={t.about.eyebrow} title={about.title}>
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <Reveal className="space-y-4 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <div className="pt-4">
            <h3 className="mb-3 text-sm font-semibold text-foreground">{t.about.valuesTitle}</h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {about.values.map((value) => (
                <li key={value} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div>
          <h3 className="sr-only">{t.about.focusTitle}</h3>
          <ul className="grid gap-4">
            {about.focus.map((item, index) => (
              <li key={item.title}>
                <Reveal delay={index * 0.1} className="flex gap-4 rounded-xl border bg-card p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                    <AppIcon name={item.icon} className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
