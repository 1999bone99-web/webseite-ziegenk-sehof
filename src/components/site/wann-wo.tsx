"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Store, Tent, UtensilsCrossed, ShoppingBasket } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/site/reveal"
import { useNusslochZeit } from "@/hooks/use-nussloch-zeit"
import { naechsterVerkaufstag } from "@/lib/oeffnung"
import { bezugsquellen, hofladenZeiten, maerkte, wochentage } from "@/lib/data"
import { cn } from "@/lib/utils"

const START = 7 * 60
const ENDE = 20 * 60

function prozent(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number)
  return ((h * 60 + m - START) / (ENDE - START)) * 100
}

export function WannWo() {
  const now = useNusslochZeit()
  const [tag, setTag] = useState("4")

  useEffect(() => {
    if (now) setTag(String(naechsterVerkaufstag(now)))
    // nur einmal beim ersten Wert vorauswählen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now === null])

  const heute = now?.getDay()
  const jetztMin = now ? now.getHours() * 60 + now.getMinutes() : null

  return (
    <section id="wann-wo" className="papier border-y bg-secondary/50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="mb-3 text-sm font-medium tracking-widest text-terra uppercase">Wann & wo</p>
          <h2 className="max-w-2xl text-4xl font-medium tracking-tight text-balance sm:text-5xl">
            Drei Tage die Woche: morgens auf dem Markt, nachmittags im Hofladen
          </h2>
        </Reveal>

        <Tabs value={tag} onValueChange={setTag} className="mt-12">
          <TabsList className="h-12 w-full max-w-md rounded-full bg-card p-1 shadow-sm">
            {hofladenZeiten.map((z) => (
              <TabsTrigger
                key={z.tag}
                value={String(z.tag)}
                className="rounded-full text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {wochentage[z.tag]}
                {heute === z.tag && (
                  <span className="ml-1 rounded-full bg-terra px-1.5 text-[10px] tracking-wide text-terra-foreground uppercase">
                    heute
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {hofladenZeiten.map((z) => {
            const markt = maerkte.find((m) => m.tag === z.tag)!
            const istHeute = heute === z.tag
            return (
              <TabsContent key={z.tag} value={String(z.tag)} className="mt-6">
                <Card className="overflow-hidden rounded-2xl py-0">
                  <CardContent className="p-0">
                    {/* Tagesleiste */}
                    <div className="border-b px-6 pt-8 pb-6">
                      <div className="relative h-14 rounded-xl bg-muted">
                        <Segment von={markt.von} bis={markt.bis} className="bg-himmel" label={`Markt ${markt.stadt}`} />
                        <Segment von={z.von} bis={z.bis} className="bg-primary text-primary-foreground" label="Hofladen" />
                        {istHeute && jetztMin !== null && jetztMin >= START && jetztMin <= ENDE && (
                          <div
                            className="absolute -top-3 -bottom-3 w-0.5 bg-terra"
                            style={{ left: `${((jetztMin - START) / (ENDE - START)) * 100}%` }}
                          >
                            <span className="absolute -top-5 left-1/2 -translate-x-1/2 rounded bg-terra px-1.5 text-[11px] whitespace-nowrap text-terra-foreground">
                              jetzt
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-muted-foreground tabular-nums">
                        {["7", "10", "13", "16", "20"].map((h) => (
                          <span key={h}>{h} Uhr</span>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2">
                      <div className="flex gap-4 p-6 md:border-r">
                        <Tent className="mt-1 size-6 shrink-0 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Vormittags · {markt.von}–{markt.bis} Uhr</p>
                          <h3 className="mt-1 text-2xl font-medium">Wochenmarkt {markt.stadt}</h3>
                          <p className="mt-1 text-muted-foreground">{markt.ort}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 border-t p-6 md:border-t-0">
                        <Store className="mt-1 size-6 shrink-0 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {z.tag === 6 ? "Ganztags" : "Nachmittags"} · {z.von}–{z.bis} Uhr
                          </p>
                          <h3 className="mt-1 text-2xl font-medium">Hofladen Nußloch</h3>
                          <p className="mt-1 text-muted-foreground">Direkt am Hof, an der L594 zwischen Leimen und Nußloch</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )
          })}
        </Tabs>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Image
            src="/images/verkaufswagen.jpg"
            alt="Verkaufswagen des Nußlocher Ziegenkäsehofs auf dem Wochenmarkt"
            width={500}
            height={250}
            className="h-full w-full rounded-2xl object-cover"
          />
          <Image
            src="/images/marktstand-auslage.jpg"
            alt="Auslage mit Käse am Marktstand"
            width={500}
            height={250}
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Foto rechts: Gabriele Henn</p>

        <Bezugsquellen />
      </div>
    </section>
  )
}

function Segment({ von, bis, className, label }: { von: string; bis: string; className: string; label: string }) {
  return (
    <div
      className={cn("absolute inset-y-1.5 flex items-center overflow-hidden rounded-lg px-3 text-sm font-medium", className)}
      style={{ left: `${prozent(von)}%`, width: `${prozent(bis) - prozent(von)}%` }}
      title={`${label}: ${von}–${bis} Uhr`}
    >
      <span className="truncate">{label}</span>
    </div>
  )
}

function Bezugsquellen() {
  return (
    <Reveal className="mt-20">
      <h3 className="text-3xl font-medium">Hofladen zu? Unseren Käse gibt es auch hier.</h3>
      <Tabs defaultValue="einzelhandel" className="mt-6">
        <TabsList className="h-10 rounded-full bg-card p-1">
          <TabsTrigger value="einzelhandel" className="rounded-full px-4">
            <ShoppingBasket /> Einzelhandel
          </TabsTrigger>
          <TabsTrigger value="restaurants" className="rounded-full px-4">
            <UtensilsCrossed /> Restaurants
          </TabsTrigger>
        </TabsList>
        {(["einzelhandel", "restaurants"] as const).map((art) => (
          <TabsContent key={art} value={art} className="mt-4">
            <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {bezugsquellen[art].map((b) => (
                <li key={b.name} className="border-b py-4">
                  <p className="font-medium">{b.name}</p>
                  <p className="text-sm text-muted-foreground">{b.adresse}</p>
                </li>
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </Reveal>
  )
}
