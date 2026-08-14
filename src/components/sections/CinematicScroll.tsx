import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import stageLand from "../../assets/atmosphere-ai/stage-01-land.webp"
import stageConstruction from "../../assets/atmosphere-ai/stage-02-construction.webp"
import stageStreets from "../../assets/atmosphere-ai/stage-03-streets.webp"
import stageFinished from "../../assets/atmosphere-ai/stage-04-finished.webp"
import { growthStory } from "../../lib/content"

gsap.registerPlugin(ScrollTrigger)

const stages = [stageLand, stageConstruction, stageStreets, stageFinished]

/**
 * Scroll-scrubbed crossfade through a growth narrative (terreno → obra →
 * ruas → bairro pronto) — plain <img> layers driven by GSAP instead of a
 * canvas frame sequence, since these are independently generated stills
 * rather than a real continuous shot.
 */
export function CinematicScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLImageElement | null)[]>([])
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const images = imageRefs.current.filter(Boolean) as HTMLImageElement[]
    gsap.set(images[0], { opacity: 1, scale: 1 })
    images.slice(1).forEach((img) => gsap.set(img, { opacity: 0, scale: 1 }))

    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const distance = () => window.innerHeight * 2.2

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.4,
          pin: true,
          invalidateOnRefresh: true,
        },
      })

      // Each stage owns a quarter of the scroll; images crossfade at the
      // boundaries while continuously drifting in scale (Ken Burns).
      const n = images.length
      for (let i = 0; i < n; i++) {
        const start = i / n
        tl.to(images[i], { scale: 1.14, duration: 1 / n, ease: "none" }, start)
        if (i < n - 1) {
          const fadeStart = start + 1 / n - 0.06
          tl.to(images[i], { opacity: 0, duration: 0.1, ease: "power1.in" }, fadeStart)
            .to(images[i + 1], { opacity: 1, duration: 0.1, ease: "power1.out" }, fadeStart)
        }
      }

      tl.fromTo(line1Ref.current, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.12 }, 0.02)
        .to(line1Ref.current, { opacity: 0, y: -26, duration: 0.1 }, 0.17)
        .fromTo(line2Ref.current, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.12 }, 0.4)
        .to(line2Ref.current, { opacity: 0, y: -26, duration: 0.1 }, 0.58)
        .fromTo(line3Ref.current, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.14 }, 0.76)
        .to(line3Ref.current, { opacity: 0, y: -26, duration: 0.1 }, 0.93)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[100svh] w-full overflow-hidden bg-ink-950">
      <div className="absolute inset-0 scale-105">
        {stages.map((src, i) => (
          <img
            key={src}
            ref={(el) => {
              imageRefs.current[i] = el
            }}
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/50 via-transparent to-ink-950/75" />

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <div ref={line1Ref} className="absolute font-display text-5xl font-semibold text-cream-50 opacity-0 sm:text-7xl">
          {growthStory.line1}
        </div>
        <div
          ref={line2Ref}
          className="absolute max-w-2xl font-display text-3xl font-semibold text-cream-50 text-balance opacity-0 sm:text-5xl"
        >
          {growthStory.line2Pre}
          <span className="text-gold-400 italic">{growthStory.line2Emphasis}</span>
          {growthStory.line2Post}
        </div>
        <div
          ref={line3Ref}
          className="absolute max-w-2xl font-display text-3xl font-semibold text-cream-50 text-balance opacity-0 sm:text-5xl"
        >
          {growthStory.line3Pre}
          <span className="text-gold-400 italic">{growthStory.line3Emphasis}</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs font-bold tracking-[0.25em] text-cream-50/40 uppercase">
        Role pra continuar
      </div>
    </section>
  )
}
