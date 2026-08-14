import { useParams } from "react-router-dom"
import { ArrowLeft, MapPin, CheckCircle2 } from "lucide-react"
import { Reveal } from "../components/ui/Reveal"
import { LinkButton } from "../components/ui/LinkButton"
import { Button } from "../components/ui/Button"
import { WhatsAppIcon } from "../components/ui/WhatsAppIcon"
import { Gallery } from "../components/imovel/Gallery"
import { FichaTecnica } from "../components/imovel/FichaTecnica"
import { lancamentos, waLinkForImovel } from "../lib/imoveis"
import { NotFound } from "../components/NotFound"

export function LancamentoPage() {
  const { slug } = useParams()
  const imovel = lancamentos.find((l) => l.slug === slug)

  if (!imovel) return <NotFound voltarPara="/imoveis" voltarLabel="Ver todos os imóveis" />

  return (
    <section className="bg-cream-50 px-5 py-28 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <LinkButton to="/imoveis" variant="ghost" icon={<ArrowLeft className="h-4 w-4" />} className="!py-2 !text-xs">
          Ver todos os imóveis
        </LinkButton>

        <Reveal className="mt-8">
          <span className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase">Lançamento</span>
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink-950 text-balance sm:text-5xl">{imovel.nome}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-ink-950/60">
            <MapPin className="h-4 w-4 text-gold-600" />
            {imovel.bairro ? `${imovel.bairro} · ${imovel.cidade}` : imovel.cidade}
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-8">
          <Gallery images={imovel.galeria} video={imovel.video} alt={imovel.nome} />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <h2 className="font-display text-xl font-semibold text-ink-950">Diferenciais</h2>
            <ul className="mt-5 space-y-3">
              {imovel.destaques.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-950/70 sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                  {item}
                </li>
              ))}
            </ul>

            {imovel.plantas && (
              <div className="mt-6 flex flex-wrap gap-3">
                {imovel.plantas.map((p) => (
                  <div key={p.nome} className="rounded-xl border border-ink-950/10 bg-white px-4 py-2.5">
                    <div className="text-xs font-bold tracking-wide text-gold-600 uppercase">
                      {p.nome} · {p.area}
                    </div>
                    <div className="text-xs text-ink-950/60">{p.detalhe}</div>
                  </div>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal delay={0.05} className="flex flex-col gap-6">
            <div>
              <h2 className="mb-3 font-display text-xl font-semibold text-ink-950">Ficha técnica</h2>
              <FichaTecnica items={imovel.fichaTecnica} />
            </div>

            <Button href={waLinkForImovel(imovel)} icon={<WhatsAppIcon className="h-5 w-5" />}>
              Quero saber mais
            </Button>

            <p className="text-xs text-ink-950/40">Imagens meramente ilustrativas. Plantas e acabamentos podem sofrer alterações.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
