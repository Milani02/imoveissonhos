import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"

interface CountUpProps {
  value: string
  className?: string
  duration?: number
}

/** Animates the leading integer of a stat string (e.g. "100%", "4+", "1º") on scroll-into-view. */
export function CountUp({ value, className, duration = 1.4 }: CountUpProps) {
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : null
  const suffix = match ? match[2] : ""
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const shouldReduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(target === null || shouldReduceMotion ? target ?? 0 : 0)

  useEffect(() => {
    if (target === null || !inView || shouldReduceMotion) return
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration, shouldReduceMotion])

  if (target === null) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    )
  }

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
