"use client"

import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog"
import type { ProjectVideo } from "@/lib/content"

type ProjectVideoDialogProps = {
  video: ProjectVideo
  title: string
  closeLabel: string
}

// El contenido se monta solo al abrir el diálogo: el video no se descarga antes y se detiene al cerrarlo.
export function ProjectVideoDialog({ video, title, closeLabel }: ProjectVideoDialogProps) {
  return (
    <DialogContent showCloseButton={false} className="gap-3 bg-card p-3 sm:max-w-4xl sm:p-4">
      <div className="flex items-center justify-between gap-4 pl-1">
        <DialogTitle className="text-base font-semibold">{title}</DialogTitle>
        <DialogClose render={<Button variant="ghost" size="icon-sm" aria-label={closeLabel} />}>
          <XIcon />
        </DialogClose>
      </div>
      <div className="aspect-video overflow-hidden rounded-lg bg-black">
        {video.type === "youtube" ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="size-full"
          />
        ) : (
          <video
            src={video.src}
            poster={video.poster}
            controls
            autoPlay
            playsInline
            className="size-full object-contain"
          />
        )}
      </div>
    </DialogContent>
  )
}
