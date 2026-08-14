import { Reveal, StaggerGroup, StaggerItem } from "../ui/Reveal"
import { TestimonialCard } from "../ui/TestimonialCard"
import { depoimentos, depoimentosLista } from "../../lib/content"

export function Depoimentos() {
  return (
    <section className="bg-ink-950 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-gold-500 uppercase">{depoimentos.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-cream-50 text-balance sm:text-5xl">{depoimentos.heading}</h2>
          <p className="mt-5 text-base leading-relaxed text-cream-100/65 sm:text-lg">{depoimentos.body}</p>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2" stagger={0.1}>
          {depoimentosLista.map((d) => (
            <StaggerItem key={d.texto.slice(0, 24)}>
              <TestimonialCard texto={d.texto} nome={d.nome} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
