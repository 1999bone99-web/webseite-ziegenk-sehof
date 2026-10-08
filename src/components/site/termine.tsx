"use client"

import { format } from "date-fns"
import { de } from "date-fns/locale"
import { CalendarDays, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/site/reveal"
import { useNusslochZeit } from "@/hooks/use-nussloch-zeit"
import { hof, termine, type Termin } from "@/lib/data"

export function Termine() {
  const now = useNusslochZeit()
  const heute = now ? format(now, "yyyy-MM-dd") : null
  const kommend = heute ? termine.filter((t) => t.datum >= heute) : termine
  const vergangen = heute ? termine.filter((t) => t.datum < heute).reverse() : []

  return (
    <section id="termine" className="border-t bg-card py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="mb-3 text-sm font-medium tracking-widest text-terra uppercase">Termine</p>
          <h2 className="text-4xl font-medium tracking-tight text-balance sm:text-5xl">Auf den Hof kommen</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Führungen durch den Stall, Käseverkostungen, Kochkurse und unser Stand auf den Naturparkmärkten.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {kommend.length > 0 ? (
            <TerminListe liste={kommend} />
          ) : (
            <div className="rounded-2xl border border-dashed bg-background p-8">
              <CalendarDays className="size-8 text-primary" />
              <h3 className="mt-4 text-2xl font-medium">Neue Termine folgen</h3>
              <p className="mt-2 text-muted-foreground">
                Für dieses Jahr sind alle Veranstaltungen vorbei. Fragen Sie gern telefonisch nach, was als
                Nächstes geplant ist.
              </p>
              <Button asChild variant="outline" className="mt-5 rounded-full">
                <a href={hof.telefonHref}>
                  <Phone /> {hof.telefon}
                </a>
              </Button>
            </div>
          )}

          {vergangen.length > 0 && (
            <details className="group mt-8">
              <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                Rückblick: {vergangen.length} vergangene Termine
              </summary>
              <div className="mt-4 opacity-70">
                <TerminListe liste={vergangen} />
              </div>
            </details>
          )}
        </Reveal>
      </div>
    </section>
  )
}

function TerminListe({ liste }: { liste: Termin[] }) {
  return (
    <Accordion type="single" collapsible className="flex flex-col gap-3">
      {liste.map((t) => {
        const d = new Date(`${t.datum}T12:00:00`)
        return (
          <AccordionItem key={t.datum + t.titel} value={t.datum + t.titel} className="rounded-2xl border bg-background px-5 last:border-b">
            <AccordionTrigger className="items-center gap-4 py-4 hover:no-underline">
              <div className="flex items-center gap-4 text-left">
                <div className="flex w-14 shrink-0 flex-col items-center rounded-xl bg-secondary py-1.5">
                  <span className="text-xs text-muted-foreground uppercase">{format(d, "MMM", { locale: de })}</span>
                  <span className="font-serif text-2xl leading-none font-medium">{format(d, "d")}</span>
                </div>
                <div>
                  <p className="font-serif text-lg font-medium">{t.titel}</p>
                  <p className="text-sm font-normal text-muted-foreground">
                    {format(d, "EEEE", { locale: de })}
                    {t.zeit && ` · ${t.zeit}`}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-[4.5rem] text-base text-muted-foreground">
              {t.ort && <p className="mb-1 font-medium text-foreground">{t.ort}</p>}
              {t.text && <p>{t.text}</p>}
              {t.preis && (
                <Badge variant="secondary" className="mt-3">
                  {t.preis}
                </Badge>
              )}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
