import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "../../lib/utils"

interface ButtonProps {
  href: string
  children: ReactNode
  variant?: "gold" | "outline" | "ghost"
  icon?: ReactNode
  className?: string
  onClick?: () => void
}

export const buttonVariants = {
  gold: "bg-gold-500 text-ink-950 hover:bg-gold-400 shadow-[0_8px_30px_-8px_rgba(242,194,48,0.6)]",
  outline: "border-2 border-cream-50/30 text-cream-50 hover:border-gold-500 hover:text-gold-400",
  ghost: "border-2 border-ink-950/15 text-ink-950 hover:border-gold-600 hover:text-gold-700",
}
const variants = buttonVariants

export function Button({ href, children, variant = "gold", icon, className, onClick }: ButtonProps) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold tracking-wide whitespace-nowrap transition-colors sm:text-base",
        variants[variant],
        className,
      )}
    >
      {icon}
      {children}
    </motion.a>
  )
}
