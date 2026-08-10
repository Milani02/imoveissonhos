import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown } from "lucide-react"
import heroImage from "../../assets/properties/hero-house-dusk.jpg"
import { Button } from "../ui/Button"
import { WhatsAppIcon } from "../ui/WhatsAppIcon"
import { CountUp } from "../ui/CountUp"
import { hero, waLink, waMessages } from "../../lib/content"

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85])

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] w-full overflow-hidden bg-ink-950">
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <img
          src={heroImage}
          alt="Casa moderna ao entardecer, com fachada iluminada e paisagismo cuidado"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/20"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 via-transparent to-ink-950/40" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pt-24 pb-12 sm:px-8 sm:pt-28 sm:pb-14"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-gold-500/40 bg-ink-950/40 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-gold-400 uppercase backdrop-blur-sm"
        >
          {hero.eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl font-display text-4xl leading-[1.05] font-semibold text-cream-50 text-balance sm:text-6xl lg:text-7xl"
        >
          {hero.headlineLine1}{" "}
          <em className="text-gold-400 not-italic italic">{hero.headlineEmphasis}</em> {hero.headlineLine2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-cream-100/85 sm:text-lg"
        >
          {hero.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.7 }}
          className="mt-7 flex flex-wrap items-center gap-4"
        >
          <Button href={waLink(waMessages.hero)} icon={<WhatsAppIcon className="h-5 w-5" />}>
            {hero.ctaPrimary}
          </Button>
          <Button href="#diferenciais" variant="outline">
            {hero.ctaSecondary}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.7 }}
          className="mt-8 grid max-w-xl grid-cols-3 gap-4 border-t border-cream-50/15 pt-5"
        >
          {hero.stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-2xl font-semibold text-gold-400 sm:text-3xl">
                <CountUp value={stat.value} />
              </div>
              <div className="mt-1 text-xs leading-tight text-cream-100/70 sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-6 w-6 text-cream-50/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
