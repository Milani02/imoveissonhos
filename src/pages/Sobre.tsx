import { Phone } from "lucide-react"
import { Reveal, StaggerGroup, StaggerItem } from "../components/ui/Reveal"
import { Button } from "../components/ui/Button"
import { WhatsAppIcon } from "../components/ui/WhatsAppIcon"
import { TestimonialCard } from "../components/ui/TestimonialCard"
import { Comparison } from "../components/sections/Comparison"
import { Journey } from "../components/sections/Journey"
import { FiveReasons } from "../components/sections/FiveReasons"
import { sobre, waLink, waMessages, depoimentosLista } from "../lib/content"

export function Sobre() {
  return (
    <>
      <section className="bg-cream-50 px-5 py-28 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center">
            <span className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase">{sobre.eyebrow}</span>
            <h1 className="mt-4 font-display text-3xl font-semibold text-ink-950 text-balance sm:text-5xl">{sobre.heading}</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-950/70 sm:text-xl">{sobre.intro}</p>
          </Reveal>

          <Reveal delay={0.05} className="mt-10 space-y-5">
            {sobre.paragrafos.map((p) => (
              <p key={p} className="text-base leading-relaxed text-ink-950/65 sm:text-lg">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sobre.contatos.map((c) => (
              <div key={c.cidade} className="flex items-center gap-3 rounded-2xl border border-ink-950/10 bg-white px-5 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-ink-950/50">{c.cidade}</div>
                  <div className="font-display text-base font-semibold text-ink-950">{c.numero}</div>
                </div>
              </div>
            ))}
          </Reveal>

          <StaggerGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.08}>
            {depoimentosLista.slice(0, 2).map((d) => (
              <StaggerItem key={d.texto.slice(0, 24)}>
                <TestimonialCard texto={d.texto} nome={d.nome} variant="light" />
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.1} className="mt-10 flex justify-center">
            <Button href={waLink(waMessages.header)} icon={<WhatsAppIcon className="h-5 w-5" />}>
              Falar com um especialista
            </Button>
          </Reveal>
        </div>
      </section>

      <Comparison />
      <Journey />
      <FiveReasons />
    </>
  )
}
