import { ArrowUpRight } from "lucide-react"

import { AppIcon } from "@/components/icons/app-icon"
import { ContactForm } from "@/components/shared/contact-form"
import { Reveal } from "@/components/shared/reveal"
import { Section } from "@/components/shared/section"
import { getI18n } from "@/lib/locale"
import { sectionIds } from "@/lib/sections"

export async function Contact() {
  const { locale, t, content } = await getI18n()

  return (
    <Section
      id={sectionIds.contact}
      eyebrow={t.contact.eyebrow}
      title={t.contact.title}
      description={t.contact.description}
      className="bg-muted/30"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        <Reveal>
          <ul className="grid gap-3">
            {content.profile.socials.map((social) => {
              const isExternal = social.url.startsWith("http")
              const display = social.url.replace(/^(mailto:|https?:\/\/(www\.)?)/, "")

              return (
                <li key={social.label}>
                  <a
                    href={social.url}
                    className="group flex items-center gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-brand/40"
                    {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                      <AppIcon name={social.icon} className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{social.label}</span>
                      <span className="block truncate text-sm text-muted-foreground">{display}</span>
                    </span>
                    <ArrowUpRight
                      className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          <ContactForm locale={locale} labels={t.contact.form} />
        </Reveal>
      </div>
    </Section>
  )
}
