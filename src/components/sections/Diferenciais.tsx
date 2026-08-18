import { useRef, type MouseEvent } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Smartphone, Building2, Wallet, HeartHandshake, type LucideIcon } from "lucide-react"
import { Reveal, StaggerGroup, StaggerItem } from "../ui/Reveal"
import { diferenciais } from "../../lib/content"

const icons: Record<string, LucideIcon> = { Smartphone, Building2, Wallet, HeartHandshake }

const imagemModules = import.meta.glob<{ default: string }>("../../assets/diferenciais/*.webp", { eager: true })

function imagemFor(slug: string): string | undefined {
  const mod = Object.entries(imagemModules).find(([filePath]) => filePath.endsWith(`/${slug}.webp`))
  return mod?.[1].default
}

function TiltCard({
  icon,
  title,
  description,
  imagem,
}: {
  icon: string
  title: string
  description: string
  imagem?: string
}) {
  const Icon = icons[icon]
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-40, 40], [8, -8]), { stiffness: 300, damping: 25 })
  const rotateY = useSpring(useTransform(x, [-40, 40], [-8, 8]), { stiffness: 300, damping: 25 })

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }
  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <StaggerItem>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        className="group relative h-full overflow-hidden rounded-2xl border border-ink-950/8 bg-white/60 p-7 shadow-[0_1px_0_rgba(0,0,0,0.03)] backdrop-blur-sm transition-shadow hover:shadow-[0_20px_50px_-20px_rgba(13,12,10,0.25)]"
      >
        {imagem && (
          <div className="-mx-7 -mt-7 mb-6 aspect-[4/3] overflow-hidden">
            <img src={imagem} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
        )}
        <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gold-400/0 blur-2xl transition-colors duration-500 group-hover:bg-gold-400/25" />
        <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-ink-950 text-gold-400 transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <h3 className="relative mt-5 font-display text-xl font-semibold text-ink-950">{title}</h3>
        <p className="relative mt-2.5 text-sm leading-relaxed text-ink-950/65">{description}</p>
      </motion.div>
    </StaggerItem>
  )
}

export function Diferenciais() {
  return (
    <section id="diferenciais" className="bg-cream-50 px-5 py-16 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase">{diferenciais.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink-950 text-balance sm:text-5xl">
            {diferenciais.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-950/65 sm:text-lg">{diferenciais.body}</p>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
          {diferenciais.cards.map((card) => (
            <TiltCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.description}
              imagem={imagemFor(card.slug)}
            />
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
