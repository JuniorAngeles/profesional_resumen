import { Download, ExternalLink, FileText } from "lucide-react"

import { Reveal } from "@/components/shared/reveal"
import { Section } from "@/components/shared/section"
import { buttonVariants } from "@/components/ui/button"
import { format } from "@/lib/i18n"
import { getI18n } from "@/lib/locale"
import { sectionIds } from "@/lib/sections"
import { cn } from "@/lib/utils"

export async function Cv() {
  const { t, content } = await getI18n()
  const { profile } = content
  const { cv } = profile

  return (
    <Section id={sectionIds.cv} eyebrow={t.cv.eyebrow} title={t.cv.title} description={t.cv.description}>
      <Reveal className="overflow-hidden rounded-xl border bg-card">
        <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-brand/10 text-brand">
              <FileText className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold">{cv.downloadName}</p>
              <p className="text-xs text-muted-foreground">
                PDF · {cv.language} · {t.cv.updated} {cv.updatedAt}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href={cv.file}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "h-9")}
            >
              <ExternalLink data-icon="inline-start" />
              {t.cv.openNewTab}
            </a>
            <a href={cv.file} download={cv.downloadName} className={cn(buttonVariants(), "h-9")}>
              <Download data-icon="inline-start" />
              {t.cv.download}
            </a>
          </div>
        </div>

        {/* Los navegadores móviles no muestran PDF embebidos de forma fiable; ahí se usan los botones. */}
        <iframe
          src={`${cv.file}#view=FitH`}
          title={format(t.cv.previewTitle, { name: profile.name })}
          loading="lazy"
          className="hidden h-[80vh] max-h-275 w-full bg-muted md:block"
        />
        <p className="p-6 text-center text-sm text-muted-foreground md:hidden">{t.cv.mobileNotice}</p>
      </Reveal>
    </Section>
  )
}
