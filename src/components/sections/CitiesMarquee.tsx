import { MapPin } from "lucide-react"
import { cities } from "../../lib/content"

export function CitiesMarquee() {
  const track = [...cities, ...cities]
  return (
    <div
      className="relative overflow-hidden border-y border-ink-950/10 bg-ink-950 py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      <div className="flex w-max animate-marquee items-center gap-10 [animation-play-state:running] hover:[animation-play-state:paused]">
        {track.map((city, i) => (
          <span key={i} className="flex items-center gap-2 text-sm font-bold tracking-wide text-cream-50/70 uppercase">
            <MapPin className="h-4 w-4 text-gold-500" />
            {city}
          </span>
        ))}
      </div>
    </div>
  )
}
