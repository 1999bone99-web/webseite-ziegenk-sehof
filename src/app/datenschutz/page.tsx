import type { Metadata } from "next"
import { Rechtsseite } from "@/components/site/rechtsseite"

export const metadata: Metadata = { title: "Datenschutz" }

// Platzhalter. Die Erklärung der alten Seite passt nicht mehr (sie bezieht sich u. a. auf das
// eingebettete Facebook-Plugin). Vor Livegang durch eine geprüfte Erklärung ersetzen.
export default function Datenschutz() {
  return (
    <Rechtsseite titel="Datenschutz">
      <p>
        Diese Seite wird vor der Veröffentlichung durch eine vollständige Datenschutzerklärung ersetzt.
      </p>
      <h2>Was die Seite technisch tut</h2>
      <p>
        Die Website setzt keine Cookies, bindet keine Tracking-Dienste ein und lädt keine Inhalte von Drittanbietern.
        Schriften und Bilder werden vom eigenen Server ausgeliefert. Links zu Facebook und OpenStreetMap öffnen sich
        erst nach einem Klick in einem neuen Fenster.
      </p>
      <p>
        Die Käseplatten-Anfrage überträgt nichts an den Server. Sie öffnet lediglich Ihr eigenes E-Mail-Programm mit
        einem vorausgefüllten Text.
      </p>
    </Rechtsseite>
  )
}
