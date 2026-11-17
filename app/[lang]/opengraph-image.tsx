import { ImageResponse } from "next/og"

import { getContent } from "@/lib/content"
import { defaultLocale, hasLocale, locales } from "@/lib/i18n"

export const alt = "Junior Angeles"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const { profile } = getContent(hasLocale(lang) ? lang : defaultLocale)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 32, color: "#34d399", marginBottom: 24 }}>{profile.role}</div>
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>{profile.name}</div>
        <div style={{ fontSize: 34, color: "#a3a3a3", marginTop: 24, maxWidth: 980 }}>
          {profile.headline}
        </div>
      </div>
    ),
    size
  )
}
