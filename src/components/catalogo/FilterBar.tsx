import { Search, X } from "lucide-react"
import type { Categoria } from "../../lib/imoveis"

export interface Filtros {
  busca: string
  categoria: Categoria | "todos"
  cidade: string
}

export const filtrosVazios: Filtros = {
  busca: "",
  categoria: "todos",
  cidade: "todas",
}

const categorias: { value: Filtros["categoria"]; label: string }[] = [
  { value: "todos", label: "Todas as categorias" },
  { value: "lancamento", label: "Lançamentos" },
  { value: "terreno", label: "Terrenos" },
  { value: "chacara", label: "Chácaras" },
]

const cidades = ["todas", "Londrina", "Umuarama", "Cafezal do Sul", "Xambrê", "Pérola", "Região de Umuarama"]

const inputClass =
  "w-full rounded-xl border border-ink-950/12 bg-white px-3.5 py-2.5 text-sm text-ink-950 placeholder:text-ink-950/35 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 focus:outline-none"

interface FilterBarProps {
  filtros: Filtros
  onChange: (filtros: Filtros) => void
  temFiltroAtivo: boolean
}

export function FilterBar({ filtros, onChange, temFiltroAtivo }: FilterBarProps) {
  function set<K extends keyof Filtros>(key: K, value: Filtros[K]) {
    onChange({ ...filtros, [key]: value })
  }

  return (
    <div className="rounded-2xl border border-ink-950/10 bg-cream-100/60 p-5 sm:p-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="relative sm:col-span-2 lg:col-span-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-ink-950/35" />
          <input
            type="text"
            value={filtros.busca}
            onChange={(e) => set("busca", e.target.value)}
            placeholder="Buscar por nome ou bairro"
            className={`${inputClass} pl-10`}
          />
        </label>

        <select value={filtros.categoria} onChange={(e) => set("categoria", e.target.value as Filtros["categoria"])} className={inputClass}>
          {categorias.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <select value={filtros.cidade} onChange={(e) => set("cidade", e.target.value)} className={inputClass}>
          {cidades.map((c) => (
            <option key={c} value={c}>
              {c === "todas" ? "Todas as cidades" : c}
            </option>
          ))}
        </select>

        {temFiltroAtivo && (
          <button
            type="button"
            onClick={() => onChange(filtrosVazios)}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-ink-950/12 px-3.5 py-2.5 text-sm font-semibold text-ink-950/60 transition-colors hover:border-gold-500/50 hover:text-gold-600"
          >
            <X className="h-4 w-4" />
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  )
}
