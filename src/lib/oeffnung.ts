import { TZDate } from "@date-fns/tz"
import { hofladenZeiten, maerkte, wochentage, type Oeffnung } from "@/lib/data"

const TZ = "Europe/Berlin"

function minuten(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number)
  return h * 60 + m
}

export function jetztInNussloch(date: Date = new Date()) {
  return new TZDate(date, TZ)
}

export type Status =
  | { offen: true; bis: string }
  | { offen: false; naechster: Oeffnung; heute: boolean; morgen: boolean }

export function hofladenStatus(now: TZDate = jetztInNussloch()): Status {
  const tag = now.getDay()
  const min = now.getHours() * 60 + now.getMinutes()

  const heute = hofladenZeiten.find((z) => z.tag === tag)
  if (heute && min >= minuten(heute.von) && min < minuten(heute.bis)) {
    return { offen: true, bis: heute.bis }
  }
  if (heute && min < minuten(heute.von)) {
    return { offen: false, naechster: heute, heute: true, morgen: false }
  }
  for (let i = 1; i <= 7; i++) {
    const t = (tag + i) % 7
    const z = hofladenZeiten.find((o) => o.tag === t)
    if (z) return { offen: false, naechster: z, heute: false, morgen: i === 1 }
  }
  throw new Error("Keine Öffnungszeiten hinterlegt")
}

export function statusText(s: Status) {
  if (s.offen) return `Hofladen jetzt geöffnet bis ${s.bis} Uhr`
  const wann = s.heute ? "heute" : s.morgen ? "morgen" : wochentage[s.naechster.tag].toLowerCase()
  return `Hofladen geschlossen · öffnet ${wann} um ${s.naechster.von} Uhr`
}

export function marktHeute(now: TZDate = jetztInNussloch()) {
  const min = now.getHours() * 60 + now.getMinutes()
  const m = maerkte.find((x) => x.tag === now.getDay())
  if (!m || min >= minuten(m.bis)) return null
  return m
}

// Tag (4, 5 oder 6), der im Wochenplan vorausgewählt wird
export function naechsterVerkaufstag(now: TZDate = jetztInNussloch()) {
  const tag = now.getDay()
  const min = now.getHours() * 60 + now.getMinutes()
  const heute = hofladenZeiten.find((z) => z.tag === tag)
  if (heute && min < minuten(heute.bis)) return tag
  for (let i = 1; i <= 7; i++) {
    const t = (tag + i) % 7
    if (hofladenZeiten.some((z) => z.tag === t)) return t
  }
  return 4
}
