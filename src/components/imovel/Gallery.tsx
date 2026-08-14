import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react"

interface GalleryProps {
  images: string[]
  video?: string
  alt: string
}

export function Gallery({ images, video, alt }: GalleryProps) {
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const hasVideo = Boolean(video)
  const showingVideo = hasVideo && active === 0

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false)
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % images.length)
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + images.length) % images.length)
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [lightboxOpen, images.length])

  if (images.length === 0 && !video) return null

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl border border-ink-950/10 bg-ink-950/5">
        <div className="aspect-[16/10] w-full sm:aspect-[16/9]">
          {showingVideo ? (
            <video
              src={video}
              controls
              playsInline
              className="h-full w-full object-cover"
              aria-label={alt}
            />
          ) : (
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={images[active]}
                alt={alt}
                initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>
          )}
        </div>

        {!showingVideo && images.length > 0 && (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Ver em tela cheia"
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink-950/60 text-cream-50 backdrop-blur-sm transition-colors hover:bg-ink-950/80"
          >
            <Expand className="h-4 w-4" />
          </button>
        )}
      </div>

      {(images.length > 1 || hasVideo) && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {hasVideo && (
            <button
              type="button"
              onClick={() => setActive(0)}
              className={`flex h-16 w-24 shrink-0 items-center justify-center rounded-xl border-2 bg-ink-950 text-xs font-bold text-cream-50 uppercase transition-colors sm:h-20 sm:w-28 ${
                active === 0 ? "border-gold-500" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              Vídeo
            </button>
          )}
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-colors sm:h-20 sm:w-28 ${
                active === i && !showingVideo ? "border-gold-500" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {lightboxOpen && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink-950/95 p-4 sm:p-10"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              aria-label="Fechar"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full text-cream-50 hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Anterior"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActive((i) => (i - 1 + images.length) % images.length)
                  }}
                  className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full text-cream-50 hover:bg-white/10 sm:left-6"
                >
                  <ChevronLeft className="h-7 w-7" />
                </button>
                <button
                  type="button"
                  aria-label="Próxima"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActive((i) => (i + 1) % images.length)
                  }}
                  className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full text-cream-50 hover:bg-white/10 sm:right-6"
                >
                  <ChevronRight className="h-7 w-7" />
                </button>
              </>
            )}

            <motion.img
              key={active}
              src={images[active]}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="max-h-full max-w-full rounded-lg object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
