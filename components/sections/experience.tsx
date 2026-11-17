import { Reveal } from "@/components/shared/reveal"
import { Section } from "@/components/shared/section"
import { TimelineItem } from "@/components/shared/timeline-item"
import { format } from "@/lib/i18n"
import { getI18n } from "@/lib/locale"
import { sectionIds } from "@/lib/sections"

const groupTypes = ["work", "education"] as const

export async function Experience() {
  const { t, content } = await getI18n()

  return (
    <Section id={sectionIds.experience} eyebrow={t.experience.eyebrow} title={t.experience.title} className="bg-muted/30">
      <div className="grid gap-14 lg:grid-cols-[2fr_1fr]">
        {groupTypes.map((type) => {
          const items = content.experience.filter((item) => item.type === type)
          if (items.length === 0) return null

          return (
            <div key={type}>
              <h3 className="mb-6 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                {t.experience[type]}
              </h3>
              <ol className="relative before:absolute before:top-2 before:bottom-2 before:left-3.25 before:w-px before:bg-border">
                {items.map((item, index) => (
                  <li key={`${item.organization}-${item.role}`}>
                    <Reveal delay={index * 0.08}>
                      <TimelineItem
                        item={item}
                        stackLabel={format(t.experience.stackLabel, { organization: item.organization })}
                      />
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
