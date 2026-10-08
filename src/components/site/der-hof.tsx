"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, useScroll, useSpring } from "motion/react"
import { Award, Leaf } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Reveal } from "@/components/site/reveal"
import { auszeichnungen, meilensteine, mehrVomHof, werte } from "@/lib/data"

export function DerHof() {
  return (
    <section id="hof" className="overflow-x-clip py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="mb-3 text-sm font-medium tracking-widest text-terra uppercase">Der Hof</p>
            <h2 className="text-4xl font-medium tracking-tight text-balance sm:text-5xl">
              Zwei Menschen, rund hundert Ziegen
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Seit 1985 bewirtschaften Stefanie Schott und Joachim Kamann den zehn Hektar großen Betrieb zu zweit.
                Jedes Jahr kommen etwa 60.000 Liter Milch zusammen, und alles davon wird in der eigenen Hofkäserei zu
                Käse, Quark, Joghurt und Molke.
              </p>
              <p>Ein paar Dinge sind dabei nicht verhandelbar:</p>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {werte.map((w) => (
                <li key={w} className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3">
                  <Leaf className="size-5 shrink-0 text-primary" />
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div className="relative mx-auto max-w-md">
              <Image
                src="/images/stefanie-joachim.jpg"
                alt="Joachim Kamann und Stefanie Schott in der Käserei, mit Käse in den Händen"
                width={362}
                height={250}
                className="w-full -rotate-2 rounded-2xl border-[6px] border-card shadow-xl"
              />
              <Image
                src="/images/zicklein.jpg"
                alt="Zwei Zicklein auf der Wiese"
                width={500}
                height={250}
                className="absolute right-0 -bottom-16 w-3/5 rotate-3 rounded-2xl border-[6px] border-card shadow-xl sm:-right-10"
              />
            </div>
          </Reveal>
        </div>

        <Zeitleiste />

        <Reveal className="mt-24">
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="font-serif text-2xl leading-snug text-balance sm:text-3xl">
              „In der Liebe zur Natur liegt das Erfolgsgeheimnis dieser Ziegenkäserei.“
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted-foreground">
              Staatsministerium Baden-Württemberg, zur Auszeichnung am 1. Dezember 2010
            </figcaption>
          </figure>
          <ul className="mt-12 flex flex-wrap justify-center gap-3">
            {auszeichnungen.map((a) => (
              <li key={a} className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm">
                <Award className="size-4 text-terra" /> {a}
              </li>
            ))}
          </ul>
        </Reveal>

        <MehrVomHof />
      </div>
    </section>
  )
}

function Zeitleiste() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 50%"] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <div className="mt-36">
      <h3 className="text-center text-3xl font-medium">Stationen</h3>
      <ol ref={ref} className="relative mx-auto mt-12 max-w-2xl">
        <div className="absolute top-2 bottom-2 left-[4.5rem] w-px bg-border sm:left-1/2" aria-hidden />
        <motion.div
          style={{ scaleY }}
          className="absolute top-2 bottom-2 left-[4.5rem] w-px origin-top bg-primary sm:left-1/2"
          aria-hidden
        />
        {meilensteine.map((m, i) => (
          <li key={m.jahr} className="relative grid grid-cols-[4.5rem_1fr] gap-6 pb-12 last:pb-0 sm:grid-cols-2 sm:gap-12">
            <Reveal className={`pr-4 text-right sm:pr-0 ${i % 2 ? "sm:order-2 sm:text-left" : ""}`}>
              <span className="font-serif text-2xl font-medium text-terra sm:text-5xl">{m.jahr}</span>
            </Reveal>
            <span
              className="absolute top-3 left-[4.5rem] size-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background sm:left-1/2"
              aria-hidden
            />
            <Reveal delay={0.08} className={i % 2 ? "sm:order-1 sm:text-right" : ""}>
              <h4 className="font-serif text-xl font-medium">{m.titel}</h4>
              <p className="mt-1 text-muted-foreground">{m.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  )
}

function MehrVomHof() {
  return (
    <div className="mt-28 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
      <Reveal>
        <h3 className="text-3xl font-medium">Mehr aus dem Hofladen</h3>
        <p className="mt-3 text-muted-foreground">
          Neben dem Käse gibt es im Hofladen und am Marktstand Dinge, die gut dazu passen.
        </p>
        <Image
          src="/images/marktstand-theke.jpg"
          alt="Verkauf an der Theke mit Käse und Ziegenmilchkosmetik"
          width={500}
          height={250}
          className="mt-6 w-full rounded-2xl"
        />
        <p className="mt-2 text-xs text-muted-foreground">Foto: Gabriele Henn</p>
      </Reveal>
      <Reveal delay={0.1}>
        <Accordion type="single" collapsible defaultValue="item-0" className="rounded-2xl border bg-card px-6">
          {mehrVomHof.map((m, i) => (
            <AccordionItem key={m.titel} value={`item-${i}`}>
              <AccordionTrigger className="py-5 font-serif text-xl font-medium hover:no-underline">
                {m.titel}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">{m.text}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </div>
  )
}
