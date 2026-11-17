import { ArrowUpRight, Lock } from "lucide-react"

import { GithubIcon } from "@/components/icons/brand-icons"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import type { Project, Repo } from "@/lib/content"
import { format, type Dictionary } from "@/lib/i18n"
import { cn } from "@/lib/utils"

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

type ProjectCardProps = {
  project: Project
  labels: ProjectLabels
}

export function ProjectCard({ project, labels }: ProjectCardProps) {
  const { links } = project

  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg",
        project.featured && "ring-1 ring-brand/20"
      )}
    >
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
}
