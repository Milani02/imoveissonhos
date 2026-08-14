import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface KenBurnsSlideshowProps {
  images: string[]
  interval?: number
  className?: string
}

/**
 * Auto-cycling crossfade + slow zoom background, used where a real video
 * isn't available. Each slide keeps zooming slightly past the crossfade so
 * the motion never visibly resets — reads as ambient, not a slideshow.
 */
export function KenBurnsSlideshow({ images, interval = 6500, className = "" }: KenBurnsSlideshowProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), interval)
    return () => clearInterval(id)
  }, [images.length, interval])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <AnimatePresence>
        <motion.img
          key={index}
          src={images[index]}
          alt=""
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.12 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.6, ease: "easeInOut" },
            scale: { duration: interval / 1000 + 1.6, ease: "linear" },
          }}
          className="absolute inset-0 h-full w-full object-cover object-bottom"
        />
      </AnimatePresence>
    </div>
  )
}
