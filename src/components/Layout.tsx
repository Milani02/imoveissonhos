import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { Preloader } from "./Preloader"
import { WhatsAppFloatingButton } from "./ui/WhatsAppFloatingButton"
import { ScrollToTop } from "./ScrollToTop"

export function Layout() {
  return (
    <>
      <Preloader />
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  )
}
