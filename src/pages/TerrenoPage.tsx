import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, MapPin } from "lucide-react"
import { Reveal } from "../components/ui/Reveal"
import { LinkButton } from "../components/ui/LinkButton"
import { Button } from "../components/ui/Button"
import { WhatsAppIcon } from "../components/ui/WhatsAppIcon"
import { MapaLink } from "../components/imovel/MapaLink"
import { Gallery } from "../components/imovel/Gallery"
import { ContourLines } from "../components/ui/ContourLines"
import { loteamentosImoveis, waLinkForImovel } from "../lib/imoveis"
import { NotFound } from "../components/NotFound"

export function TerrenoPage() {
  const { slug } = useParams()
  const imovel = loteamentosImoveis.find((l) => l.slug === slug)

  if (!imovel) return <NotFound voltarPara="/imoveis" voltarLabel="Ver todos os imóveis" />

  return (
    <section className="relative overflow-hidden bg-ink-950 px-5 py-28 sm:px-8 sm:py-32">
      <ContourLines className="pointer-events-none absolute inset-x-0 top-24 h-[32rem] w-full text-gold-500/60 opacity-[0.07]" />

      <div className="relative mx-auto max-w-6xl">
        <LinkButton to="/imoveis" variant="outline" icon={<ArrowLeft className="h-4 w-4" />} className="!py-2 !text-xs">
          Ver todos os imóveis
        </LinkButton>

        <Reveal className="mt-8">
          <span className="text-xs font-bold tracking-[0.25em] text-gold-500 uppercase">Terreno · Loteamento</span>
          <h1 className="mt-3 font-display text-3xl font-semibold text-cream-50 text-balance sm:text-5xl">{imovel.nome}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-cream-100/60">
            <MapPin className="h-4 w-4 text-gold-500" />
            {imovel.regiao}
          </div>
          <p className="mt-4 max-w-2xl text-sm text-cream-100/60 sm:text-base">
            Forma de pagamento: {imovel.formaPagamento}
          </p>
        </Reveal>

        {imovel.galeria.length > 0 && (
          <Reveal delay={0.03} className="mt-8">
            <Gallery images={imovel.galeria} alt={imovel.nome} />
            <p className="mt-3 text-xs text-cream-100/40">
              Imagem meramente ilustrativa — não é uma foto real do loteamento ou do lote específico. Veja a localização exata pelo link do mapa.
            </p>
          </Reveal>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {imovel.mapaLink && <MapaLink href={imovel.mapaLink} />}
          <Button href={waLinkForImovel(imovel)} icon={<WhatsAppIcon className="h-5 w-5" />} className="!py-4">
            Simular este terreno
          </Button>
        </div>

        <Reveal delay={0.05} className="mt-12">
          <h2 className="font-display text-xl font-semibold text-cream-50">
            Lotes disponíveis <span className="text-cream-100/40">({imovel.lotes.length})</span>
          </h2>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-cream-50/10">
            <table className="w-full min-w-[640px] table-fixed border-collapse text-left text-sm">
              <colgroup>
                <col className="w-[26%]" />
                <col className="w-[24%]" />
                <col className="w-[16%]" />
                <col className="w-[22%]" />
                <col className="w-[12%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-cream-50/10 text-xs font-bold tracking-[0.1em] text-cream-100/40 uppercase">
                  <th className="px-5 py-4">Quadra / Lote</th>
                  <th className="px-5 py-4">Dimensões</th>
                  <th className="px-5 py-4">Área</th>
                  <th className="px-5 py-4">Matrícula</th>
                  <th className="px-5 py-4 text-right">Mapa</th>
                </tr>
              </thead>
              <tbody>
                {imovel.lotes.map((lote, i) => (
                  <motion.tr
                    key={`${lote.quadra}-${lote.lote}`}
                    className="border-b border-cream-50/5 text-cream-50 last:border-0"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3), ease: [0.16, 1, 0.3, 1] }}
                  >
                    <td className="px-5 py-4 font-semibold">
                      {lote.quadra} · {lote.lote}
                    </td>
                    <td className="px-5 py-4 text-cream-100/70">{lote.dimensoes} m</td>
                    <td className="px-5 py-4 tabular-nums text-cream-100/70">{lote.area.toLocaleString("pt-BR")} m²</td>
                    <td className="px-5 py-4 text-cream-100/50">{lote.matricula}</td>
                    <td className="px-5 py-4 text-right">
                      <a
                        href={lote.mapaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-cream-100/55 hover:text-gold-400"
                      >
                        Ver
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
