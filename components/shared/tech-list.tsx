import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type TechListProps = {
  items: string[]
  label: string
  className?: string
}

export function TechList({ items, label, className }: TechListProps) {
  if (items.length === 0) return null

  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li key={item}>
          <Badge variant="secondary" className="font-mono text-[0.7rem]">
            {item}
          </Badge>
        </li>
      ))}
    </ul>
  )
}
