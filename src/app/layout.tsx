import type { Metadata, Viewport } from "next"
import "./globals.css"
import { TooltipProvider } from "@/components/ui/tooltip"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ziegenkaesehof.de"),
  title: "Nußlocher Ziegenkäsehof · Ziegenkäse aus eigener Hofkäserei",
  description:
    "Frischkäse, Camembert, Hartkäse und mehr aus der Milch unserer rund 100 Ziegen. Hofladen in Nußloch und Wochenmärkte in Mannheim, Wiesloch und Heidelberg-Neuenheim.",
  openGraph: {
    title: "Nußlocher Ziegenkäsehof",
    description: "Ziegenkäse aus eigener Hofkäserei, seit 1985.",
    images: ["/images/kaeseplatte.jpg"],
    locale: "de_DE",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#f8f6f1",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
      </body>
    </html>
  )
}
