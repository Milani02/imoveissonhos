import { Star, Quote } from "lucide-react"
import { WhatsAppIcon } from "./WhatsAppIcon"

interface TestimonialCardProps {
  texto: string
  nome: string
  variant?: "dark" | "light"
  className?: string
}

export function TestimonialCard({ texto, nome, variant = "dark", className }: TestimonialCardProps) {
  const dark = variant === "dark"

  return (
    <div
      className={`flex h-full flex-col rounded-2xl border p-6 sm:p-7 ${
        dark ? "border-cream-50/10 bg-ink-900" : "border-ink-950/10 bg-white"
      } ${className ?? ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
          ))}
        </div>
        <Quote className={`h-6 w-6 ${dark ? "text-gold-500/30" : "text-gold-600/25"}`} />
      </div>

      <p className={`mt-5 flex-1 text-sm leading-relaxed sm:text-base ${dark ? "text-cream-100/80" : "text-ink-950/70"}`}>
        {texto}
      </p>

      <div className={`mt-6 flex items-center gap-3 border-t pt-5 ${dark ? "border-cream-50/10" : "border-ink-950/10"}`}>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 font-display text-sm font-semibold text-gold-600">
          {nome.charAt(0)}
        </div>
        <div>
          <div className={`text-sm font-semibold ${dark ? "text-cream-50" : "text-ink-950"}`}>{nome}</div>
          <div className={`flex items-center gap-1.5 text-xs ${dark ? "text-cream-100/50" : "text-ink-950/45"}`}>
            <WhatsAppIcon className="h-3 w-3" />
            Depoimento via WhatsApp
          </div>
        </div>
      </div>
    </div>
  )
}
