import type { SVGProps } from "react"

import { icons, type IconName } from "@/lib/icons"

type AppIconProps = SVGProps<SVGSVGElement> & { name: IconName }

export function AppIcon({ name, ...props }: AppIconProps) {
  const Icon = icons[name]
  return <Icon aria-hidden="true" {...props} />
}
