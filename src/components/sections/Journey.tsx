import { useLayoutEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { KeyRound, Smartphone, Landmark, PartyPopper, type LucideIcon } from "lucide-react"
import { Reveal } from "../ui/Reveal"
import { journey } from "../../lib/content"
import constructionImg from "../../assets/properties/construction.jpg"
import keysHandoffImg from "../../assets/properties/keys-handoff.jpg"

gsap.registerPlugin(ScrollTrigger)

const icons: Record<string, LucideIcon> = { KeyRound, Smartphone, Landmark, PartyPopper }
const stageImages: Record<string, string> = { construction: constructionImg, keysHandoff: keysHandoffImg }

export function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches
    if (prefersReduced || !isDesktop) return

    const ctx = gsap.context(() => {
      const track = trackRef.current
      const section = sectionRef.current
      if (!track || !section) return

      const distance = track.scrollWidth - window.innerWidth

      const tween = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance + window.innerHeight * 2.4}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      })

      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance + window.innerHeight * 2.4}`,
            scrub: 0.6,
          },
        })
      }

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="jornada" ref={sectionRef} className="relative overflow-hidden bg-ink-950">
      <div className="flex h-auto min-h-screen w-full flex-col justify-center py-24 lg:h-screen lg:py-0">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <Reveal>
            <span className="text-xs font-bold tracking-[0.25em] text-gold-500 uppercase">{journey.eyebrow}</span>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold text-cream-50 text-balance sm:text-5xl">
              {journey.heading}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-cream-100/65 sm:text-lg">{journey.body}</p>
          </Reveal>

          <div className="mt-3 h-px w-full max-w-md origin-left scale-x-0 bg-gold-500/40 lg:hidden" />
        </div>

        <div className="relative mt-14 hidden overflow-hidden lg:block">
          <div className="mx-auto mb-6 h-[2px] w-full max-w-7xl bg-cream-50/10">
            <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-gold-500" />
          </div>
          <div ref={trackRef} className="flex w-max gap-6 px-8 pb-4">
            {journey.stages.map((stage, i) => {
              const Icon = icons[stage.icon]
              const bg = stage.image ? stageImages[stage.image] : null
              return (
                <div
                  key={stage.title}
                  className="relative flex h-[22rem] w-[22rem] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-cream-50/10 bg-ink-900 p-8 xl:w-[26rem]"
                >
                  {bg && (
                    <>
                      <img src={bg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-35" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/80 to-ink-900/40" />
                    </>
                  )}
                  <div className="relative flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[0.2em] text-gold-500 uppercase">{stage.tag}</span>
                    <span className="font-display text-3xl font-semibold text-cream-50/15">0{i + 1}</span>
                  </div>
                  <div className="relative">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-400">
                      <Icon className="h-7 w-7" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-cream-50">{stage.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream-100/70">{stage.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 overflow-x-hidden px-5 sm:px-8 lg:hidden">
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
                className="relative flex gap-5 overflow-hidden rounded-2xl border border-cream-50/10 bg-ink-900 p-6"
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
                <div className="relative">
                  <span className="text-xs font-bold tracking-[0.2em] text-gold-500 uppercase">{stage.tag}</span>
                  <h3 className="mt-1 font-display text-xl font-semibold text-cream-50">{stage.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream-100/70">{stage.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
