import { motion, useReducedMotion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

type Direction = "up" | "down" | "left" | "right" | "none"

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
}

interface RevealProps {
  children: ReactNode
  className?: string
  direction?: Direction
  delay?: number
  duration?: number
  once?: boolean
  amount?: number
}

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.7,
  once = true,
  amount = 0.25,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const offset = offsets[direction]

  const variants: Variants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : offset.x, y: shouldReduceMotion ? 0 : offset.y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.01 : duration, delay, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

interface StaggerProps {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
  once?: boolean
  amount?: number
}

export function StaggerGroup({ children, className, stagger = 0.1, delay = 0, once = true, amount = 0.2 }: StaggerProps) {
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }
  return (
    <motion.div className={className} initial="hidden" whileInView="visible" viewport={{ once, amount }} variants={variants}>
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className, direction = "up" }: { children: ReactNode; className?: string; direction?: Direction }) {
  const shouldReduceMotion = useReducedMotion()
  const offset = offsets[direction]
  const variants: Variants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : offset.x, y: shouldReduceMotion ? 0 : offset.y },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: shouldReduceMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] } },
  }
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}
