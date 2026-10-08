import type { Metadata } from "next"
import { Rechtsseite } from "@/components/site/rechtsseite"
import { hof } from "@/lib/data"

export const metadata: Metadata = { title: "Impressum · Nußlocher Ziegenkäsehof" }

// Übernommen von www.ziegenkaesehof.de/impressum.html. Vor Livegang rechtlich prüfen lassen
// (u. a. fehlt die Straße der ladungsfähigen Anschrift).
export default function Impressum() {
  return (
    <Rechtsseite titel="Impressum">
      <p>
        Stefanie Schott
        <br />
        {hof.name}
        <br />
        {hof.ort}
      </p>
      <p>
        Tel.: {hof.telefon}
        <br />
        Fax: {hof.fax}
        <br />
        E-Mail: {hof.email}
      </p>
      <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE 32088/62656</p>
      <h2>Haftungshinweis</h2>
      <p>
        Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den
        Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
      </p>
      <h2>Bildnachweis</h2>
      <p>Fotos vom Wochenmarkt (außer Verkaufswagen): Gabriele Henn. Foto der Auszeichnung 2010: Uli Regenscheit.</p>
    </Rechtsseite>
  )
}
