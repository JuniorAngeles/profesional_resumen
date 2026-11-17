import { Reveal } from "@/components/shared/reveal"
import { Section } from "@/components/shared/section"
import { SkillCard } from "@/components/shared/skill-card"
import { format } from "@/lib/i18n"
import { getI18n } from "@/lib/locale"
import { sectionIds } from "@/lib/sections"

export async function Skills() {
  const { t, content } = await getI18n()

  return (
    <Section
      id={sectionIds.skills}
      eyebrow={t.skills.eyebrow}
      title={t.skills.title}
      description={t.skills.description}
      className="bg-muted/30"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.skills.map((group, index) => (
          <Reveal key={group.category} delay={(index % 3) * 0.08} className="h-full">
            <SkillCard group={group} listLabel={format(t.skills.listLabel, { category: group.category })} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
