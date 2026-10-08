"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { ArrowDown, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/site/status-badge"
import { kaese } from "@/lib/data"

const fotos = [
  { src: "/images/ziege-mit-zicklein.jpg", alt: "Ziege mit Zicklein auf der Wiese", className: "left-0 top-6 w-[62%] -rotate-3", speed: -40 },
  { src: "/images/kaeseplatte.jpg", alt: "Käseplatte mit Frischkäse, Camembert und eingelegtem Gemüse", className: "right-0 top-0 w-[56%] rotate-2", speed: 30 },
  { src: "/images/hof.jpg", alt: "Der Hof mit Stall und Wiese", className: "bottom-0 left-[14%] w-[66%] rotate-1", speed: -15 },
]

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })

  return (
    <section id="top" ref={ref} className="papier relative overflow-hidden pt-28 pb-10 sm:pt-32">
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

        <div className="relative mx-auto aspect-[5/4] w-full max-w-xl">
          {fotos.map((f, i) => (
            <Foto key={f.src} {...f} index={i} progress={scrollYProgress} reduce={!!reduce} />
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
  className,
  speed,
  index,
  progress,
  reduce,
}: (typeof fotos)[number] & {
  index: number
  progress: ReturnType<typeof useScroll>["scrollYProgress"]
  reduce: boolean
}) {
  const y = useTransform(progress, [0, 1], [0, reduce ? 0 : speed * 3])
  return (
    <motion.div
      style={{ y }}
      initial={reduce ? false : { opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { scale: 1.03, rotate: 0, zIndex: 10 }}
      className={`absolute overflow-hidden rounded-2xl border-[6px] border-card bg-card shadow-xl ${className}`}
    >
      <Image src={src} alt={alt} width={500} height={250} priority={index === 0} className="h-auto w-full" />
    </motion.div>
  )
}

function Laufband() {
  const namen = kaese.map((k) => k.name)
  return (
    <div className="group relative mt-14 overflow-hidden border-y bg-primary py-3 text-primary-foreground" aria-hidden>
      <div className="flex w-max animate-[laufen_60s_linear_infinite] gap-8 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[...namen, ...namen].map((n, i) => (
          <span key={i} className="flex items-center gap-8 font-serif text-lg whitespace-nowrap italic">
            {n}
            <span className="text-wiese not-italic">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes laufen { to { transform: translateX(-50%); } }`}</style>
    </div>
  )
}
