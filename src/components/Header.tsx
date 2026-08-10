import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Logo } from "./ui/Logo"
import { Button } from "./ui/Button"
import { WhatsAppIcon } from "./ui/WhatsAppIcon"
import { nav, waLink, waMessages } from "../lib/content"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-ink-950/90 shadow-lg shadow-black/20 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" aria-label="Imóveis dos Sonhos — início">
          <Logo variant="light" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-cream-50/80 transition-colors hover:text-gold-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href={waLink(waMessages.header)} icon={<WhatsAppIcon className="h-4 w-4" />} className="!py-2.5">
            Falar no WhatsApp
          </Button>
        </div>

        <button
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
          className="rounded-full p-2 text-cream-50 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden bg-ink-950/95 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 pb-6">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-semibold text-cream-50/85 hover:bg-white/5 hover:text-gold-400"
                >
                  {item.label}
                </a>
              ))}
              <Button
                href={waLink(waMessages.header)}
                icon={<WhatsAppIcon className="h-4 w-4" />}
                className="mt-2 justify-center"
              >
                Falar no WhatsApp
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
