import { SiteHeader } from "@/components/site/site-header"
import { Hero } from "@/components/site/hero"
import { Zahlen } from "@/components/site/zahlen"
import { KaeseFinder } from "@/components/site/kaese-finder"
import { WannWo } from "@/components/site/wann-wo"
import { DerHof } from "@/components/site/der-hof"
import { Termine } from "@/components/site/termine"
import { Footer, Kontakt } from "@/components/site/kontakt"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Zahlen />
        <KaeseFinder />
        <WannWo />
        <DerHof />
        <Termine />
        <Kontakt />
      </main>
      <Footer />
    </>
  )
}
