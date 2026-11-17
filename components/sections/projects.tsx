import { GithubIcon } from "@/components/icons/brand-icons"
import { ProjectCard } from "@/components/shared/project-card"
import { Reveal } from "@/components/shared/reveal"
import { Section } from "@/components/shared/section"
import { buttonVariants } from "@/components/ui/button"
import type { Project } from "@/lib/content"
import { getI18n } from "@/lib/locale"
import { sectionIds } from "@/lib/sections"

// Los destacados van primero sin alterar el orden definido en projects.json.
function sortFeaturedFirst(projects: Project[]) {
  return [...projects.filter((project) => project.featured), ...projects.filter((project) => !project.featured)]
}

export async function Projects() {
  const { t, content } = await getI18n()
  const githubProfile = content.profile.socials.find((social) => social.icon === "github")

  return (
    <Section
      id={sectionIds.projects}
      eyebrow={t.projects.eyebrow}
      title={t.projects.title}
      description={t.projects.description}
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {sortFeaturedFirst(content.projects).map((project, index) => (
          <Reveal key={project.slug} delay={(index % 3) * 0.08} className="h-full">
            <ProjectCard project={project} labels={t.projects} />
          </Reveal>
        ))}
      </div>

      {githubProfile && (
        <Reveal className="mt-10 flex justify-center">
          <a
            href={githubProfile.url}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            <GithubIcon data-icon="inline-start" />
            {t.projects.moreOnGithub}
          </a>
        </Reveal>
      )}
    </Section>
  )
}
