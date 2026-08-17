import { Building2, LandPlot, KeyRound, type LucideIcon } from "lucide-react"
import { Reveal, StaggerGroup, StaggerItem } from "../ui/Reveal"
import { Button } from "../ui/Button"
import { WhatsAppIcon } from "../ui/WhatsAppIcon"
import { tiposFinanciamento, waLink, waMessages } from "../../lib/content"

const icons: Record<string, LucideIcon> = { Building2, LandPlot, KeyRound }

function TipoCard({ tipo }: { tipo: (typeof tiposFinanciamento.tipos)[number] }) {
  const Icon = icons[tipo.icon]
  return (
    <StaggerItem>
      <div className="flex h-full flex-col rounded-2xl border border-ink-950/8 bg-white p-7">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-950 text-gold-400">
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <h3 className="mt-5 font-display text-xl leading-tight font-semibold text-ink-950">{tipo.titulo}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-950/65">{tipo.oQueE}</p>

        <div className="mt-4 border-t border-ink-950/10 pt-4">
          <p className="text-xs font-bold tracking-[0.08em] text-gold-600 uppercase">Como funciona</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-950/65">{tipo.comoFunciona}</p>
        </div>

        <div className="mt-4 flex-1 border-t border-ink-950/10 pt-4">
          <p className="text-xs font-bold tracking-[0.08em] text-gold-600 uppercase">Ideal para</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-950/65">{tipo.idealPara}</p>
        </div>
      </div>
    </StaggerItem>
  )
}

export function TiposFinanciamento() {
  return (
    <section className="bg-cream-50 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase">{tiposFinanciamento.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink-950 text-balance sm:text-5xl">
            {tiposFinanciamento.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-950/65 sm:text-lg">{tiposFinanciamento.body}</p>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {tiposFinanciamento.tipos.map((tipo) => (
            <TipoCard key={tipo.titulo} tipo={tipo} />
          ))}
        </StaggerGroup>

        <Reveal className="mt-12 flex justify-center" delay={0.15}>
          <Button href={waLink(waMessages.tiposFinanciamento)} icon={<WhatsAppIcon className="h-5 w-5" />}>
            {tiposFinanciamento.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
