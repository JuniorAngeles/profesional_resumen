import { ArrowUpRight, Lock, Play } from "lucide-react"
import Image from "next/image"

import { GithubIcon } from "@/components/icons/brand-icons"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import type { Project, ProjectVideo, Repo } from "@/lib/content"
import { format, type Dictionary } from "@/lib/i18n"
import { cn } from "@/lib/utils"

import { ProjectVideoDialog } from "./project-video"
import { TechList } from "./tech-list"

type ProjectLabels = Dictionary["projects"]

type RepoLinkProps = {
  repo: Repo
  projectTitle: string
  labels: ProjectLabels
}

function RepoLink({ repo, projectTitle, labels }: RepoLinkProps) {
  if (repo.private) {
    return (
      <span
        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-dashed px-2.5 text-xs text-muted-foreground"
        title={labels.privateTitle}
      >
        <Lock className="size-3.5" aria-hidden="true" />
        {repo.label} · {labels.private}
      </span>
    )
  }

  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={format(labels.repoLabel, { project: projectTitle, repo: repo.label })}
      className={buttonVariants({ variant: "outline", size: "sm" })}
    >
      <GithubIcon data-icon="inline-start" />
      {repo.label}
    </a>
  )
}

function getPosterSrc(video: ProjectVideo) {
  return video.type === "youtube" ? `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg` : video.poster
}

type VideoThumbnailProps = {
  video: ProjectVideo
  label: string
}

function VideoThumbnail({ video, label }: VideoThumbnailProps) {
  const posterSrc = getPosterSrc(video)

  return (
    <DialogTrigger
      aria-label={label}
      className="group/video relative -mx-6 -mt-6 mb-5 block aspect-video overflow-hidden rounded-t-xl border-b bg-[linear-gradient(135deg,color-mix(in_oklch,var(--brand)_25%,var(--muted)),var(--muted))] outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {posterSrc && (
        <Image
          src={posterSrc}
          alt=""
          fill
          sizes="(min-width: 1024px) 480px, 100vw"
          className="object-cover transition-transform duration-500 group-hover/video:scale-105"
        />
      )}
      <span className="absolute inset-0 grid place-items-center bg-black/20 transition-colors group-hover/video:bg-black/30">
        <span className="grid size-14 place-items-center rounded-full bg-background/90 text-brand shadow-lg backdrop-blur transition-transform group-hover/video:scale-110">
          <Play className="size-6 translate-x-0.5 fill-current" aria-hidden="true" />
        </span>
      </span>
    </DialogTrigger>
  )
}

type ProjectCardProps = {
  project: Project
  labels: ProjectLabels
}

export function ProjectCard({ project, labels }: ProjectCardProps) {
  const { links, video } = project
  const videoTitle = format(labels.videoTitle, { project: project.title })

  const card = (
    <article
      className={cn(
        "group flex h-full flex-col rounded-xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg",
        project.featured && "ring-1 ring-brand/20"
      )}
    >
      {video && <VideoThumbnail video={video} label={videoTitle} />}

      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
        {project.featured && (
          <Badge variant="outline" className="border-brand/40 text-brand">
            {labels.featured}
          </Badge>
        )}
      </div>

      <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
      <p className="mt-1 text-sm font-medium text-brand">{project.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">
        {project.description}
      </p>

      {project.highlights.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-sm">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>
      )}

      <TechList
        items={project.stack}
        label={format(labels.stackLabel, { project: project.title })}
        className="mt-5"
      />

      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        {links.repos.map((repo) => (
          <RepoLink key={repo.url} repo={repo} projectTitle={project.title} labels={labels} />
        ))}
        {video && (
          <DialogTrigger aria-label={videoTitle} className={buttonVariants({ variant: "secondary", size: "sm" })}>
            <Play data-icon="inline-start" />
            {labels.watchVideo}
          </DialogTrigger>
        )}
        {links.demo && (
          <a
            href={links.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={format(labels.demoLabel, { project: project.title })}
            className={buttonVariants({ size: "sm" })}
          >
            {labels.demo}
            <ArrowUpRight data-icon="inline-end" />
          </a>
        )}
      </div>
    </article>
  )

  if (!video) return card

  return (
    <Dialog>
      {card}
      <ProjectVideoDialog video={video} title={videoTitle} closeLabel={labels.closeVideo} />
    </Dialog>
  )
}
