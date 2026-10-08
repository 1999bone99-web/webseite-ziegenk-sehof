"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { ArrowDown, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/site/status-badge"
import { kaese } from "@/lib/data"

const fotos = [
  { src: "/images/ziege-mit-zicklein.jpg", alt: "Ziege mit Zicklein auf der Wiese", gross: true },
  { src: "/images/kaeseplatte.jpg", alt: "Käseplatte mit Frischkäse, Camembert und eingelegtem Gemüse" },
  { src: "/images/hof.jpg", alt: "Der Hof mit Stall und Wiese" },
]

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id="top" className="papier relative overflow-hidden pt-28 pb-10 sm:pt-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <MapPin className="size-4" /> Zwischen Leimen und Nußloch, seit 1985
          </motion.p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-5xl leading-[1.02] font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            Ziegenkäse aus der eigenen <em className="font-normal text-terra italic">Hofkäserei</em>
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Rund 100 Bunte Deutsche Edelziegen, zehn Hektar Land und eine Käserei, in der die ganze Milch
            verarbeitet wird. Stefanie Schott und Joachim Kamann machen das zu zweit, ohne künstliche Zusatzstoffe.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg" className="h-12 rounded-full px-6 text-base">
              <a href="#kaese">Sortiment ansehen</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full bg-transparent px-6 text-base">
              <a href="#wann-wo">Wann & wo kaufen?</a>
            </Button>
          </motion.div>
          <div className="mt-6">
            <StatusBadge />
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-xl grid-cols-2 gap-3 sm:gap-4">
          {fotos.map((f, i) => (
            <Foto key={f.src} {...f} index={i} reduce={!!reduce} />
          ))}
        </div>
      </div>

      <a
        href="#zahlen"
        aria-label="Weiter nach unten"
        className="mx-auto mt-12 hidden size-10 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:text-foreground lg:flex"
      >
        <ArrowDown className="size-4 motion-safe:animate-bounce" />
      </a>

      <Laufband />
    </section>
  )
}

function Foto({
  src,
  alt,
  gross,
  index,
  reduce,
}: (typeof fotos)[number] & { index: number; reduce: boolean }) {
  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative aspect-[2/1] overflow-hidden rounded-2xl bg-muted shadow-lg ${gross ? "col-span-2" : ""}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={index === 0}
        sizes={gross ? "(min-width: 1024px) 576px, 100vw" : "(min-width: 1024px) 288px, 50vw"}
        className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
      />
    </motion.figure>
  )
}

function Laufband() {
  const namen = kaese.map((k) => k.name)
  return (
    <div className="group relative mt-14 overflow-hidden border-t-[6px] border-terra bg-primary py-3 text-primary-foreground" aria-hidden>
      <div className="flex w-max animate-[laufen_60s_linear_infinite] gap-8 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[...namen, ...namen].map((n, i) => (
          <span key={i} className="flex items-center gap-8 font-serif text-lg whitespace-nowrap italic">
            {n}
            <span className="text-himmel not-italic">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes laufen { to { transform: translateX(-50%); } }`}</style>
    </div>
  )
}
