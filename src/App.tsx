import { Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Home } from "./pages/Home"

const Catalogo = lazy(() => import("./pages/Catalogo").then((m) => ({ default: m.Catalogo })))
const LancamentoPage = lazy(() => import("./pages/LancamentoPage").then((m) => ({ default: m.LancamentoPage })))
const TerrenoPage = lazy(() => import("./pages/TerrenoPage").then((m) => ({ default: m.TerrenoPage })))
const ChacaraPage = lazy(() => import("./pages/ChacaraPage").then((m) => ({ default: m.ChacaraPage })))
const Sobre = lazy(() => import("./pages/Sobre").then((m) => ({ default: m.Sobre })))

function RouteFallback() {
  return <div className="min-h-[60svh] bg-cream-50" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="imoveis"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Catalogo />
              </Suspense>
            }
          />
          <Route
            path="lancamentos/:slug"
            element={
              <Suspense fallback={<RouteFallback />}>
                <LancamentoPage />
              </Suspense>
            }
          />
          <Route
            path="terrenos/:slug"
            element={
              <Suspense fallback={<RouteFallback />}>
                <TerrenoPage />
              </Suspense>
            }
          />
          <Route
            path="chacaras/:slug"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ChacaraPage />
              </Suspense>
            }
          />
          <Route
            path="sobre"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Sobre />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
