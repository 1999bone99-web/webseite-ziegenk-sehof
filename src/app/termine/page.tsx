import type { Metadata } from "next"
import { Termine } from "@/components/site/termine"
import { Kontakt } from "@/components/site/kontakt"

export const metadata: Metadata = {
  title: "Termine",
  description: "Hofführungen, Käseverkostungen, Kochkurse und Naturparkmärkte mit dem Nußlocher Ziegenkäsehof.",
}

export default function TerminePage() {
  return (
    <main className="pt-16 sm:pt-20">
      <Termine />
      <Kontakt />
    </main>
  )
}
