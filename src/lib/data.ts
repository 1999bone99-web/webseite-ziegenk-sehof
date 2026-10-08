// Alle Inhalte stammen von der bisherigen Seite www.ziegenkaesehof.de (Stand Oktober 2026).
// Änderungen an Sortiment, Zeiten oder Terminen bitte nur hier pflegen.

export const hof = {
  name: "Nußlocher Ziegenkäsehof",
  inhaber: "Stefanie Schott & Joachim Kamann",
  ort: "69226 Nußloch",
  lage: "Auf halber Höhe zwischen Leimen und Nußloch an der L594 (alte B3)",
  telefon: "06224 / 75 423",
  telefonHref: "tel:+49622475423",
  fax: "06224 / 75 686",
  email: "info@ziegenkaesehof.de",
  facebook: "https://www.facebook.com/Nu%C3%9Flocher-Ziegenk%C3%A4sehof-1003779413013227/",
} as const

export const zahlen = [
  { wert: 1985, label: "bewirtschaften wir den Hof zu zweit", prefix: "seit " },
  { wert: 10, label: "Hektar Land", suffix: " ha" },
  { wert: 100, label: "Bunte Deutsche Edelziegen", prefix: "rund " },
  { wert: 60000, label: "Liter Milch im Jahr, alle in der eigenen Hofkäserei verarbeitet", prefix: "ca. " },
] as const

// Wochentage nach date-fns: 0 = Sonntag … 6 = Samstag
export type Oeffnung = { tag: number; von: string; bis: string }

export const hofladenZeiten: Oeffnung[] = [
  { tag: 4, von: "15:00", bis: "18:30" },
  { tag: 5, von: "15:00", bis: "18:30" },
  { tag: 6, von: "09:30", bis: "16:00" },
]

export const maerkte = [
  { tag: 4, stadt: "Mannheim", ort: "Hauptmarkt, Marktplatz G1, Innenstadt", von: "08:00", bis: "13:00" },
  { tag: 5, stadt: "Wiesloch", ort: "Adenauerplatz", von: "08:00", bis: "13:00" },
  { tag: 6, stadt: "Heidelberg-Neuenheim", ort: "Lutherplatz", von: "08:00", bis: "13:00" },
] as const

export const wochentage = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]

export type KaeseKategorie = "frisch" | "weich" | "gereift" | "quark-milch"

export const kategorien: { id: KaeseKategorie; label: string }[] = [
  { id: "frisch", label: "Frischkäse" },
  { id: "weich", label: "Weichkäse" },
  { id: "gereift", label: "Schnitt- & Hartkäse" },
  { id: "quark-milch", label: "Quark, Milch & Joghurt" },
]

export type Kaese = {
  id: string
  name: string
  kategorie: KaeseKategorie
  beschreibung: string
  hinweis?: string
  platte?: boolean // eignet sich für die Käseplatte
}

export const kaese: Kaese[] = [
  { id: "natur", name: "Natur-Frischkäse", kategorie: "frisch", beschreibung: "Zart und mit milder Säure.", hinweis: "mind. 45 % Fett i. Tr.", platte: true },
  { id: "knoblauch", name: "Knoblauch-Frischkäse", kategorie: "frisch", beschreibung: "Kräftig gewürzt, mit einer speziellen Knoblauch-Paste.", hinweis: "mind. 45 % Fett i. Tr.", platte: true },
  { id: "pfeffer", name: "Pfeffer-Frischkäse", kategorie: "frisch", beschreibung: "Scharf und pikant, mit Pfefferkörnern und Paprika.", hinweis: "mind. 45 % Fett i. Tr.", platte: true },
  { id: "schnittlauch", name: "Schnittlauch-Frischkäse", kategorie: "frisch", beschreibung: "Appetitlich und frisch, mit Schnittlauch.", hinweis: "mind. 45 % Fett i. Tr.", platte: true },
  { id: "provence", name: "Provence-Frischkäse", kategorie: "frisch", beschreibung: "Eine große französische Tradition, mit Kräutern aus der Provence.", hinweis: "mind. 45 % Fett i. Tr.", platte: true },
  { id: "torte", name: "Ziegenfrischkäsetorte", kategorie: "frisch", beschreibung: "Zart, mit Wildkräutern.", platte: true },
  { id: "roulade", name: "Ziegenroulade", kategorie: "frisch", beschreibung: "Mit Pesto gefüllt.", platte: true },
  { id: "asche", name: "Ziegenkäse in Pflanzenasche", kategorie: "weich", beschreibung: "Sehr feiner Geschmack.", platte: true },
  { id: "camembert", name: "Ziegencamembert", kategorie: "weich", beschreibung: "Zarter Camembert, natur oder mit Wildkräutern.", platte: true },
  { id: "brie", name: "Ziegenbrie", kategorie: "weich", beschreibung: "Milder Brie, natur oder mit Wildkräutern.", platte: true },
  { id: "chevrolait", name: "Chevrolait", kategorie: "weich", beschreibung: "Weichkäse, köstlich zum Salat.", platte: true },
  { id: "chevrolait-eingelegt", name: "Chevrolait eingelegt", kategorie: "weich", beschreibung: "Weichkäse, pikant oder in Kräutern eingelegt.", platte: true },
  { id: "fetzick", name: "Fetzick", kategorie: "weich", beschreibung: "Unser Weichkäse von der Zicke. Zum Grillen geeignet." },
  { id: "heidi", name: "Heidikäse", kategorie: "gereift", beschreibung: "Ein junger Schnittkäse mit feinem Aroma.", platte: true },
  { id: "hart", name: "Ziegenhartkäse", kategorie: "gereift", beschreibung: "Mindestens 8 Wochen gereift.", platte: true },
  { id: "quark", name: "Ziegen-Quark", kategorie: "quark-milch", beschreibung: "Aus feinstem Käsebruch. Je nach Saison natur, mit Basilikum, Bärlauch oder Feigen." },
  { id: "milch", name: "Ziegenmilch", kategorie: "quark-milch", beschreibung: "Frisch gekühlt, am Verkaufstag gemolken." },
  { id: "molke", name: "Ziegenmolke", kategorie: "quark-milch", beschreibung: "Fein säuerlich, mit vielen Mineralsalzen. Natur oder mit Fruchtzubereitung." },
  { id: "joghurt", name: "Ziegenjoghurt", kategorie: "quark-milch", beschreibung: "Trinkfrisch und mild. Natur oder mit Fruchtzubereitung." },
]

export const mehrVomHof = [
  {
    titel: "Saisonal vom Hof",
    text: "Milchzicklein und Ziegenwurst, dazu Ziegenleder.",
  },
  {
    titel: "Ziegenmilchkosmetik",
    text: "Mindestens 40 % frische Ziegenmilch in Trinkqualität, ohne Konservierungsmittel. Gesichtspflege, Handbalsam, Körpermilch und Duschshampoo. Versand auf Anfrage.",
  },
  {
    titel: "Naturseife",
    text: "Handgemachte Ziegenmilchseife mit natürlichem Glyceringehalt. In Rosmarin, Lavendel und Lemongrass.",
  },
  {
    titel: "Feinkost",
    text: "Käsemarmeladen, Kuhmilchkäse, Eier von freilaufenden Hühnern, Honig aus der Region und vom Hof, Brot der Bäckerei Dreschflegel, eingelegte Oliven und Tomaten, griechisches Olivenöl.",
  },
  {
    titel: "Wein aus der Nachbarschaft",
    text: "Vom Weingut Seeger aus Leimen: Weißer und Grauer Burgunder, Weißer Riesling, Blauer Spätburgunder und AnnA.",
  },
]

export const meilensteine = [
  { jahr: "1985", titel: "Der Anfang", text: "Seitdem bewirtschaften Stefanie Schott und Joachim Kamann den Hof zwischen Leimen und Nußloch zu zweit." },
  { jahr: "2010", titel: "Ein Stern für Nußloch", text: "Minister Helmut Rau zeichnet den Hof in der Villa Reitzenstein mit einem Stern auf dem Platz des guten Geschmacks aus." },
  { jahr: "2011", titel: "Feinschmecker-Urkunde", text: "Urkunde vom Feinschmecker. Auch der Gault Millau empfiehlt den Hof." },
  { jahr: "2012", titel: "Käse für die Nationalelf", text: "Der Ziegenkäsehof beliefert die Fußball-Nationalmannschaft." },
]

export const werte = [
  "Keine künstlichen Zusatzstoffe",
  "Artgerechte Haltung",
  "Regelmäßiger Weidegang",
  "Gentechnikfreie Fütterung",
]

// Die PDFs liegen in public/dokumente, damit die Links nach dem Umzug der Domain weiter funktionieren.
export const auszeichnungen: { titel: string; pdf?: string }[] = [
  { titel: "Stern auf dem Platz des guten Geschmacks (2010)" },
  { titel: "Empfohlen vom Gault Millau", pdf: "/dokumente/gault-millau-empfehlung.pdf" },
  { titel: "Feinschmecker-Urkunde 2011", pdf: "/dokumente/feinschmecker-urkunde-2011.pdf" },
  {
    titel: "Zertifizierter Aussteller der Slow-Food-Messe 2009",
    pdf: "/dokumente/slow-food-zertifizierter-aussteller-2009.pdf",
  },
]

export const partner = {
  name: "Naturpark Neckartal-Odenwald",
  url: "https://www.naturpark-neckartal-odenwald.de",
  logo: "/images/naturpark-neckartal-odenwald-partner.png",
}

export type Termin = {
  datum: string // ISO, für die Sortierung nach kommend/vergangen
  titel: string
  zeit?: string
  ort?: string
  text?: string
  preis?: string
}

export const termine: Termin[] = [
  {
    datum: "2026-04-30",
    zeit: "15:00 Uhr",
    titel: "Familienführung „Ziege, Schmetterling und Co.“",
    ort: "Start am Ziegenkäsehof",
    text: "Naturparkguide Paul Siemes zeigt Einblicke in Wald und Wiese. Dauer 2 Stunden, ca. 5 km.",
    preis: "5 € pro Person, Kinder bis 15 Jahre frei",
  },
  { datum: "2026-05-17", titel: "Naturparkmarkt Neckargemünd", text: "Wir sind mit unserem Stand dabei." },
  {
    datum: "2026-06-27",
    zeit: "17:00–18:30 Uhr",
    titel: "Ziege trifft Genießer",
    text: "Führung durch den Stall, anschließend Käseverkostung. Anmeldung über die VHS Südliche Bergstraße.",
    preis: "42 € pro Person",
  },
  {
    datum: "2026-07-04",
    zeit: "16:00 Uhr",
    titel: "Kochkurs mit der 1. Mannheimer Kochschule",
    ort: "Treffpunkt Nußlocher Ziegenkäsehof",
    text: "Hofführung mit Käseverkostung, danach Fahrt im eigenen Auto nach Mannheim und Kochkurs mit Zicklein und Ziegenkäse. Dauer 6 Stunden. Anmeldung bei der Kochschule.",
    preis: "169 € pro Person",
  },
  {
    datum: "2026-07-26",
    titel: "Naturparkmarkt Nußloch",
    text: "Wir sind dabei und machen eine kleine Käseschule für Kinder (und Erwachsene).",
    preis: "10 € pro Person für Material",
  },
  { datum: "2026-09-20", titel: "Naturparkmarkt Mauer", text: "Wir sind mit unserem Stand dabei." },
]

export const bezugsquellen = {
  einzelhandel: [
    { name: "Amons Hofladen", adresse: "Bahnhofstr. 6, 69256 Mauer" },
    { name: "Chez André, Gaumenkitzel", adresse: "O3, 9–12, 68161 Mannheim" },
    { name: "Kücherer's Käse-Ecke", adresse: "Kriegsstraße 10, 69121 Heidelberg" },
    { name: "Rohrbacher Genuss-Reich", adresse: "Karlsruher Straße 16, 69126 Heidelberg" },
    { name: "SBK Markt Walldorf Ost", adresse: "Bahnhofstr. 34, 69190 Walldorf" },
    { name: "Obstbau Pfisterer", adresse: "Hagellachstr. 2, 69124 Heidelberg-Kirchheim" },
  ],
  restaurants: [
    { name: "Bistronauten", adresse: "Kopernikusstraße 43, 69469 Weinheim" },
    { name: "Europäischer Hof", adresse: "Friedrich-Ebert-Anlage 1, 69117 Heidelberg" },
    { name: "Landgasthof Grüner Baum", adresse: "Heilbronner Straße 34, 74889 Sinsheim-Rohrbach" },
    { name: "Restaurant Felderbock", adresse: "Hauptstraße 26, 69226 Nußloch" },
    { name: "Restaurant Wolfsbrunnen", adresse: "Wolfsbrunnensteige 15, 69118 Heidelberg" },
    { name: "Weinrestaurant Traube", adresse: "Rathausstraße 75, 69126 Heidelberg" },
  ],
}

export const anfahrt = [
  {
    id: "heidelberg",
    label: "Aus Heidelberg",
    text: "Mit der Linie 23 bis Haltestelle „Leimen Friedhof“. Nach ca. 1 km Fußweg liegt der Hof auf der linken Seite.",
  },
  {
    id: "wiesloch",
    label: "Aus Wiesloch",
    text: "Mit der Buslinie 723 bis „Nußloch Kreuz“. Nach ca. 1 km Fußweg liegt der Hof auf der rechten Seite.",
  },
  {
    id: "auto",
    label: "Mit dem Auto",
    text: "Der Hof liegt auf halber Höhe zwischen Leimen und Nußloch an der L594, der alten B3.",
  },
]
