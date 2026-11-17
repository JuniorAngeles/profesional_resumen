import { AppIcon } from "@/components/icons/app-icon"
import type { SkillGroup } from "@/lib/content"

import { TechList } from "./tech-list"

type SkillCardProps = {
  group: SkillGroup
  listLabel: string
}

export function SkillCard({ group, listLabel }: SkillCardProps) {
  return (
    <article className="h-full rounded-xl border bg-card p-5 transition-colors hover:border-brand/40">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-lg bg-brand/10 text-brand">
          <AppIcon name={group.icon} className="size-4.5" />
        </span>
        <h3 className="font-semibold">{group.category}</h3>
      </div>
      <TechList items={group.items} label={listLabel} />
    </article>
  )
}
