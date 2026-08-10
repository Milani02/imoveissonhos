import { MapPin } from "lucide-react"
import { Reveal, StaggerGroup, StaggerItem } from "../ui/Reveal"
import { CountUp } from "../ui/CountUp"
import { cities } from "../../lib/content"

const stats = [
  { value: "100%", label: "Financiamento facilitado, do terreno à construção" },
  { value: "5", label: "Motivos reais pra fechar com a gente" },
  { value: "4+", label: "Cidades atendidas no Paraná e Santa Catarina" },
]

export function StatsCities() {
  return (
    <section id="cidades" className="bg-cream-50 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <StaggerGroup className="grid grid-cols-1 gap-10 border-b border-ink-950/10 pb-16 sm:grid-cols-3" stagger={0.12}>
          {stats.map((stat) => (
            <StaggerItem key={stat.label} className="text-center sm:text-left">
              <div className="font-display text-5xl font-semibold text-gold-600 sm:text-6xl">
                <CountUp value={stat.value} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-950/65 sm:text-base">{stat.label}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-16 flex flex-col items-center gap-8 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div className="max-w-lg">
            <span className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase">Onde estamos</span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink-950 text-balance sm:text-4xl">
              Atendemos todo o Paraná — e já chegamos em Santa Catarina
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-950/60">
            De Londrina a Joinville, nossa consultoria acompanha você onde quer que o seu próximo endereço esteja.
          </p>
        </Reveal>

        <StaggerGroup className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start" stagger={0.06}>
          {cities.map((city) => (
            <StaggerItem key={city}>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink-950/10 bg-white px-5 py-2.5 text-sm font-semibold text-ink-950/80 shadow-sm">
                <MapPin className="h-4 w-4 text-gold-600" />
                {city}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
