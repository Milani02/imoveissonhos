import type { FichaItem } from "../../lib/imoveis"

export function FichaTecnica({ items }: { items: FichaItem[] }) {
  if (items.length === 0) return null

  return (
    <dl className="divide-y divide-ink-950/10 rounded-2xl border border-ink-950/10 bg-white/60">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <dt className="text-xs font-bold tracking-[0.12em] text-ink-950/45 uppercase">{item.label}</dt>
          <dd className="text-sm font-semibold text-ink-950 sm:text-right">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
