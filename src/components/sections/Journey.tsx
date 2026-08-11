import { useLayoutEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { KeyRound, Smartphone, Handshake, PartyPopper, type LucideIcon } from "lucide-react"
import { Reveal } from "../ui/Reveal"
import { journey } from "../../lib/content"
import constructionImg from "../../assets/properties/construction.jpg"
import keysHandoffImg from "../../assets/properties/keys-handoff.jpg"

gsap.registerPlugin(ScrollTrigger)

const icons: Record<string, LucideIcon> = { KeyRound, Smartphone, Handshake, PartyPopper }
const stageImages: Record<string, string> = { construction: constructionImg, keysHandoff: keysHandoffImg }

/**
 * Viewport width is the single source of truth here (matches Tailwind's own
 * `lg:` breakpoint exactly), so the JS setup and the rendered markup can
 * never disagree. Pointer-type detection was tried here too, but proved
 * unreliable in the field (some mobile browsers report "fine" pointer in
 * desktop-site mode) — width alone is the predictable, standard signal.
 */
function computeUsePinnedStack() {
  if (typeof window === "undefined") return false
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  return isDesktop && !prefersReduced
}

export function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])
  const [usePinnedStack, setUsePinnedStack] = useState(computeUsePinnedStack)

  useLayoutEffect(() => {
    const onResize = () => setUsePinnedStack(computeUsePinnedStack())
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useLayoutEffect(() => {
    if (!usePinnedStack) return

    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
      const dots = dotRefs.current.filter(Boolean) as HTMLDivElement[]
      if (!section || cards.length < 2) return

      gsap.set(cards[0], { scale: 1, opacity: 1, rotate: 0, zIndex: 10 })
      cards.slice(1).forEach((c, i) => gsap.set(c, { scale: 0.9, opacity: 0, rotate: 3, zIndex: 10 + i + 1 }))
      if (dots[0]) gsap.set(dots[0], { opacity: 1 })
      dots.slice(1).forEach((d) => gsap.set(d, { opacity: 0.3 }))

      const n = cards.length
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * (n - 1) * 1.3}`,
          scrub: 0.5,
          pin: true,
          invalidateOnRefresh: true,
        },
      })

      for (let i = 0; i < n - 1; i++) {
        tl.to(cards[i], { scale: 1.06, opacity: 0, rotate: -3, duration: 1, ease: "power1.inOut" }, i)
          .to(cards[i + 1], { scale: 1, opacity: 1, rotate: 0, duration: 1, ease: "power1.inOut" }, i)
        if (dots[i]) tl.to(dots[i], { opacity: 0.3, duration: 0.3 }, i)
        if (dots[i + 1]) tl.to(dots[i + 1], { opacity: 1, duration: 0.3 }, i)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [usePinnedStack])

  return (
    <section id="jornada" ref={sectionRef} className="relative overflow-hidden bg-ink-950">
      <div className={`flex h-auto w-full flex-col justify-center py-24 ${usePinnedStack ? "min-h-screen lg:h-screen lg:py-0" : ""}`}>
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <Reveal>
            <span className="text-xs font-bold tracking-[0.25em] text-gold-500 uppercase">{journey.eyebrow}</span>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold text-cream-50 text-balance sm:text-5xl">
              {journey.heading}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-cream-100/65 sm:text-lg">{journey.body}</p>
          </Reveal>
        </div>

        {usePinnedStack ? (
          <div className="mt-14 flex items-center justify-center gap-16">
            <div className="relative h-[26rem] w-[34rem]">
              {journey.stages.map((stage, i) => {
                const Icon = icons[stage.icon]
                const bg = stage.image ? stageImages[stage.image] : null
                return (
                  <div
                    key={stage.title}
                    ref={(el) => {
                      cardRefs.current[i] = el
                    }}
                    className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[2rem] border border-cream-50/10 bg-ink-900 p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]"
                  >
                    {bg && (
                      <>
                        <img src={bg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/85 to-ink-900/50" />
                      </>
                    )}
                    <div className="relative flex items-center justify-between">
                      <span className="text-xs font-bold tracking-[0.2em] text-gold-500 uppercase">{stage.tag}</span>
                      <span className="font-display text-4xl font-semibold text-cream-50/15">0{i + 1}</span>
                    </div>
                    <div className="relative">
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-400">
                        <Icon className="h-8 w-8" strokeWidth={1.75} />
                      </div>
                      <h3 className="font-display text-3xl font-semibold text-cream-50">{stage.title}</h3>
                      <p className="mt-3 max-w-md text-base leading-relaxed text-cream-100/70">{stage.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col gap-6">
              {journey.stages.map((stage, i) => (
                <div
                  key={stage.title}
                  ref={(el) => {
                    dotRefs.current[i] = el
                  }}
                  className="flex items-center gap-3"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-gold-500" />
                  <span className="font-display text-lg font-semibold whitespace-nowrap text-cream-50">{stage.title}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-10 flex flex-col gap-5 overflow-x-hidden px-5 sm:px-8">
            {journey.stages.map((stage, i) => {
              const Icon = icons[stage.icon]
              const bg = stage.image ? stageImages[stage.image] : null
              return (
                <motion.div
                  key={stage.title}
                  initial={{ opacity: 0, x: 90 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex items-start gap-4 overflow-hidden rounded-2xl border border-cream-50/10 bg-ink-900 p-5 sm:gap-5 sm:p-6"
                >
                  {bg && (
                    <>
                      <img src={bg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-25" />
                      <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/60" />
                    </>
                  )}
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <div className="relative min-w-0 flex-1">
                    <span className="text-xs font-bold tracking-[0.2em] text-gold-500 uppercase">{stage.tag}</span>
                    <h3 className="mt-1 font-display text-xl font-semibold text-cream-50 text-balance">{stage.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream-100/70">{stage.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
