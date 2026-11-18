import { ImageResponse } from "next/og"

import { getContent } from "@/lib/content"
import { defaultLocale } from "@/lib/i18n"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  const { profile } = getContent(defaultLocale)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#fafafa",
          fontSize: 84,
          fontWeight: 700,
          letterSpacing: -3,
          fontFamily: "sans-serif",
        }}
      >
        {profile.initials}
      </div>
    ),
    size
  )
}
