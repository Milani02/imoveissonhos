import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { Preloader } from "./components/Preloader"
import { WhatsAppFloatingButton } from "./components/ui/WhatsAppFloatingButton"
import { Hero } from "./components/sections/Hero"
import { CinematicScroll } from "./components/sections/CinematicScroll"
import { CitiesMarquee } from "./components/sections/CitiesMarquee"
import { Diferenciais } from "./components/sections/Diferenciais"
import { Empreendimentos } from "./components/sections/Empreendimentos"
import { Comparison } from "./components/sections/Comparison"
import { Journey } from "./components/sections/Journey"
import { FiveReasons } from "./components/sections/FiveReasons"
import { TerrenosSection } from "./components/sections/TerrenosSection"
import { StatsCities } from "./components/sections/StatsCities"
import { FinalCta } from "./components/sections/FinalCta"

function App() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <CinematicScroll />
        <CitiesMarquee />
        <Diferenciais />
        <Empreendimentos />
        <Comparison />
        <Journey />
        <FiveReasons />
        <TerrenosSection />
        <StatsCities />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  )
}

export default App
