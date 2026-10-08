import type { Metadata } from "next"
import { Suspense } from "react"
import { KaeseFinder } from "@/components/site/kaese-finder"
import { Kontakt } from "@/components/site/kontakt"

export const metadata: Metadata = {
  title: "Unser Käse",
  description:
    "Frischkäse, Ziegencamembert, Ziegenbrie, Heidikäse, Hartkäse, Quark, Milch und Joghurt aus der eigenen Hofkäserei in Nußloch. Käseplatte nach Wunsch anfragen.",
}

export default function KaesePage() {
  return (
    <main className="pt-16 sm:pt-20">
      {/* useSearchParams braucht eine Suspense-Grenze, damit die Seite statisch bleibt */}
      <Suspense>
        <KaeseFinder />
      </Suspense>
      <Kontakt />
    </main>
  )
}
