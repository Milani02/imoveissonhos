import { Check } from "lucide-react"
import { Reveal } from "../ui/Reveal"
import { Button } from "../ui/Button"
import { WhatsAppIcon } from "../ui/WhatsAppIcon"
import { comparison, waLink, waMessages } from "../../lib/content"

function Column({
  title,
  subtitle,
  points,
  note,
  accent,
}: {
  title: string
  subtitle: string
  points: string[]
  note: string
  accent: boolean
}) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-3xl border p-8 sm:p-10 ${
        accent ? "border-gold-500/30 bg-ink-900" : "border-cream-50/10 bg-ink-950"
      }`}
    >
      <h3 className="font-display text-2xl font-semibold text-cream-50 sm:text-3xl">
        {title} <span className="text-gold-400 italic">{subtitle}</span>
      </h3>
      <ul className="mt-7 flex-1 space-y-4">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-cream-100/80 sm:text-[0.95rem]">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/15">
              <Check className="h-3.5 w-3.5 text-gold-400" strokeWidth={3} />
            </span>
            {point}
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-cream-50/10 pt-5 text-xs font-semibold tracking-wide text-cream-100/50 uppercase">
        {note}
      </p>
    </div>
  )
}

export function Comparison() {
  return (
    <section id="comparativo" className="relative overflow-hidden bg-ink-950 px-5 py-16 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(242,194,48,0.08),_transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-gold-500 uppercase">{comparison.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-cream-50 text-balance sm:text-5xl">
            {comparison.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-cream-100/70 sm:text-lg">{comparison.body}</p>
        </Reveal>

        <div className="relative mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4">
          <Reveal direction="left" delay={0.1}>
            <Column {...comparison.ready} accent={false} />
          </Reveal>
          <Reveal direction="right" delay={0.2}>
            <Column {...comparison.planned} accent />
          </Reveal>

          <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-cream-50 bg-ink-950 font-display text-lg font-bold text-gold-400 shadow-xl md:flex">
            VS
          </div>
        </div>

        <Reveal className="mt-12 flex justify-center" delay={0.15}>
          <Button href={waLink(waMessages.comparison)} icon={<WhatsAppIcon className="h-5 w-5" />}>
            {comparison.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
