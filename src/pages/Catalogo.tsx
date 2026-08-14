import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { SearchX } from "lucide-react"
import { Reveal, StaggerGroup, StaggerItem } from "../components/ui/Reveal"
import { CountUp } from "../components/ui/CountUp"
import { Button } from "../components/ui/Button"
import { WhatsAppIcon } from "../components/ui/WhatsAppIcon"
import { FilterBar, filtrosVazios, type Filtros } from "../components/catalogo/FilterBar"
import { ImovelCard } from "../components/catalogo/ImovelCard"
import { AreasIncorporacao } from "../components/sections/AreasIncorporacao"
import { imoveis, lancamentos, loteamentosImoveis } from "../lib/imoveis"
import { waLink, waMessages } from "../lib/content"

export function Catalogo() {
  const [searchParams] = useSearchParams()
  const categoriaInicial = searchParams.get("categoria")
  const [filtros, setFiltros] = useState<Filtros>({
    ...filtrosVazios,
    categoria: categoriaInicial === "lancamento" || categoriaInicial === "terreno" || categoriaInicial === "chacara" ? categoriaInicial : "todos",
  })

  const temFiltroAtivo = JSON.stringify(filtros) !== JSON.stringify(filtrosVazios)

  const resultado = useMemo(() => {
    const busca = filtros.busca.trim().toLowerCase()
    return imoveis.filter((imovel) => {
      if (filtros.categoria !== "todos" && imovel.categoria !== filtros.categoria) return false
      if (filtros.cidade !== "todas" && imovel.cidade !== filtros.cidade) return false
      if (busca) {
        const alvo = `${imovel.nome} ${imovel.bairro ?? ""}`.toLowerCase()
        if (!alvo.includes(busca)) return false
      }
      return true
    })
  }, [filtros])

  const totalLotes = loteamentosImoveis.reduce((acc, l) => acc + l.lotes.length, 0)

  return (
    <>
    <section className="bg-cream-50 px-5 py-28 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase">Catálogo</span>
          <h1 className="mt-4 font-display text-3xl font-semibold text-ink-950 text-balance sm:text-5xl">
            Todos os imóveis, em um só lugar
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-950/65 sm:text-lg">
            Lançamentos, terrenos e chácaras em Londrina, Umuarama, Cafezal do Sul e região. Filtre por categoria e cidade.
          </p>
        </Reveal>

        <StaggerGroup className="mt-10 grid grid-cols-3 gap-4 border-y border-ink-950/10 py-6 sm:gap-8" stagger={0.08}>
          {[
            { value: `${lancamentos.length}`, label: "Lançamentos" },
            { value: `${totalLotes}+`, label: "Terrenos disponíveis" },
            { value: "3", label: "Cidades atendidas" },
          ].map((s) => (
            <StaggerItem key={s.label} className="text-center sm:text-left">
              <div className="font-display text-2xl font-bold text-gold-600 sm:text-3xl">
                <CountUp value={s.value} />
              </div>
              <div className="text-[0.65rem] font-semibold tracking-wide text-ink-950/50 uppercase sm:text-xs">{s.label}</div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-10">
          <FilterBar filtros={filtros} onChange={setFiltros} temFiltroAtivo={temFiltroAtivo} />
        </div>

        {resultado.length > 0 ? (
          <>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resultado.map((imovel) => (
                <ImovelCard key={`${imovel.categoria}-${imovel.slug}`} imovel={imovel} />
              ))}
            </div>
            <p className="mt-10 text-center text-xs text-ink-950/40">
              Imagens meramente ilustrativas, não representam o imóvel real — consulte a localização exata pelo link do mapa.
            </p>
          </>
        ) : (
          <Reveal className="mt-10 flex flex-col items-center gap-5 rounded-2xl border border-dashed border-ink-950/15 px-6 py-20 text-center">
            <SearchX className="h-10 w-10 text-ink-950/25" />
            <div>
              <h2 className="font-display text-xl font-semibold text-ink-950">Nenhum imóvel encontrado com esses filtros</h2>
              <p className="mt-2 max-w-md text-sm text-ink-950/55">
                Tente trocar a categoria ou a cidade — ou fale direto com um especialista, que a gente te ajuda a encontrar a opção certa.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setFiltros(filtrosVazios)}
                className="rounded-full border-2 border-ink-950/15 px-6 py-3 text-sm font-bold text-ink-950 transition-colors hover:border-gold-600 hover:text-gold-700"
              >
                Limpar filtros
              </button>
              <Button href={waLink(waMessages.header)} icon={<WhatsAppIcon className="h-4 w-4" />} className="!py-3">
                Falar com um especialista
              </Button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
    <AreasIncorporacao />
    </>
  )
}
