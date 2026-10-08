import type { Metadata } from "next"
import { HofDetails, HofIntro } from "@/components/site/der-hof"
import { Kontakt } from "@/components/site/kontakt"

export const metadata: Metadata = {
  title: "Der Hof",
  description:
    "Seit 1985 bewirtschaften Stefanie Schott und Joachim Kamann den Nußlocher Ziegenkäsehof. Geschichte, Auszeichnungen und was es im Hofladen sonst noch gibt.",
}

export default function HofPage() {
  return (
    <main className="pt-16 sm:pt-20">
      <HofIntro />
      <HofDetails />
      <Kontakt />
    </main>
  )
}
