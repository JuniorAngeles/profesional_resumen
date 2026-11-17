import {
  Boxes,
  Cloud,
  Database,
  Gauge,
  Layers,
  Mail,
  Monitor,
  Server,
  Sparkles,
  Users,
} from "lucide-react"
import type { ComponentType, SVGProps } from "react"

import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons"

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

// Íconos que se pueden referenciar por nombre desde los archivos JSON de content/.
export const icons = {
  boxes: Boxes,
  cloud: Cloud,
  database: Database,
  gauge: Gauge,
  github: GithubIcon,
  layers: Layers,
  linkedin: LinkedinIcon,
  mail: Mail,
  monitor: Monitor,
  server: Server,
  sparkles: Sparkles,
  users: Users,
} satisfies Record<string, IconComponent>

export type IconName = keyof typeof icons

export const iconNames = Object.keys(icons) as [IconName, ...IconName[]]
