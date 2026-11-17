import { CurrentYear } from "@/components/shared/current-year"
import { SocialLinks } from "@/components/shared/social-links"
import { getI18n } from "@/lib/locale"

export async function Footer() {
  const { t, content } = await getI18n()

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © <CurrentYear /> {content.profile.name}. {t.footer.rights}
        </p>
        <SocialLinks socials={content.profile.socials} />
      </div>
    </footer>
  )
}
