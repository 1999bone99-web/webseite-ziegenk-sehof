import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Rechtsseite({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <main className="papier min-h-screen px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <Button asChild variant="ghost" size="sm" className="-ml-3">
          <Link href="/">
            <ArrowLeft /> Zur Startseite
          </Link>
        </Button>
        <h1 className="mt-8 text-4xl font-medium">{titel}</h1>
        <div className="mt-8 space-y-4 leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:text-foreground">
          {children}
        </div>
      </div>
    </main>
  )
}
