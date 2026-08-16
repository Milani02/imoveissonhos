import { Ruler, FileCheck2, ExternalLink } from "lucide-react"
import { Reveal, StaggerGroup, StaggerItem } from "../ui/Reveal"
import { Button } from "../ui/Button"
import { WhatsAppIcon } from "../ui/WhatsAppIcon"
import { areasIncorporacao, imagemIncorporacao, waLinkIncorporacao, type AreaIncorporacao } from "../../lib/incorporacao"

const statusLabel: Record<AreaIncorporacao["status"], string> = {
  disponivel: "Disponível",
  andamento: "Em andamento",
  comercial: "Uso comercial",
}

function AreaCard({ item }: { item: AreaIncorporacao }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gold-500/20 bg-gradient-to-br from-ink-900 to-ink-950">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={imagemIncorporacao(item.slug)} alt="" className="h-full w-full object-cover" loading="lazy" />
        <span className="absolute top-2.5 left-2.5 rounded-full bg-ink-950/70 px-2.5 py-1 text-[0.6rem] font-bold tracking-[0.08em] text-cream-50 uppercase backdrop-blur-sm">
          Imagem ilustrativa
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="text-[0.65rem] font-bold tracking-[0.14em] text-gold-500 uppercase">{statusLabel[item.status]}</span>
        <h3 className="mt-1.5 font-display text-lg leading-tight font-semibold text-cream-50">{item.nome}</h3>
        <div className="mt-1 text-xs font-semibold text-cream-100/50">{item.regiao}</div>

        <div className="mt-4 space-y-2 border-t border-cream-50/10 pt-4 text-sm text-cream-100/70">
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4 shrink-0 text-gold-500/70" />
            {item.area}
          </div>
          <div className="flex items-center gap-2">
            <FileCheck2 className="h-4 w-4 shrink-0 text-gold-500/70" />
            {item.matricula}
          </div>
          {item.observacao && <div className="pl-6 text-xs text-cream-100/45">{item.observacao}</div>}
        </div>

        <div className="mt-5 flex flex-1 flex-col justify-end gap-3">
          <a
            href={item.mapaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cream-100/55 hover:text-gold-400"
          >
            Ver no mapa
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <Button href={waLinkIncorporacao(item)} icon={<WhatsAppIcon className="h-4 w-4" />} className="!py-2.5 !text-sm">
            Consultar disponibilidade
          </Button>
        </div>
      </div>
    </div>
  )
}

function AreaGroup({ items }: { items: AreaIncorporacao[] }) {
  return (
    <StaggerGroup className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05} amount={0.05}>
      {items.map((item) => (
        <StaggerItem key={item.slug}>
          <AreaCard item={item} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  )
}

export function AreasIncorporacao() {
  const disponiveis = areasIncorporacao.filter((a) => a.status === "disponivel")
  const andamento = areasIncorporacao.filter((a) => a.status === "andamento")
  const comercial = areasIncorporacao.filter((a) => a.status === "comercial")

  return (
    <section className="bg-ink-950 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold tracking-[0.25em] text-gold-500 uppercase">Para incorporadoras e construtoras</span>
          <h2 className="mt-4 font-display text-2xl font-semibold text-cream-50 sm:text-4xl">
            Áreas e glebas para novos empreendimentos
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-cream-100/60 sm:text-base">
            Terrenos e glebas de maior porte, prontos para incorporação — indicados para quem vai desenvolver um novo
            lançamento, condomínio ou empreendimento comercial na região.
          </p>
        </Reveal>

        <AreaGroup items={disponiveis} />

        {andamento.length > 0 && (
          <>
            <h3 className="mt-14 font-display text-lg font-semibold text-cream-50">Empreendimentos em andamento</h3>
            <AreaGroup items={andamento} />
          </>
        )}

        {comercial.length > 0 && (
          <>
            <h3 className="mt-14 font-display text-lg font-semibold text-cream-50">Lotes comerciais</h3>
            <p className="mt-2 max-w-2xl text-sm text-cream-100/55">
              Lotes de menor porte já preparados para uso comercial — pontos de fluxo, esquinas e áreas centrais.
            </p>
            <AreaGroup items={comercial} />
          </>
        )}

        <p className="mt-10 text-xs text-cream-100/40">
          Imagens meramente ilustrativas. Áreas voltadas a incorporadoras e construtoras — condições e disponibilidade sob
          consulta.
        </p>
      </div>
    </section>
  )
}
