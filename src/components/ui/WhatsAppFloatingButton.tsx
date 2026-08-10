import { motion } from "framer-motion"
import { WhatsAppIcon } from "./WhatsAppIcon"
import { waLink, waMessages } from "../../lib/content"

export function WhatsAppFloatingButton() {
  return (
    <motion.a
      href={waLink(waMessages.floating)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp com a Imóveis dos Sonhos"
      initial={{ opacity: 0, y: 24, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.4, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)] sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/50 [animation-duration:2.2s]" />
      <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
    </motion.a>
  )
}
