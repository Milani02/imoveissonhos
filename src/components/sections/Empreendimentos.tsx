import { motion } from "framer-motion"
import { MapPin, Home, CheckCircle2 } from "lucide-react"
import brisaAerea from "../../assets/empreendimentos/brisa-do-vale-aerea.jpg"
import brisaFachada from "../../assets/empreendimentos/brisa-do-vale-fachada.jpg"
import cafezalAerea from "../../assets/empreendimentos/cafezal-aerea.jpg"
import cafezalFachada from "../../assets/empreendimentos/cafezal-fachada.jpg"
import { Reveal, StaggerGroup, StaggerItem } from "../ui/Reveal"
import { Button } from "../ui/Button"
import { WhatsAppIcon } from "../ui/WhatsAppIcon"
import { empreendimentos, brisaDoVale, cafezal, waLink, waMessages, whatsappNumbers } from "../../lib/content"

function EmpreendimentoCard({
  eyebrow,
  nome,
  cidade,
  precoDesde,
  precoLabel,
  destaques,
  imgMain,
  imgSecondary,
  waMessage,
  waNumber,
  badge,
  reverse,
  plantas,
}: {
  eyebrow: string
  nome: string
  cidade: string
  precoDesde: string
  precoLabel: string
  destaques: string[]
  imgMain: string
  imgSecondary: string
  waMessage: string
  waNumber: string
  badge?: string
  reverse?: boolean
  plantas?: { nome: string; area: string; detalhe: string }[]
}) {
  return (
    <div className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${reverse ? "" : ""}`}>
      <Reveal direction={reverse ? "right" : "left"} className={reverse ? "lg:order-2" : ""}>
        <div className="group relative overflow-hidden rounded-3xl border border-cream-50/10">
          <motion.img
            src={imgMain}
            alt={`Vista aérea do ${nome}`}
            className="aspect-[4/3] w-full object-cover"
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
          {badge && (
            <div className="absolute top-5 left-5 rounded-full bg-gold-500 px-4 py-1.5 text-xs font-bold tracking-wide text-ink-950 uppercase shadow-lg">
              {badge}
            </div>
          )}
          <div className="absolute -bottom-10 -right-10 hidden h-40 w-52 overflow-hidden rounded-2xl border-4 border-cream-50 shadow-2xl sm:block">
            <img src={imgSecondary} alt={`Fachada ${nome}`} className="h-full w-full object-cover" />
          </div>
        </div>
      </Reveal>

      <Reveal direction={reverse ? "left" : "right"} delay={0.1} className={reverse ? "lg:order-1" : ""}>
        <span className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase">{eyebrow}</span>
        <h3 className="mt-3 font-display text-3xl font-semibold text-ink-950 sm:text-4xl">{nome}</h3>
        <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-ink-950/60">
          <MapPin className="h-4 w-4 text-gold-600" />
          {cidade}
        </div>

        <div className="mt-6">
          <span className="text-xs font-bold tracking-wide text-ink-950/50 uppercase">A partir de</span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-gold-600 sm:text-4xl">{precoDesde}</span>
            <span className="text-sm text-ink-950/60">{precoLabel}</span>
          </div>
        </div>

        <ul className="mt-6 space-y-3">
          {destaques.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-950/70 sm:text-base">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
              {item}
            </li>
          ))}
        </ul>

        {plantas && (
          <div className="mt-6 flex flex-wrap gap-3">
            {plantas.map((p) => (
              <div key={p.nome} className="rounded-xl border border-ink-950/10 bg-white px-4 py-2.5">
                <div className="text-xs font-bold tracking-wide text-gold-600 uppercase">{p.nome} · {p.area}</div>
                <div className="text-xs text-ink-950/60">{p.detalhe}</div>
              </div>
            ))}
          </div>
        )}

        <Button href={waLink(waMessage, waNumber)} icon={<WhatsAppIcon className="h-5 w-5" />} className="mt-8">
          Quero saber mais
        </Button>
      </Reveal>
    </div>
  )
}

export function Empreendimentos() {
  return (
    <section id="empreendimentos" className="bg-cream-50 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase">{empreendimentos.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink-950 text-balance sm:text-5xl">
            {empreendimentos.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-950/65 sm:text-lg">{empreendimentos.body}</p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-24 sm:mt-24 sm:gap-32">
          <EmpreendimentoCard
            eyebrow="Lançamento · Umuarama"
            nome={brisaDoVale.nome}
            cidade={`${brisaDoVale.bairro} · ${brisaDoVale.cidade}`}
            precoDesde={brisaDoVale.precoDesde}
            precoLabel="entrada 100% parcelada"
            destaques={brisaDoVale.destaques}
            imgMain={brisaAerea}
            imgSecondary={brisaFachada}
            waMessage={waMessages.brisaDoVale}
            waNumber={whatsappNumbers.umuarama}
            badge="Minha Casa Minha Vida"
            plantas={brisaDoVale.plantas}
          />

          <EmpreendimentoCard
            eyebrow="Lançamento · Cafezal do Sul"
            nome={cafezal.nome}
            cidade={cafezal.cidade}
            precoDesde={cafezal.precoDesde}
            precoLabel={`${cafezal.areaConstruida} de área construída`}
            destaques={cafezal.destaques}
            imgMain={cafezalAerea}
            imgSecondary={cafezalFachada}
            waMessage={waMessages.cafezal}
            waNumber={whatsappNumbers.geral}
            badge={cafezal.unidades}
            reverse
          />
        </div>

        <StaggerGroup className="mt-20 grid grid-cols-2 gap-4 border-t border-ink-950/10 pt-10 sm:mt-24 sm:grid-cols-4" stagger={0.08}>
          {[
            { icon: Home, label: "Plantas de 43 a 50m²" },
            { icon: MapPin, label: "Bairros em valorização" },
            { icon: CheckCircle2, label: "Financiamento facilitado" },
            { icon: CheckCircle2, label: "Entrada 100% parcelada" },
          ].map(({ icon: Icon, label }) => (
            <StaggerItem key={label}>
              <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
                <Icon className="h-5 w-5 shrink-0 text-gold-600" />
                <span className="text-xs font-semibold text-ink-950/60 sm:text-sm">{label}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <p className="mt-10 text-center text-xs text-ink-950/40">
          Imagens meramente ilustrativas. Plantas e acabamentos podem sofrer alterações.
        </p>
      </div>
    </section>
  )
}
