"use client"

import Link from "next/link"
import { useNusslochZeit } from "@/hooks/use-nussloch-zeit"
import { hofladenStatus, statusText } from "@/lib/oeffnung"
import { cn } from "@/lib/utils"

export function StatusBadge({ className, kurz = false }: { className?: string; kurz?: boolean }) {
  const now = useNusslochZeit()
  const status = now ? hofladenStatus(now) : null
  const text = status ? statusText(status) : "Öffnungszeiten"

  return (
    <Link
      href="#wann-wo"
      aria-live="polite"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border bg-card/80 px-3 py-1.5 text-sm backdrop-blur transition-colors hover:bg-accent",
        className
      )}
    >
      <span className="relative flex size-2.5">
        {status?.offen && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:hidden" />
        )}
        <span
          className={cn(
            "relative inline-flex size-2.5 rounded-full",
            status === null ? "bg-muted-foreground/40" : status.offen ? "bg-primary" : "bg-terra"
          )}
        />
      </span>
      <span>{kurz && status ? (status.offen ? `Offen bis ${status.bis}` : "Geschlossen") : text}</span>
    </Link>
  )
}
