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

| Abschnitt | Datei | Interaktion |
|---|---|---|
| Kopfzeile | `site-header.tsx` | Live-Status Hofladen (Zeitzone Berlin), mobiles Menü (Sheet) |
| Hero | `hero.tsx` | Foto-Collage mit Parallax, Laufband mit Käsesorten |
| Zahlen | `zahlen.tsx` | Zähler laufen beim Hineinscrollen hoch |
| Unser Käse | `kaese-finder.tsx` | Filter (ToggleGroup), Käseplatte zusammenstellen, Anfrage als vorausgefüllte E-Mail |
| Wann & wo | `wann-wo.tsx` | Tages-Tabs mit Zeitleiste und „jetzt“-Markierung, Händler/Restaurants |
| Der Hof | `der-hof.tsx` | Zeitleiste mit Scroll-Fortschritt, Accordion „Mehr aus dem Hofladen“ |
| Termine | `termine.tsx` | trennt automatisch kommende und vergangene Termine |
| Kontakt | `kontakt.tsx` | Anfahrt-Tabs (ÖPNV/Auto) |

shadcn-Komponenten liegen in `src/components/ui` (neu hinzufügen mit `npx shadcn@latest add <name>`).

## Offen vor Livegang

- **Fotos**: Die Bilder in `public/images` stammen von der alten Seite und haben nur 500 × 250 px.
  Für den Livegang werden größere Originale gebraucht.
- **Datenschutzerklärung**: `src/app/datenschutz/page.tsx` ist ein Platzhalter.
- **Impressum**: übernommen, aber ohne Straße. Rechtlich prüfen lassen.
- **Termine**: alle Termine 2026 sind vorbei, neue in `data.ts` eintragen.
- Schreibweise „O3, 9–12“ (Chez André, Mannheim) prüfen, auf der alten Seite steht „03“.
