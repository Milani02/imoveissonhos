import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const FRAME_COUNT = 96
const framePath = (i: number) => `/frames/cafezal/f${String(i).padStart(3, "0")}.webp`

/**
 * Signature "video fragmentado em imagens": a sequência real de frames do drone
 * de Cafezal do Sul, desenhada em canvas em tela cheia e escrubada pelo scroll
 * via GSAP — não é um vídeo tocando, é o próprio scroll do usuário que controla
 * o tempo.
 */
export function CinematicScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const frameState = useRef({ index: 0 })

  useLayoutEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    function draw() {
      const img = imagesRef.current[frameState.current.index]
      if (!img || !img.complete || img.naturalWidth === 0) return
      const cw = canvas!.clientWidth
      const ch = canvas!.clientHeight
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const dw = img.naturalWidth * scale
      const dh = img.naturalHeight * scale
      ctx!.clearRect(0, 0, cw, ch)
      ctx!.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
    }

    // Sizes the canvas bitmap from an authoritative rect (either a
    // ResizeObserver entry or a fresh getBoundingClientRect), never from a
    // possibly-stale clientWidth read — that staleness is what left a gap
    // on mobile when the pinned section's width was captured a beat late.
    function applySize(width: number, height: number) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = Math.max(1, Math.round(width * dpr))
      canvas!.height = Math.max(1, Math.round(height * dpr))
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      applySize(rect.width, rect.height)
      ScrollTrigger.refresh()
    }

    const images: HTMLImageElement[] = []
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.decoding = "async"
      img.onload = draw
      img.src = framePath(i)
      images.push(img)
    }
    imagesRef.current = images

    // ResizeObserver catches mobile viewport changes (address bar show/hide,
    // orientation change) that don't always fire a window "resize" event.
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) applySize(entry.contentRect.width, entry.contentRect.height)
      ScrollTrigger.refresh()
    })
    ro.observe(canvas)
    window.addEventListener("resize", resize)
    window.visualViewport?.addEventListener("resize", resize)
    resize()
    // One more pass after everything (fonts, layout) has settled.
    const settleTimer = window.setTimeout(resize, 500)

    if (prefersReduced) {
      frameState.current.index = Math.floor(FRAME_COUNT / 2)
      draw()
      return () => {
        window.removeEventListener("resize", resize)
        window.visualViewport?.removeEventListener("resize", resize)
        window.clearTimeout(settleTimer)
        ro.disconnect()
      }
    }

    const ctxGsap = gsap.context(() => {
      const distance = () => window.innerHeight * 2.2

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.4,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(FRAME_COUNT - 1, Math.floor(self.progress * FRAME_COUNT))
            if (idx !== frameState.current.index) {
              frameState.current.index = idx
              draw()
            }
          },
        },
      })

      tl.fromTo(line1Ref.current, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.12 }, 0.02)
        .to(line1Ref.current, { opacity: 0, y: -26, duration: 0.1 }, 0.17)
        .fromTo(line2Ref.current, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.12 }, 0.4)
        .to(line2Ref.current, { opacity: 0, y: -26, duration: 0.1 }, 0.58)
        .fromTo(line3Ref.current, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.14 }, 0.76)
        .to(line3Ref.current, { opacity: 0, y: -26, duration: 0.1 }, 0.93)
    }, sectionRef)

    return () => {
      window.removeEventListener("resize", resize)
      window.visualViewport?.removeEventListener("resize", resize)
      window.clearTimeout(settleTimer)
      ro.disconnect()
      ctxGsap.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[100svh] w-full overflow-hidden bg-ink-950">
      {/* scale-105 overscans the canvas slightly so sub-pixel rounding on
          high-DPI phones (bitmap px vs CSS px never divide evenly) never
          leaves a hairline gap at the edge. */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full scale-105" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/50 via-transparent to-ink-950/75" />

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <div ref={line1Ref} className="absolute font-display text-5xl font-semibold text-cream-50 opacity-0 sm:text-7xl">
          Cafezal do Sul
        </div>
        <div
          ref={line2Ref}
          className="absolute max-w-2xl font-display text-3xl font-semibold text-cream-50 text-balance opacity-0 sm:text-5xl"
        >
          Um bairro inteiro <span className="text-gold-400 italic">nascendo</span>
        </div>
        <div
          ref={line3Ref}
          className="absolute max-w-2xl font-display text-3xl font-semibold text-cream-50 text-balance opacity-0 sm:text-5xl"
        >
          Sua próxima casa pode <span className="text-gold-400 italic">estar aqui</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs font-bold tracking-[0.25em] text-cream-50/40 uppercase">
        Role pra continuar
      </div>
    </section>
  )
}
