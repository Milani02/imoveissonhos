import { MapPin, ExternalLink, Trees, LandPlot } from "lucide-react"
import { Reveal, StaggerGroup, StaggerItem } from "../ui/Reveal"
import { Button } from "../ui/Button"
import { WhatsAppIcon } from "../ui/WhatsAppIcon"
import { CountUp } from "../ui/CountUp"
import { loteamentos, chacaras, terrenosStats, formatBRL } from "../../lib/terrenos"
import { terrenosSection, chacarasSection, waLink, waMessages, whatsappNumbers } from "../../lib/content"

function LoteamentoCard({ l }: { l: (typeof loteamentos)[number] }) {
  return (
    <StaggerItem>
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-cream-50/10 bg-ink-900 p-6 transition-colors hover:border-gold-500/30">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 transition-colors group-hover:bg-gold-500/20">
            <LandPlot className="h-6 w-6" strokeWidth={1.75} />
          </div>
          {l.destaque && (
            <span className="rounded-full bg-gold-500/10 px-2.5 py-1 text-[0.65rem] font-bold tracking-wide text-gold-400 uppercase">
              {l.destaque}
            </span>
          )}
        </div>

        <h3 className="mt-4 font-display text-lg font-semibold text-cream-50">{l.nome}</h3>
        <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-cream-100/50">
          <MapPin className="h-3.5 w-3.5 text-gold-500" />
          {l.regiao}
        </div>

        <div className="mt-4 flex-1">
          <div className="text-[0.65rem] font-bold tracking-wide text-cream-100/40 uppercase">A partir de</div>
          <div className="font-display text-xl font-bold text-gold-400">{formatBRL(l.valorMin)}</div>
          <div className="mt-1 text-xs text-cream-100/50">
            {l.lotes} {l.lotes === 1 ? "lote disponível" : "lotes disponíveis"} · R$/m² a partir de{" "}
            {l.precoM2Min.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-4 border-t border-cream-50/10 pt-4">
          {l.mapaLink && (
            <a
              href={l.mapaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cream-100/60 transition-colors hover:text-gold-400"
            >
              Ver no mapa <ExternalLink className="h-3 w-3" />
            </a>
          )}
          <a
            href={waLink(`${waMessages.terreno} (${l.nome})`, whatsappNumbers.umuarama)}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-gold-400 transition-colors hover:text-gold-300"
          >
            Simular
          </a>
        </div>
      </div>
    </StaggerItem>
  )
}

export function TerrenosSection() {
  return (
    <section id="terrenos" className="bg-ink-950 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-[0.25em] text-gold-500 uppercase">{terrenosSection.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-cream-50 text-balance sm:text-5xl">
              {terrenosSection.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-cream-100/65 sm:text-lg">{terrenosSection.body}</p>
          </div>

          <div className="flex shrink-0 gap-8">
            <div>
              <div className="font-display text-4xl font-bold text-gold-400">
                <CountUp value={`${terrenosStats.totalLotes}+`} />
              </div>
              <div className="text-xs text-cream-100/50">lotes disponíveis</div>
            </div>
            <div>
              <div className="font-display text-4xl font-bold text-gold-400">
                <CountUp value={`${terrenosStats.totalLoteamentos}`} />
              </div>
              <div className="text-xs text-cream-100/50">loteamentos</div>
            </div>
          </div>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06} amount={0.1}>
          {loteamentos.map((l) => (
            <LoteamentoCard key={l.nome} l={l} />
          ))}
        </StaggerGroup>

        <p className="mt-6 text-center text-xs text-cream-100/35">
          Também temos áreas comerciais e glebas para incorporadoras — fale com a gente pra saber mais.
        </p>

        {/* Chácaras */}
        <div className="mt-24 border-t border-cream-50/10 pt-20 sm:mt-28">
          <Reveal className="text-center">
            <span className="text-xs font-bold tracking-[0.25em] text-gold-500 uppercase">{chacarasSection.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-cream-50 sm:text-5xl">{chacarasSection.heading}</h2>
            <p className="mt-4 text-base leading-relaxed text-cream-100/65 sm:text-lg">{chacarasSection.body}</p>
          </Reveal>

          <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.15}>
            {chacaras.map((c) => (
              <StaggerItem key={c.nome}>
                <div className="relative overflow-hidden rounded-3xl border border-gold-500/20 bg-gradient-to-br from-ink-900 to-ink-950 p-8 sm:p-10">
                  <Trees className="h-10 w-10 text-gold-500/60" strokeWidth={1.5} />
                  <h3 className="mt-5 font-display text-2xl font-semibold text-cream-50">{c.nome}</h3>
                  <p className="mt-1 text-sm text-cream-100/50">{c.localizacao}</p>

                  <div className="mt-6 grid grid-cols-2 gap-4 border-y border-cream-50/10 py-5">
                    <div>
                      <div className="text-xs text-cream-100/40 uppercase">Área</div>
                      <div className="font-display text-lg font-semibold text-gold-400">{c.area}</div>
                    </div>
                    <div>
                      <div className="text-xs text-cream-100/40 uppercase">A partir de</div>
                      <div className="font-display text-lg font-semibold text-gold-400">{c.valor}</div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-cream-100/60">{c.condicao}</p>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <Button href={waLink(`${waMessages.chacara} (${c.nome})`, whatsappNumbers.umuarama)} icon={<WhatsAppIcon className="h-4 w-4" />} className="!py-2.5 !text-sm">
                      Tenho interesse
                    </Button>
                    <a
                      href={c.mapaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cream-100/60 transition-colors hover:text-gold-400"
                    >
                      Ver no mapa <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}
