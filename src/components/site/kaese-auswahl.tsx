import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/site/reveal"
import { kaese, kategorien } from "@/lib/data"

// Querschnitt durch das Sortiment, je Art mindestens eine Sorte
const auswahl = ["natur", "provence", "camembert", "asche", "fetzick", "hart"]

export function KaeseAuswahl() {
  const sorten = auswahl.map((id) => kaese.find((k) => k.id === id)!)
  const label = Object.fromEntries(kategorien.map((k) => [k.id, k.label]))

  return (
    <section id="kaese" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <p className="mb-3 text-sm font-medium tracking-widest text-terra uppercase">Unser Käse</p>
            <h2 className="max-w-2xl text-4xl font-medium tracking-tight text-balance sm:text-5xl">
              Von zart und frisch bis acht Wochen gereift
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              {kaese.length} Sorten aus der Milch unserer eigenen Ziegen. Eine kleine Auswahl:
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

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorten.map((k, i) => (
            <li key={k.id}>
              <Reveal delay={i * 0.04} className="h-full">
                <Link
                  href={`/kaese?art=${k.kategorie}`}
                  className="group flex h-full flex-col rounded-2xl border bg-card p-6 transition-[border-color,box-shadow] hover:border-primary hover:shadow-md"
                >
                  <span className="text-xs text-muted-foreground">{label[k.kategorie]}</span>
                  <h3 className="mt-2 text-2xl font-medium">{k.name}</h3>
                  <p className="mt-2 text-muted-foreground">{k.beschreibung}</p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="h-12 rounded-full px-6 text-base">
            <Link href="/kaese">
              Ganzes Sortiment & Käseplatte <ArrowRight />
            </Link>
          </Button>
          {kategorien.map((k) => (
            <Button key={k.id} asChild variant="outline" className="rounded-full bg-transparent">
              <Link href={`/kaese?art=${k.id}`}>{k.label}</Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
