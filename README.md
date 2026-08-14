# Imóveis dos Sonhos — Plataforma de Busca de Imóveis

Site multi-página para a imobiliária **Imóveis dos Sonhos** (Londrina, Umuarama e Cafezal do Sul — PR), com catálogo pesquisável de lançamentos, terrenos e chácaras, mantendo o storytelling, parallax e microinterações da landing original.

## Stack

- React + TypeScript + Vite
- React Router (rotas client-side)
- Tailwind CSS v4
- Framer Motion (microinterações, reveals, contadores, galeria)
- GSAP + ScrollTrigger (seção "Jornada" com scroll horizontal fixado no desktop)
- lucide-react (ícones)

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173` (ou próxima porta livre).

## Estrutura

- `src/pages/` — uma página por rota: `Home`, `Catalogo` (`/imoveis`), `LancamentoPage` (`/lancamentos/:slug`), `TerrenoPage` (`/terrenos/:slug`), `ChacaraPage` (`/chacaras/:slug`), `Sobre` (`/sobre`)
- `src/lib/imoveis.ts` — modelo de dados unificado do catálogo (lançamentos, loteamentos com lotes individuais, chácaras) + helpers de WhatsApp contextual por imóvel
- `src/lib/content.ts` — copywriting de marca e das seções da home/sobre (edite aqui para trocar textos, número de WhatsApp, cidades, etc.)
- `src/components/sections/` — uma seção por arquivo (Hero, Diferenciais, Comparison, Journey, FiveReasons, Depoimentos, LancamentosPreview, FinalCta)
- `src/components/catalogo/` — grade e filtros do catálogo (`FilterBar`, `ImovelCard`)
- `src/components/imovel/` — blocos reutilizados nas páginas de imóvel (`Gallery`, `FichaTecnica`, `MapaLink`)
- `src/components/ui/` — componentes reutilizáveis (Button, LinkButton, Logo, Reveal, CountUp, WhatsApp/Instagram icons)
- `src/assets/empreendimentos/<slug>/` — galerias por empreendimento/loteamento, geradas automaticamente via `import.meta.glob`
- `src/assets/logo/` — logo processada (fundo removido)
- `scripts/import-assets.mjs` — script de importação/otimização (redimensiona + converte para WebP) das fotos brutas entregues pelo cliente; reexecute se novo material chegar
