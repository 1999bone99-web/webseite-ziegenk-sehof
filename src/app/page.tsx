import { Hero } from "@/components/site/hero"
import { Zahlen } from "@/components/site/zahlen"
import { KaeseAuswahl } from "@/components/site/kaese-auswahl"
import { WannWo } from "@/components/site/wann-wo"
import { HofIntro } from "@/components/site/der-hof"
import { Termine } from "@/components/site/termine"
import { Kontakt } from "@/components/site/kontakt"

export default function Home() {
  return (
    <main>
      <Hero />
      <Zahlen />
      <KaeseAuswahl />
      <WannWo />
      <HofIntro kurz />
      <Termine kurz />
      <Kontakt />
    </main>
  )
}
