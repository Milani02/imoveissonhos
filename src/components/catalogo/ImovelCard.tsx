import { Link } from "react-router-dom"
import { MapPin, LandPlot, Trees, ArrowRight } from "lucide-react"
import { ContourLines } from "../ui/ContourLines"
import type { Imovel } from "../../lib/imoveis"

const categoriaLabel: Record<Imovel["categoria"], string> = {
  lancamento: "Lançamento",
  terreno: "Terreno",
  chacara: "Chácara",
}

function rotaFor(imovel: Imovel): string {
  if (imovel.categoria === "lancamento") return `/lancamentos/${imovel.slug}`
  if (imovel.categoria === "terreno") return `/terrenos/${imovel.slug}`
  return `/chacaras/${imovel.slug}`
}

export function ImovelCard({ imovel }: { imovel: Imovel }) {
  const temFoto = Boolean(imovel.capa)

  return (
    <Link
      to={rotaFor(imovel)}
      className="group block overflow-hidden rounded-2xl border border-ink-950/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-950/10"
    >
      {temFoto ? (
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={imovel.capa}
            alt={imovel.nome}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-ink-900 to-ink-950">
          <ContourLines className="absolute inset-0 h-full w-full text-gold-500/60 opacity-[0.12]" />
          {imovel.categoria === "chacara" ? (
            <Trees className="relative h-10 w-10 text-gold-500/50" strokeWidth={1.5} />
          ) : (
            <LandPlot className="relative h-10 w-10 text-gold-500/50" strokeWidth={1.5} />
          )}
        </div>
      )}

      <div className="p-5">
        <span className="text-[0.65rem] font-bold tracking-[0.14em] text-gold-600 uppercase">
          {categoriaLabel[imovel.categoria]}
        </span>
        <h3 className="mt-1.5 font-display text-lg leading-tight font-semibold text-ink-950">{imovel.nome}</h3>
        <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-ink-950/50">
          <MapPin className="h-3.5 w-3.5 text-gold-600/70" />
          {imovel.bairro ? `${imovel.bairro} · ${imovel.cidade}` : imovel.cidade}
        </div>

        <div className="mt-3 flex items-center gap-1.5 border-t border-ink-950/10 pt-3 text-sm font-bold text-gold-600 transition-colors group-hover:text-gold-700">
          Saiba mais
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  )
}
