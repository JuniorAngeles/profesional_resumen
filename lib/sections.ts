// IDs neutros (no dependen del idioma) para que /es#projects y /en#projects apunten a la misma sección.
export const sectionIds = {
  home: "home",
  about: "about",
  skills: "skills",
  projects: "projects",
  experience: "experience",
  cv: "cv",
  contact: "contact",
} as const

export const navSections = ["about", "skills", "projects", "experience", "cv", "contact"] as const
