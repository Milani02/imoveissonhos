import { Reveal, StaggerGroup, StaggerItem } from "../ui/Reveal"
import { fiveReasons } from "../../lib/content"

export function FiveReasons() {
  return (
    <section className="bg-cream-50 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase">{fiveReasons.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink-950 text-balance sm:text-5xl">
            {fiveReasons.heading}
          </h2>
        </Reveal>

        <StaggerGroup className="mt-14 flex flex-col" stagger={0.1}>
          {fiveReasons.reasons.map((reason, i) => (
            <StaggerItem key={reason.title}>
              <div className="group flex items-start gap-6 border-b border-ink-950/10 py-7 first:pt-0 last:border-b-0">
                <span className="font-display text-4xl font-semibold text-gold-500/70 tabular-nums transition-colors group-hover:text-gold-500 sm:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1">
                  <h3 className="font-display text-xl font-semibold text-ink-950 sm:text-2xl">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-950/65 sm:text-base">{reason.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
