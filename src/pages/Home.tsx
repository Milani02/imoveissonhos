import { Hero } from "../components/sections/Hero"
import { CinematicScroll } from "../components/sections/CinematicScroll"
import { CitiesMarquee } from "../components/sections/CitiesMarquee"
import { Diferenciais } from "../components/sections/Diferenciais"
import { Servicos } from "../components/sections/Servicos"
import { LancamentosPreview } from "../components/sections/LancamentosPreview"
import { Depoimentos } from "../components/sections/Depoimentos"
import { FinalCta } from "../components/sections/FinalCta"

export function Home() {
  return (
    <>
      <Hero />
      <CinematicScroll />
      <CitiesMarquee />
      <Diferenciais />
      <Servicos />
      <LancamentosPreview />
      <Depoimentos />
      <FinalCta />
    </>
  )
}
