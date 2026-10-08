# Nußlocher Ziegenkäsehof – neue Website

Next.js 15 (App Router), Tailwind CSS 4, shadcn/ui (Radix), Motion, date-fns.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Inhalte pflegen

Alle Texte, Öffnungszeiten, Märkte, Käsesorten, Termine und Bezugsquellen stehen in
`src/lib/data.ts`. Übernommen von der bisherigen Seite www.ziegenkaesehof.de (Stand Oktober 2026).

## Aufbau

| Seite | Inhalt |
|---|---|
| `/` | Hero mit Live-Status, Zahlen, Käse-Auswahl, Wann & wo, Kurzporträt Hof, nächste Termine, Kontakt |
| `/kaese` | ganzes Sortiment mit Filter und Käseplatten-Anfrage; `?art=frisch\|weich\|gereift\|quark-milch` filtert direkt |
| `/hof` | Geschichte, Zeitleiste, Auszeichnungen mit Urkunden (PDF), Naturpark-Partner, „Mehr aus dem Hofladen“ |
| `/termine` | kommende Termine; sind keine eingetragen, der Rückblick des Jahres |
| `/impressum`, `/datenschutz` | Rechtliches |

Kopfzeile und Footer kommen aus `src/app/layout.tsx`, die Abschnitte liegen in `src/components/site/`.
Kurzfassungen für die Startseite steuern die Props `kurz` (`HofIntro`, `Termine`) bzw. `kaese-auswahl.tsx`.

shadcn-Komponenten liegen in `src/components/ui` (neu hinzufügen mit `npx shadcn@latest add <name>`).

## Offen vor Livegang

- **Fotos**: Die Bilder in `public/images` stammen von der alten Seite und haben nur 500 × 250 px.
  Für den Livegang werden größere Originale gebraucht.
- **Datenschutzerklärung**: `src/app/datenschutz/page.tsx` ist ein Platzhalter.
- **Impressum**: übernommen, aber ohne Straße. Rechtlich prüfen lassen.
- **Termine**: alle Termine 2026 sind vorbei, neue in `data.ts` eintragen.
- Schreibweise „O3, 9–12“ (Chez André, Mannheim) prüfen, auf der alten Seite steht „03“.
