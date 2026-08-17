import { ArrowUpRight } from "lucide-react"
import { Reveal, StaggerGroup, StaggerItem } from "../ui/Reveal"
import { servicos, waLink, waMessages } from "../../lib/content"

export function Servicos() {
  return (
    <section className="bg-ink-950 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold tracking-[0.25em] text-gold-500 uppercase">{servicos.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-cream-50 text-balance sm:text-5xl">
            {servicos.heading}
          </h2>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {servicos.cards.map((card) => (
            <StaggerItem key={card.title}>
              <a
                href={waLink(waMessages[card.message])}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl bg-cream-50 p-7 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="text-xs font-bold tracking-[0.1em] text-ink-950/45 uppercase">{card.tag}</span>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink-950">{card.title}</h3>
                <div className="mt-4 h-px w-10 bg-gold-500" />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-950/65">{card.description}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-ink-950">
                  {card.cta}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-500 text-ink-950 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
