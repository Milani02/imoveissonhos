import { Reveal, StaggerGroup, StaggerItem } from "../ui/Reveal"
import { LinkButton } from "../ui/LinkButton"
import { ImovelCard } from "../catalogo/ImovelCard"
import { lancamentos } from "../../lib/imoveis"
import { empreendimentos } from "../../lib/content"

const slugsEmDestaque = ["brisa-do-vale", "cafezal-do-sul", "reserva-hause", "viva-alameda"]
const destaques = slugsEmDestaque.map((slug) => lancamentos.find((l) => l.slug === slug)!).filter(Boolean)

export function LancamentosPreview() {
  return (
    <section id="lancamentos" className="bg-cream-50 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase">{empreendimentos.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink-950 text-balance sm:text-5xl">
              {empreendimentos.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-950/65 sm:text-lg">{empreendimentos.body}</p>
          </div>
          <LinkButton to="/imoveis?categoria=lancamento" variant="ghost" className="shrink-0">
            Ver todos os lançamentos
          </LinkButton>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {destaques.map((imovel) => (
            <StaggerItem key={imovel.slug}>
              <ImovelCard imovel={imovel} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <p className="mt-10 text-center text-xs text-ink-950/40">
          Imagens meramente ilustrativas. Plantas e acabamentos podem sofrer alterações.
        </p>
      </div>
    </section>
  )
}
