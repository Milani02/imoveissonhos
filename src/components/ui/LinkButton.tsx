import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { cn } from "../../lib/utils"
import { buttonVariants } from "./Button"

interface LinkButtonProps {
  to: string
  children: ReactNode
  variant?: keyof typeof buttonVariants
  icon?: ReactNode
  className?: string
}

/** Igual ao Button, mas navega client-side via react-router (uso interno/rotas). */
export function LinkButton({ to, children, variant = "gold", icon, className }: LinkButtonProps) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold tracking-wide whitespace-nowrap transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] sm:text-base",
        buttonVariants[variant],
        className,
      )}
    >
      {icon}
      {children}
    </Link>
  )
}
