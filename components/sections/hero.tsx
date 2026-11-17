import { ArrowRight, Download, MapPin } from "lucide-react"
import Image from "next/image"

import { SocialLinks } from "@/components/shared/social-links"
import { buttonVariants } from "@/components/ui/button"
import { getI18n } from "@/lib/locale"
import { sectionIds } from "@/lib/sections"
import { cn } from "@/lib/utils"

// Animación solo con CSS: el hero es el LCP y no debe esperar a que hidrate JavaScript.
const enter = "animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700"

export async function Hero() {
  const { t, content } = await getI18n()
  const { profile } = content

  return (
    <section id={sectionIds.home} aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--brand)_16%,transparent),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)] bg-size-[48px_48px] opacity-40"
      />

      <div className="mx-auto grid min-h-svh max-w-7xl content-center items-center gap-12 px-4 pt-28 pb-16 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className={cn(enter, "relative mx-auto size-56 sm:size-64 lg:order-last lg:size-90 xl:size-95")}>
          <div
            aria-hidden="true"
            className="absolute -inset-6 -z-10 rounded-full bg-brand/25 blur-3xl dark:bg-brand/20"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border-2 border-brand/40 sm:translate-x-4 sm:translate-y-4"
          />
          <Image
            src={profile.photo.src}
            alt={profile.photo.alt}
            width={460}
            height={460}
            sizes="(min-width: 1280px) 380px, (min-width: 1024px) 360px, (min-width: 640px) 256px, 224px"
            loading="eager"
            fetchPriority="high"
            className="relative size-full rounded-3xl border object-cover shadow-2xl ring-1 ring-brand/30 ring-offset-4 ring-offset-background"
          />
        </div>

        <div className="flex flex-col">
          <p className={cn(enter, "mb-6 inline-flex w-fit items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur sm:text-sm")}>
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-brand" />
            </span>
            {profile.availability}
          </p>

          <p className={cn(enter, "mb-3 text-lg text-muted-foreground delay-75 sm:text-xl")}>
            {profile.greeting}
          </p>

          <h1
            id="hero-title"
            className={cn(enter, "text-4xl font-bold tracking-tight text-balance delay-100 sm:text-6xl lg:text-7xl")}
          >
            {profile.name}
            <span className="mt-2 block text-muted-foreground">{profile.role}</span>
          </h1>

          <p className={cn(enter, "mt-6 max-w-2xl text-lg font-medium text-pretty delay-150 sm:text-xl")}>
            {profile.headline}
          </p>
          <p className={cn(enter, "mt-3 max-w-2xl text-base text-pretty text-muted-foreground delay-200 sm:text-lg")}>
            {profile.summary}
          </p>

          <div className={cn(enter, "mt-8 flex flex-col gap-3 delay-300 sm:flex-row sm:items-center")}>
            <a href={`#${sectionIds.projects}`} className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}>
              {t.hero.viewProjects}
              <ArrowRight data-icon="inline-end" />
            </a>
            <a
              href={profile.cv.file}
              download={profile.cv.downloadName}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-5")}
            >
              <Download data-icon="inline-start" />
              {t.hero.downloadCv}
            </a>
            <a href={`#${sectionIds.cv}`} className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "h-11 px-5")}>
              {t.hero.previewCv}
            </a>
          </div>

          <div className={cn(enter, "mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 delay-500")}>
            <SocialLinks socials={profile.socials} className="-ml-2" />
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4" aria-hidden="true" />
              {profile.location}
            </span>
          </div>

          <dl className={cn(enter, "mt-14 grid max-w-xl grid-cols-3 gap-4 delay-700")}>
            {profile.stats.map((stat) => (
              <div key={stat.label} className="border-l pl-4">
                <dt className="text-xs text-muted-foreground sm:text-sm">{stat.label}</dt>
                <dd className="order-first text-2xl font-bold sm:text-3xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
