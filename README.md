# Imóveis dos Sonhos — Landing Page (Pitch Demo)

Protótipo de alta fidelidade para apresentação à imobiliária **Imóveis dos Sonhos** (Londrina, Umuarama, Cafezal do Sul — PR, e Joinville — SC).

Landing page de conversão com scroll storytelling, parallax e microinterações, construída com base no conteúdo real das artes de Instagram da marca.

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion (microinterações, reveals, contadores)
- GSAP + ScrollTrigger (seção "Jornada" com scroll horizontal fixado no desktop)
- lucide-react (ícones)

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173` (ou próxima porta livre).

## Estrutura

- `src/lib/content.ts` — todo o copywriting e dados das seções (edite aqui para trocar textos, número de WhatsApp, cidades, etc.)
- `src/components/sections/` — uma seção por arquivo (Hero, Diferenciais, Comparison, Journey, FiveReasons, Gallery, StatsCities, FinalCta)
- `src/components/ui/` — componentes reutilizáveis (Button, Logo, Reveal, CountUp, WhatsApp/Instagram icons)
- `src/assets/properties/` — fotos de imóveis (mix de fotos reais extraídas das artes do cliente + banco de imagens livre)
- `src/assets/logo/` — logo processada (fundo removido)
