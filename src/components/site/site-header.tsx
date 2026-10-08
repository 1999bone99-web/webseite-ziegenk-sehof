"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { Menu, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/site/status-badge"
import { hof } from "@/lib/data"
import { cn } from "@/lib/utils"

export const links = [
  { href: "/kaese", label: "Unser Käse" },
  { href: "/#wann-wo", label: "Wann & wo" },
  { href: "/hof", label: "Der Hof" },
  { href: "/termine", label: "Termine" },
  { href: "/#kontakt", label: "Kontakt" },
]

export function SiteHeader() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const aktiv = (href: string) => !href.includes("#") && pathname.startsWith(href)
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24))

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        scrolled ? "border-b bg-background/85 shadow-sm backdrop-blur-md" : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center sm:h-20 justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="shrink-0" aria-label="Nußlocher Ziegenkäsehof, zur Startseite">
          <Image src="/logo.svg" alt="Nußlocher Ziegenkäsehof" width={278} height={98} priority unoptimized className="h-11 w-auto sm:h-14" />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Button
              key={l.href}
              variant="ghost"
              size="sm"
              asChild
              className={cn(aktiv(l.href) && "bg-accent text-primary")}
            >
              <Link href={l.href} aria-current={aktiv(l.href) ? "page" : undefined}>
                {l.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <StatusBadge kurz className="hidden sm:inline-flex" />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menü öffnen">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm bg-background">
              <SheetHeader>
                <SheetTitle>
                  <Image src="/logo.svg" alt={hof.name} width={278} height={98} unoptimized className="h-14 w-auto" />
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile Navigation" className="flex flex-col px-4">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={aktiv(l.href) ? "page" : undefined}
                    className={cn(
                      "border-b py-4 font-serif text-2xl transition-colors hover:text-primary",
                      aktiv(l.href) && "text-primary"
                    )}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 p-4">
                <StatusBadge className="justify-center" />
                <Separator />
                <Button asChild size="lg">
                  <a href={hof.telefonHref}>
                    <Phone /> {hof.telefon}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
