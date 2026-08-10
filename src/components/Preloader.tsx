import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export function Preloader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const timer = setTimeout(() => {
      setVisible(false)
      document.body.style.overflow = ""
    }, 2000)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-ink-950"
        >
          <svg viewBox="0 0 80 66" fill="none" className="h-14 w-14">
            <motion.path
              d="M9 60V33.5C9 29.2 11.1 25.2 14.6 22.7L37 6.7C38.8 5.4 41.2 5.4 43 6.7L65.4 22.7C68.9 25.2 71 29.2 71 33.5V45"
              stroke="var(--color-gold-500)"
              strokeWidth="7.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
            />
          </svg>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="font-sans text-sm font-extrabold tracking-[0.3em] text-cream-50 uppercase"
          >
            Imóveis <span className="text-gold-500">dos Sonhos</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
