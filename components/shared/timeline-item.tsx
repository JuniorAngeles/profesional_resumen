import { Briefcase, GraduationCap } from "lucide-react"

import type { ExperienceItem } from "@/lib/content"

import { TechList } from "./tech-list"

function formatPeriod(start: string | null, end: string | null) {
  if (start && end) return `${start} — ${end}`
  return start ?? end
}

type TimelineItemProps = {
  item: ExperienceItem
  stackLabel: string
}

export function TimelineItem({ item, stackLabel }: TimelineItemProps) {
  const Icon = item.type === "work" ? Briefcase : GraduationCap
  const period = formatPeriod(item.start, item.end)

  return (
    <div className="relative pb-10 pl-10 last:pb-0">
      <span
        className="absolute top-0 left-0 grid size-7 place-items-center rounded-full border bg-background text-brand"
        aria-hidden="true"
      >
        <Icon className="size-3.5" />
      </span>

      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className="font-semibold">
          {item.role} <span className="text-muted-foreground">· {item.organization}</span>
        </h3>
        {period && <p className="shrink-0 font-mono text-xs text-muted-foreground">{period}</p>}
      </div>
      <p className="mt-0.5 text-sm text-muted-foreground">{item.location}</p>

      {item.achievements.length > 0 && (
        <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground marker:text-brand">
          {item.achievements.map((achievement) => (
            <li key={achievement}>{achievement}</li>
          ))}
        </ul>
      )}

      <TechList items={item.stack} label={stackLabel} className="mt-4" />
    </div>
  )
}
