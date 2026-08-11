import { useEffect, useState } from "react"

export function Preloader() {
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in")

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const startExit = setTimeout(() => setPhase("out"), 1600)
    const unmount = setTimeout(() => {
      setPhase("gone")
      document.body.style.overflow = ""
    }, 2300)
    return () => {
      clearTimeout(startExit)
      clearTimeout(unmount)
      document.body.style.overflow = ""
    }
  }, [])

  if (phase === "gone") return null

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-ink-950 transition-opacity duration-700 ease-in-out"
      style={{ opacity: phase === "out" ? 0 : 1, pointerEvents: phase === "out" ? "none" : "auto" }}
    >
      <svg viewBox="0 0 80 66" fill="none" className="h-14 w-14">
        <path
          d="M9 60V33.5C9 29.2 11.1 25.2 14.6 22.7L37 6.7C38.8 5.4 41.2 5.4 43 6.7L65.4 22.7C68.9 25.2 71 29.2 71 33.5V45"
          stroke="var(--color-gold-500)"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          className="animate-[draw_1.1s_cubic-bezier(0.65,0,0.35,1)_forwards]"
        />
      </svg>
      <div className="font-sans text-sm font-extrabold tracking-[0.3em] text-cream-50 uppercase opacity-0 [animation:fadein_0.5s_ease-out_0.9s_forwards]">
        Imóveis <span className="text-gold-500">dos Sonhos</span>
      </div>
    </div>
  )
}
