"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Check, Mail, Minus, Phone, Plus, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Reveal } from "@/components/site/reveal"
import { hof, kaese, kategorien, type Kaese, type KaeseKategorie } from "@/lib/data"
import { cn } from "@/lib/utils"

type Filter = "alle" | KaeseKategorie

const kategorieLabel = Object.fromEntries(kategorien.map((k) => [k.id, k.label])) as Record<KaeseKategorie, string>

export function KaeseFinder() {
  const art = useSearchParams().get("art")
  const [filter, setFilter] = useState<Filter>(
    kategorien.some((k) => k.id === art) ? (art as KaeseKategorie) : "alle"
  )
  const [auswahl, setAuswahl] = useState<string[]>([])
  const [sheetOffen, setSheetOffen] = useState(false)
  const reduce = useReducedMotion()

  const sichtbar = useMemo(
    () => (filter === "alle" ? kaese : kaese.filter((k) => k.kategorie === filter)),
    [filter]
  )

  const umschalten = (id: string) =>
    setAuswahl((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]))

  return (
    <section id="kaese" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <p className="mb-3 text-sm font-medium tracking-widest text-terra uppercase">Unser Käse</p>
            <h1 className="max-w-2xl text-4xl font-medium tracking-tight text-balance sm:text-5xl">
              Von zart und frisch bis acht Wochen gereift
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Alles aus der Milch unserer eigenen Ziegen. Stellen Sie sich nebenbei Ihre Käseplatte zusammen,
              wir bereiten sie vor und dekorieren sie gratis.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="hidden lg:block">
            <div className="relative w-64 rotate-3 overflow-hidden rounded-2xl border-[6px] border-card shadow-lg">
              <Image
                src="/images/frischkaese-toertchen.jpg"
                alt="Frischkäse-Törtchen mit Pfeffer, Kräutern und Fruchtauflage"
                width={500}
                height={250}
              />
            </div>
          </Reveal>
        </div>

        <div className="sticky top-16 z-30 sm:top-20 -mx-4 mt-12 overflow-x-auto bg-background/90 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-full sm:px-2">
          <ToggleGroup
            type="single"
            value={filter}
            onValueChange={(v) => v && setFilter(v as Filter)}
            variant="outline"
            aria-label="Nach Käseart filtern"
            className="w-max"
          >
            <ToggleGroupItem value="alle" className="px-4 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
              Alle <span className="ml-1 text-xs opacity-70">{kaese.length}</span>
            </ToggleGroupItem>
            {kategorien.map((k) => (
              <ToggleGroupItem
                key={k.id}
                value={k.id}
                className="px-4 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                {k.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <motion.ul layout={!reduce} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {sichtbar.map((k) => (
              <KaeseKarte
                key={k.id}
                k={k}
                gewaehlt={auswahl.includes(k.id)}
                onToggle={() => umschalten(k.id)}
                reduce={!!reduce}
              />
            ))}
          </AnimatePresence>
        </motion.ul>

        <p className="mt-8 text-sm text-muted-foreground">
          Je nach Jahreszeit gibt es nicht immer alle Sorten. Fragen Sie im Hofladen oder am Marktstand nach.
        </p>
      </div>

      <AnimatePresence>
        {auswahl.length > 0 && !sheetOffen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4"
          >
            <Button
              size="lg"
              onClick={() => setSheetOffen(true)}
              className="h-14 rounded-full bg-foreground px-6 text-base text-background shadow-2xl hover:bg-foreground/90"
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-terra text-sm text-terra-foreground">
                {auswahl.length}
              </span>
              Käseplatte anfragen
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <KaeseplatteSheet
        offen={sheetOffen}
        setOffen={setSheetOffen}
        auswahl={auswahl}
        entfernen={umschalten}
      />
    </section>
  )
}

function KaeseKarte({
  k,
  gewaehlt,
  onToggle,
  reduce,
}: {
  k: Kaese
  gewaehlt: boolean
  onToggle: () => void
  reduce: boolean
}) {
  return (
    <motion.li
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "group flex flex-col rounded-2xl border bg-card p-6 transition-[border-color,box-shadow] hover:shadow-md",
        gewaehlt && "border-primary ring-2 ring-primary/20"
      )}
    >
      <Badge variant="outline" className="mb-4 w-fit border-border font-normal text-muted-foreground">
        {kategorieLabel[k.kategorie]}
      </Badge>
      <h3 className="text-2xl font-medium">{k.name}</h3>
      <p className="mt-2 flex-1 text-muted-foreground">{k.beschreibung}</p>
      {k.hinweis && <p className="mt-3 text-xs text-muted-foreground/80">{k.hinweis}</p>}
      {k.platte && (
        <Button
          variant={gewaehlt ? "default" : "outline"}
          size="sm"
          onClick={onToggle}
          aria-pressed={gewaehlt}
          className="mt-5 w-fit rounded-full"
        >
          {gewaehlt ? <Check /> : <Plus />}
          {gewaehlt ? "Auf der Käseplatte" : "Auf die Käseplatte"}
        </Button>
      )}
    </motion.li>
  )
}

function KaeseplatteSheet({
  offen,
  setOffen,
  auswahl,
  entfernen,
}: {
  offen: boolean
  setOffen: (o: boolean) => void
  auswahl: string[]
  entfernen: (id: string) => void
}) {
  const [personen, setPersonen] = useState(4)
  const [notiz, setNotiz] = useState("")
  const sorten = kaese.filter((k) => auswahl.includes(k.id))

  const mailto = useMemo(() => {
    const body = [
      "Hallo Frau Schott, hallo Herr Kamann,",
      "",
      `ich hätte gern eine Käseplatte für etwa ${personen} Personen mit diesen Sorten:`,
      ...sorten.map((s) => `- ${s.name}`),
      "",
      notiz ? `Anmerkung: ${notiz}` : "Wunschtermin zum Abholen: ",
      "",
      "Viele Grüße",
    ].join("\n")
    return `mailto:${hof.email}?subject=${encodeURIComponent("Anfrage Käseplatte")}&body=${encodeURIComponent(body)}`
  }, [personen, sorten, notiz])

  return (
    <Sheet open={offen} onOpenChange={setOffen}>
      <SheetContent className="w-full bg-background sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl">Ihre Käseplatte</SheetTitle>
          <SheetDescription>
            Wir stellen die Platte nach Ihren Wünschen zusammen und beraten gern. Die Anfrage geht per E-Mail an
            den Hof, abgeschickt wird erst in Ihrem Mailprogramm.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4">
          <ul className="flex flex-col divide-y rounded-xl border bg-card">
            {sorten.length === 0 && <li className="p-4 text-sm text-muted-foreground">Noch keine Sorte gewählt.</li>}
            {sorten.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <span>{s.name}</span>
                <Button variant="ghost" size="icon-sm" onClick={() => entfernen(s.id)} aria-label={`${s.name} entfernen`}>
                  <X />
                </Button>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between">
            <span id="personen-label">Für wie viele Personen?</span>
            <div className="flex items-center gap-2" role="group" aria-labelledby="personen-label">
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => setPersonen((p) => Math.max(1, p - 1))}
                aria-label="Eine Person weniger"
              >
                <Minus />
              </Button>
              <span className="w-8 text-center font-serif text-xl tabular-nums" aria-live="polite">
                {personen}
              </span>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => setPersonen((p) => Math.min(80, p + 1))}
                aria-label="Eine Person mehr"
              >
                <Plus />
              </Button>
            </div>
          </div>

          <label className="flex flex-col gap-2">
            <span>Anmerkung (optional)</span>
            <textarea
              value={notiz}
              onChange={(e) => setNotiz(e.target.value)}
              rows={3}
              placeholder="z. B. Abholung am Samstag im Hofladen"
              className="rounded-md border bg-card px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
          </label>
        </div>

        <SheetFooter>
          <Button asChild size="lg" disabled={sorten.length === 0}>
            <a href={mailto}>
              <Mail /> Anfrage per E-Mail
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={hof.telefonHref}>
              <Phone /> Lieber anrufen: {hof.telefon}
            </a>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
