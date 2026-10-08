"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView, useReducedMotion } from "motion/react"
import { zahlen } from "@/lib/data"

function Zaehler({ wert, jahr }: { wert: number; jahr: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const reduce = useReducedMotion()
  const start = jahr ? wert - 40 : 0
  const [anzeige, setAnzeige] = useState(wert)

  useEffect(() => {
    if (!inView || reduce) return
    const c = animate(start, wert, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setAnzeige(Math.round(v)),
    })
    return () => c.stop()
  }, [inView, reduce, start, wert])

  const text = jahr ? String(anzeige) : anzeige.toLocaleString("de-DE")
  return (
    <span ref={ref} className="tabular-nums">
      {text}
    </span>
  )
}

export function Zahlen() {
  return (
    <section id="zahlen" aria-label="Der Hof in Zahlen" className="border-b">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4">
        {zahlen.map((z, i) => (
          <div
            key={z.label}
            className={`flex flex-col gap-2 py-10 pr-4 ${i % 2 === 1 ? "pl-4 sm:pl-8" : ""} ${i > 0 ? "lg:border-l lg:pl-8" : ""} ${i === 1 ? "border-l" : ""} ${i === 3 ? "border-l lg:border-l" : ""}`}
          >
            <dt className="order-2 text-sm leading-snug text-muted-foreground">{z.label}</dt>
            <dd className="order-1 font-serif text-3xl font-medium whitespace-nowrap sm:text-5xl">
              {"prefix" in z && <span className="text-lg text-muted-foreground sm:text-xl">{z.prefix}</span>}
              <Zaehler wert={z.wert} jahr={z.wert === 1985} />
              {"suffix" in z && <span className="text-2xl">{z.suffix}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
