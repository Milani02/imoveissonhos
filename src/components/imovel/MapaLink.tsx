import { MapPin, ExternalLink } from "lucide-react"

export function MapaLink({ href, label = "Ver localização no Google Maps" }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-4 rounded-2xl border border-ink-950/10 bg-white/60 px-5 py-4 transition-colors hover:border-gold-500/50"
    >
      <span className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
          <MapPin className="h-5 w-5" />
        </span>
        <span className="text-sm font-semibold text-ink-950">{label}</span>
      </span>
      <ExternalLink className="h-4 w-4 shrink-0 text-ink-950/40 transition-colors group-hover:text-gold-600" />
    </a>
  )
}
