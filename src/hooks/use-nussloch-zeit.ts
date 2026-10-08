"use client"

import { useEffect, useState } from "react"
import type { TZDate } from "@date-fns/tz"
import { jetztInNussloch } from "@/lib/oeffnung"

// Erst nach dem Mounten gesetzt, damit Server- und Client-HTML gleich bleiben.
export function useNusslochZeit() {
  const [now, setNow] = useState<TZDate | null>(null)
  useEffect(() => {
    setNow(jetztInNussloch())
    const id = setInterval(() => setNow(jetztInNussloch()), 30_000)
    return () => clearInterval(id)
  }, [])
  return now
}
