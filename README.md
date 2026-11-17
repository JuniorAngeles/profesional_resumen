# Portafolio — Junior Angeles

Portafolio personal construido con Next.js 16 (App Router), TypeScript, Tailwind CSS v4, componentes shadcn/ui (Base UI), `lucide-react` y `motion`.

## Inicio rápido

```bash
npm install
cp .env.example .env.local   # opcional: formulario de contacto y URL del sitio
npm run dev                  # http://localhost:3000
```

| Script | Uso |
|---|---|
| `dev` | Servidor de desarrollo |
| `build` / `start` | Build y servidor de producción |
| `lint` | ESLint |

## Editar el contenido

Todo el texto del sitio vive en `content/` y se valida con Zod en `lib/content.ts`. Si un JSON tiene un error, el build falla e indica qué campo corregir.

| Archivo | Contenido |
|---|---|
| `content/site.json` | URL y SEO (título, descripción, keywords) |
| `content/profile.json` | Nombre, rol, hero, sobre mí, estadísticas, redes y datos del CV |
| `content/skills.json` | Categorías de habilidades |
| `content/projects.json` | Proyectos: descripción, stack, repositorios (`private`) y `demo` |
| `content/experience.json` | Experiencia laboral (`work`) y formación (`education`) |
| `content/i18n/es.json`, `en.json` | Textos de la interfaz: botones, títulos de sección, formulario |

- **Íconos:** los campos `icon` aceptan los nombres definidos en `lib/icons.ts`. Para agregar uno nuevo, impórtalo de `lucide-react` y añádelo al objeto `icons`.
- **CV:** hay uno por idioma en `public/cv/` (`junior-angeles-cv-es.pdf` y `junior-angeles-cv-en.pdf`). Si cambias el nombre, actualiza `profile.json → cv.file`.
- **Repos privados:** con `"private": true` la tarjeta muestra la etiqueta "privado" sin enlace. Cámbialo a `false` cuando hagas público el repositorio.
- **Demo en vivo:** pon la URL en `links.demo` (o `null` para ocultar el botón).

## Idiomas (español e inglés)

El sitio vive en `/es` y `/en` (`app/[lang]/`). Al entrar a `/`, `proxy.ts` redirige según la cookie `NEXT_LOCALE` (la guarda el selector ES/EN del navbar) o, si no existe, según el idioma del navegador. Si no coincide con ninguno, usa español.

En los JSON de `content/`, cada texto puede escribirse de dos formas:

```json
"title": "Bloque ERP"
"tagline": { "es": "ERP para empresas constructoras", "en": "ERP for construction companies" }
```

Un string se muestra igual en los dos idiomas. Un objeto `{ "es", "en" }` debe tener ambas claves o el build falla.

Los textos de la interfaz están en `content/i18n/`. Las dos versiones deben tener las mismas claves: TypeScript avisa si a `en.json` le falta alguna que exista en `es.json`. Los marcadores como `{project}` se reemplazan con `format()` de `lib/i18n.ts`.

Para agregar un idioma: añádelo a `locales` en `lib/i18n-config.ts`, crea su diccionario en `content/i18n/`, agrega su clave en los objetos de idioma de los JSON y su entrada en `localeConfig` (`lib/i18n.ts`).

## Formulario de contacto

Usa una Server Action (`app/actions/contact.ts`) y [Resend](https://resend.com). Define `RESEND_API_KEY` y, opcionalmente, `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL`. Sin la clave, el formulario responde con un mensaje que muestra tu email.

## Estructura

```
app/[lang]/     layout raíz por idioma (SEO, tema), página e imagen Open Graph
app/            sitemap, robots y server actions
proxy.ts        redirección de "/" al idioma preferido
components/
  layout/       navbar, footer, botón de tema
  sections/     hero, about, skills, projects, experience, cv, contact
  shared/       piezas reutilizables (section, reveal, project-card, timeline-item, …)
  icons/        íconos de marca y AppIcon
  ui/           componentes shadcn/ui
content/        datos en JSON y diccionarios de la interfaz (i18n/)
lib/            contenido, i18n, SEO, tema, utilidades
public/cv/      CV en PDF por idioma
```
