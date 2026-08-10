import { cn } from "../../lib/utils"

interface LogoProps {
  className?: string
  iconClassName?: string
  variant?: "dark" | "light"
  showTagline?: boolean
}

/**
 * Vector recreation of the brand mark (open house roofline + wordmark).
 * Rebuilt as live SVG/text rather than the raster asset so it stays pixel-crisp
 * at every size used across the page (header, hero, preloader, favicon-scale badges).
 */
export function Logo({ className, iconClassName, variant = "dark", showTagline = true }: LogoProps) {
  const textColor = variant === "light" ? "text-cream-50" : "text-ink-950"
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 80 66" fill="none" className={cn("h-8 w-8 shrink-0 sm:h-9 sm:w-9", iconClassName)} aria-hidden="true">
        <path
          d="M9 60V33.5C9 29.2 11.1 25.2 14.6 22.7L37 6.7C38.8 5.4 41.2 5.4 43 6.7L65.4 22.7C68.9 25.2 71 29.2 71 33.5V45"
          stroke="var(--color-gold-500)"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span className={cn("font-sans text-[1.05rem] font-extrabold tracking-tight sm:text-xl", textColor)}>
          IMÓV<span className="text-gold-500">EIS</span>
        </span>
        {showTagline && (
          <span className={cn("mt-0.5 font-sans text-[0.55rem] font-bold uppercase tracking-[0.25em] sm:text-[0.6rem]", textColor, "opacity-70")}>
            dos Sonhos
          </span>
        )}
      </div>
    </div>
  )
}
