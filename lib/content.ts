import { z } from "zod"

import experienceJson from "@/content/experience.json"
import profileJson from "@/content/profile.json"
import projectsJson from "@/content/projects.json"
import siteJson from "@/content/site.json"
import skillsJson from "@/content/skills.json"
import { locales, type Locale } from "@/lib/i18n"
import { iconNames } from "@/lib/icons"

const iconSchema = z.enum(iconNames)

// Arma los esquemas para un idioma: cada texto puede ser un string (igual en todos los idiomas)
// o un objeto { es, en } del que se toma la versión del idioma pedido.
function createSchemas(locale: Locale) {
  const text = z
    .union([z.string(), z.object({ es: z.string().min(1), en: z.string().min(1) }).strict()])
    .transform((value) => (typeof value === "string" ? value : value[locale]))

  const site = z.object({
    url: z.url(),
    lastUpdated: z.iso.date(),
    titleTemplate: z.string().includes("%s"),
    title: text,
    description: text,
    keywords: z.array(text),
  })

  const social = z.object({ label: text, url: z.string(), icon: iconSchema })

  const profile = z.object({
    name: z.string(),
    initials: z.string().max(3),
    email: z.email(),
    role: text,
    location: text,
    availability: text,
    greeting: text,
    headline: text,
    summary: text,
    photo: z.object({
      src: z.string().startsWith("/"),
      alt: text,
    }),
    cv: z.object({
      file: text.pipe(z.string().startsWith("/")),
      downloadName: text,
      language: text,
      updatedAt: text,
    }),
    socials: z.array(social),
    stats: z.array(z.object({ value: z.string(), label: text })),
    about: z.object({
      title: text,
      paragraphs: z.array(text),
      focus: z.array(z.object({ icon: iconSchema, title: text, description: text })),
      values: z.array(text),
    }),
  })

  const skillGroup = z.object({
    category: text,
    icon: iconSchema,
    items: z.array(text).min(1),
  })

  const repo = z.object({ label: text, url: z.url(), private: z.boolean() })

  const video = z.discriminatedUnion("type", [
    z.object({
      type: z.literal("file"),
      src: z.string().startsWith("/"),
      poster: z.string().startsWith("/").optional(),
    }),
    z.object({ type: z.literal("youtube"), id: z.string().regex(/^[\w-]{11}$/) }),
  ])

  const project = z.object({
    slug: z.string(),
    title: text,
    tagline: text,
    description: text,
    highlights: z.array(text),
    stack: z.array(z.string()),
    featured: z.boolean(),
    year: z.string(),
    links: z.object({ repos: z.array(repo), demo: z.url().nullable() }),
    video: video.optional(),
  })

  const experienceItem = z.object({
    type: z.enum(["work", "education"]),
    role: text,
    organization: text,
    location: text,
    start: text.nullable(),
    end: text.nullable(),
    achievements: z.array(text),
    stack: z.array(z.string()),
  })

  return {
    site,
    profile,
    skills: z.array(skillGroup),
    projects: z.array(project),
    experience: z.array(experienceItem),
  }
}

// Falla el build con un mensaje legible cuando un JSON no es válido.
function parseContent<T>(schema: z.ZodType<T>, data: unknown, file: string, locale: Locale): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    throw new Error(`content/${file} no es válido (${locale}):\n${z.prettifyError(result.error)}`)
  }
  return result.data
}

function loadContent(locale: Locale) {
  const schemas = createSchemas(locale)
  return {
    site: parseContent(schemas.site, siteJson, "site.json", locale),
    profile: parseContent(schemas.profile, profileJson, "profile.json", locale),
    skills: parseContent(schemas.skills, skillsJson, "skills.json", locale),
    projects: parseContent(schemas.projects, projectsJson, "projects.json", locale),
    experience: parseContent(schemas.experience, experienceJson, "experience.json", locale),
  }
}

export type Content = ReturnType<typeof loadContent>
export type Site = Content["site"]
export type Profile = Content["profile"]
export type Social = Profile["socials"][number]
export type SkillGroup = Content["skills"][number]
export type Project = Content["projects"][number]
export type Repo = Project["links"]["repos"][number]
export type ProjectVideo = NonNullable<Project["video"]>
export type ExperienceItem = Content["experience"][number]

const contentByLocale = Object.fromEntries(
  locales.map((locale) => [locale, loadContent(locale)])
) as Record<Locale, Content>

export function getContent(locale: Locale): Content {
  return contentByLocale[locale]
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteJson.url
