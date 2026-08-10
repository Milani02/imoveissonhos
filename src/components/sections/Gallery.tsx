import { motion } from "framer-motion"
import heroHouseDusk from "../../assets/properties/hero-house-dusk.jpg"
import houseDaytime from "../../assets/properties/house-daytime.jpg"
import apartmentBuilding from "../../assets/properties/apartment-building.jpg"
import livingRoom from "../../assets/properties/living-room.jpg"
import { Reveal, StaggerGroup, StaggerItem } from "../ui/Reveal"
import { Button } from "../ui/Button"
import { WhatsAppIcon } from "../ui/WhatsAppIcon"
import { gallery, waLink, waMessages } from "../../lib/content"

const images: Record<string, string> = {
  heroHouseDusk,
  houseDaytime,
  apartmentBuilding,
  livingRoom,
}

export function Gallery() {
  return (
    <section id="imoveis" className="bg-ink-950 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="text-xs font-bold tracking-[0.25em] text-gold-500 uppercase">{gallery.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-cream-50 text-balance sm:text-5xl">
              {gallery.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream-100/65 sm:text-lg">{gallery.body}</p>
          </div>
          <Button href={waLink(waMessages.gallery)} icon={<WhatsAppIcon className="h-5 w-5" />} className="shrink-0">
            Quero ver mais opções
          </Button>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2" stagger={0.12}>
          {gallery.items.map((item) => (
            <StaggerItem key={item.title}>
              <motion.div
                whileHover="hover"
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-cream-50/10"
              >
                <motion.img
                  src={images[item.image]}
                  alt={item.caption}
                  loading="lazy"
                  variants={{ hover: { scale: 1.08 } }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-xl font-semibold text-cream-50 sm:text-2xl">{item.title}</h3>
                  <p className="mt-1 text-sm text-cream-100/75">{item.caption}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
