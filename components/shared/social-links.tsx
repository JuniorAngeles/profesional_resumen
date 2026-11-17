import { buttonVariants } from "@/components/ui/button"
import type { Social } from "@/lib/content"
import { AppIcon } from "@/components/icons/app-icon"
import { cn } from "@/lib/utils"

type SocialLinksProps = {
  socials: Social[]
  className?: string
}

export function SocialLinks({ socials, className }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {socials.map((social) => {
        const isExternal = social.url.startsWith("http")
        return (
          <li key={social.label}>
            <a
              href={social.url}
              aria-label={social.label}
              title={social.label}
              className={buttonVariants({ variant: "ghost", size: "icon" })}
              {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
            >
              <AppIcon name={social.icon} className="size-4.5" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
