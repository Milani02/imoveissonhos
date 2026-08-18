import { motion } from "framer-motion"
import { Reveal } from "../ui/Reveal"
import { Button } from "../ui/Button"
import { WhatsAppIcon } from "../ui/WhatsAppIcon"
import { Logo } from "../ui/Logo"
import { finalCta, waLink, waMessages } from "../../lib/content"

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink-950 px-5 py-20 sm:px-8 sm:py-40">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-[120px]"
        />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal>
          <Logo variant="light" showTagline={false} className="justify-center opacity-90" />
        </Reveal>

        <Reveal delay={0.1}>
          <span className="mt-8 inline-block text-xs font-bold tracking-[0.25em] text-gold-500 uppercase">
            {finalCta.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={0.2}>
          <h2 className="mt-5 font-display text-4xl font-semibold text-cream-50 text-balance sm:text-6xl">
            {finalCta.headline}
          </h2>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-cream-100/70 sm:text-lg">{finalCta.body}</p>
        </Reveal>

        <Reveal delay={0.4} className="mt-10">
          <Button href={waLink(waMessages.finalCta)} icon={<WhatsAppIcon className="h-5 w-5" />} className="!px-8 !py-4 !text-base">
            {finalCta.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
