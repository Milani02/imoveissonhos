import { useParams } from "react-router-dom"
import { ArrowLeft, MapPin, Trees } from "lucide-react"
import { Reveal } from "../components/ui/Reveal"
import { LinkButton } from "../components/ui/LinkButton"
import { Button } from "../components/ui/Button"
import { WhatsAppIcon } from "../components/ui/WhatsAppIcon"
import { MapaLink } from "../components/imovel/MapaLink"
import { Gallery } from "../components/imovel/Gallery"
import { ContourLines } from "../components/ui/ContourLines"
import { chacarasImoveis, waLinkForImovel } from "../lib/imoveis"
import { NotFound } from "../components/NotFound"

export function ChacaraPage() {
  const { slug } = useParams()
  const imovel = chacarasImoveis.find((c) => c.slug === slug)

  if (!imovel) return <NotFound voltarPara="/imoveis" voltarLabel="Ver todos os imóveis" />

  return (
    <section className="relative overflow-hidden bg-ink-950 px-5 py-28 sm:px-8 sm:py-32">
      <ContourLines className="pointer-events-none absolute inset-x-0 top-24 h-[32rem] w-full text-gold-500/60 opacity-[0.07]" />

      <div className="relative mx-auto max-w-3xl">
        <LinkButton to="/imoveis" variant="outline" icon={<ArrowLeft className="h-4 w-4" />} className="!py-2 !text-xs">
          Ver todos os imóveis
        </LinkButton>

        {imovel.galeria.length > 0 && (
          <Reveal delay={0.03} className="mt-8">
            <Gallery images={imovel.galeria} alt={imovel.nome} />
            <p className="mt-3 text-xs text-cream-100/40">
              Foto ilustrativa de referência — não é uma foto da chácara específica. Veja a localização exata pelo link do mapa.
            </p>
          </Reveal>
        )}

        <Reveal className="mt-8 relative overflow-hidden rounded-3xl border border-gold-500/20 bg-gradient-to-br from-ink-900 to-ink-950 p-8 sm:p-10">
          <ContourLines className="pointer-events-none absolute inset-0 h-full w-full text-gold-500/60 opacity-[0.08]" />
          <Trees className="relative h-10 w-10 text-gold-500/60" strokeWidth={1.5} />

          <span className="relative mt-5 block text-xs font-bold tracking-[0.25em] text-gold-500 uppercase">Chácara</span>
          <h1 className="relative mt-2 font-display text-3xl font-semibold text-cream-50 sm:text-4xl">{imovel.nome}</h1>
          <div className="relative mt-2 flex items-center gap-2 text-sm text-cream-100/55">
            <MapPin className="h-4 w-4 text-gold-500/70" />
            {imovel.bairro}
          </div>

          <div className="relative mt-8 border-y border-cream-50/10 py-6">
            <div className="text-xs text-cream-100/40 uppercase">Área</div>
            <div className="font-display text-xl font-semibold tabular-nums text-gold-400">{imovel.area}</div>
          </div>

          <ul className="relative mt-6 space-y-2 text-sm text-cream-100/70">
            {imovel.destaques.map((d) => (
              <li key={d}>• {d}</li>
            ))}
          </ul>

          <p className="relative mt-6 text-sm text-cream-100/60">{imovel.condicao}</p>

          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={waLinkForImovel(imovel)} icon={<WhatsAppIcon className="h-5 w-5" />}>
              Tenho interesse
            </Button>
          </div>
        </Reveal>

        {imovel.mapaLink && (
          <Reveal delay={0.05} className="mt-6">
            <MapaLink href={imovel.mapaLink} />
          </Reveal>
        )}
      </div>
    </section>
  )
}
