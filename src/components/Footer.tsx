import { Link } from "react-router-dom"
import { InstagramIcon } from "./ui/InstagramIcon"
import { Logo } from "./ui/Logo"
import { WhatsAppIcon } from "./ui/WhatsAppIcon"
import { cities, footer, nav, siteMeta, waLink, waMessages } from "../lib/content"

export function Footer() {
  return (
    <footer className="bg-ink-950 px-5 pt-16 pb-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 border-b border-cream-50/10 pb-12 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <Logo variant="light" />
            <p className="mt-4 font-display text-lg text-cream-100/80 italic">{footer.tagline}</p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={siteMeta.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Imóveis dos Sonhos"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-50/15 text-cream-50/70 transition-colors hover:border-gold-500 hover:text-gold-400"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={waLink(waMessages.header)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da Imóveis dos Sonhos"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-50/15 text-cream-50/70 transition-colors hover:border-gold-500 hover:text-gold-400"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:flex sm:gap-16">
            <div>
              <h4 className="text-xs font-bold tracking-[0.2em] text-gold-500 uppercase">Navegação</h4>
              <ul className="mt-4 space-y-2.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link to={item.href} className="text-sm text-cream-100/65 transition-colors hover:text-gold-400">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-[0.2em] text-gold-500 uppercase">Onde atendemos</h4>
              <ul className="mt-4 space-y-2.5">
                {cities.map((city) => (
                  <li key={city} className="text-sm text-cream-100/65">
                    {city}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-[0.2em] text-gold-500 uppercase">Trabalhe conosco</h4>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={waLink(waMessages.trabalheConosco)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-cream-100/65 transition-colors hover:text-gold-400"
                  >
                    Faça parte do time
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-8 sm:flex-row">
          <p className="text-xs text-cream-100/40">{footer.rights}</p>
          <p className="text-xs text-cream-100/40">{siteMeta.instagram}</p>
        </div>
      </div>
    </footer>
  )
}
