import Image from "next/image"
import Link from "next/link"
import { Bus, Car, ExternalLink, Mail, Phone, Printer, TrainFront } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Reveal } from "@/components/site/reveal"
import { anfahrt, hof } from "@/lib/data"

const icons = { heidelberg: TrainFront, wiesloch: Bus, auto: Car }
const kartenSuche = encodeURIComponent("Nußlocher Ziegenkäsehof, Nußloch")

export function Kontakt() {
  return (
    <section id="kontakt" className="border-t-[6px] border-terra bg-primary py-24 text-primary-foreground sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <p className="mb-3 text-sm font-medium tracking-widest text-himmel uppercase">Kontakt & Anfahrt</p>
          <h2 className="text-4xl font-medium tracking-tight text-balance sm:text-5xl">Rufen Sie an oder kommen Sie vorbei</h2>

          <dl className="mt-10 space-y-5 text-lg">
            <div>
              <dt className="text-sm text-primary-foreground/70">Hof</dt>
              <dd>
                {hof.name}
                <br />
                {hof.inhaber}
                <br />
                {hof.ort}
              </dd>
            </div>
            <div className="flex flex-col gap-2">
              <a href={hof.telefonHref} className="flex items-center gap-3 underline-offset-4 hover:underline">
                <Phone className="size-5 text-himmel" /> {hof.telefon}
              </a>
              <span className="flex items-center gap-3 text-primary-foreground/80">
                <Printer className="size-5 text-himmel" /> Fax {hof.fax}
              </span>
              <a href={`mailto:${hof.email}`} className="flex items-center gap-3 underline-offset-4 hover:underline">
                <Mail className="size-5 text-himmel" /> {hof.email}
              </a>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <a href={`https://www.openstreetmap.org/search?query=${kartenSuche}`} target="_blank" rel="noopener noreferrer">
                Auf der Karte öffnen <ExternalLink />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href={hof.facebook} target="_blank" rel="noopener noreferrer">
                Facebook <ExternalLink />
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl bg-background text-foreground">
            <Image src="/images/hofladen-schild.jpg" alt="Gekacheltes Hofladen-Schild mit Glocke" width={500} height={250} className="w-full" />
            <div className="p-6">
              <h3 className="text-2xl font-medium">So finden Sie uns</h3>
              <Tabs defaultValue="heidelberg" className="mt-4">
                <TabsList className="grid h-auto w-full grid-cols-3 rounded-xl">
                  {anfahrt.map((a) => {
                    const Icon = icons[a.id as keyof typeof icons]
                    return (
                      <TabsTrigger key={a.id} value={a.id} className="px-1 py-2 text-xs sm:text-sm">
                        <Icon className="hidden sm:block" /> {a.label}
                      </TabsTrigger>
                    )
                  })}
                </TabsList>
                {anfahrt.map((a) => (
                  <TabsContent key={a.id} value={a.id} className="mt-3 min-h-20 text-muted-foreground">
                    {a.text}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="bg-foreground py-10 text-sm text-background/70">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6">
        <p>
          © {new Date().getFullYear()} {hof.name}
        </p>
        <nav aria-label="Rechtliches" className="flex gap-6">
          <Link href="/impressum" className="hover:text-background">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-background">
            Datenschutz
          </Link>
        </nav>
      </div>
    </footer>
  )
}
