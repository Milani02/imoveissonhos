# Imóveis dos Sonhos — contexto do projeto

Site institucional/catálogo para uma imobiliária 100% digital (cliente: Ritchy Jean Baptiste), atuando em Londrina, Umuarama e Cafezal do Sul (PR). Construído numa única sessão longa de Claude Code a partir de uma landing page única — este arquivo existe pra que uma sessão nova (inclusive em outra máquina) tenha o contexto que a sessão anterior acumulou.

## Instrução permanente do usuário

**Responda sempre em português nesta conversa/projeto.** Instrução explícita e repetida do cliente/usuário — vale para qualquer sessão futura neste repositório, não só a original.

## Stack

React 19 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + GSAP (ScrollTrigger) + React Router. Lint com `oxlint` (não ESLint). Otimização de imagem via `sharp` em scripts Node standalone (não há pipeline de build automática pra isso).

Comandos:
- `npm run dev` — servidor local
- `npm run build` — `tsc -b && vite build` (rodar sempre depois de mudanças, TypeScript pega bastante coisa)
- `npm run lint` — oxlint (deve ficar limpo, exceto 2 warnings pré-existentes e aceitos: `only-export-components` em `Button.tsx` e `FilterBar.tsx`)

## Arquitetura

- **Rotas** (`src/App.tsx`): `/` (Home), `/imoveis` (Catálogo com filtros), `/lancamentos/:slug`, `/terrenos/:slug`, `/chacaras/:slug`, `/sobre`. Home é eager; as outras 5 páginas são `React.lazy`.
- **Header nav** (`src/lib/content.ts` → `nav`): só **Home / Imóveis / Sobre** — "Lançamentos" e "Terrenos" foram removidos a pedido do cliente (ainda acessíveis via `/imoveis?categoria=lancamento` etc.).
- **Modelo de dados unificado** (`src/lib/imoveis.ts`): union discriminada `Imovel = Lancamento | LoteamentoImovel | ChacaraImovel`. `loteamentosImoveis` (terrenos) guarda lotes individuais (`quadra`, `lote`, `dimensoes`, `area`, `valor`, `matricula`, `mapaLink`) extraídos de uma tabela de preços de uma imobiliária parceira — **por pedido do cliente, nenhuma marca/identificação da parceira é exibida**, só os dados do lote.
- **Preços removidos do site inteiro** — decisão explícita do cliente. Não reintroduzir `precoDesde`/`precoLabel`/valores em R$ em nenhuma tela (catálogo, lançamento, terreno, chácara, áreas de incorporação). Os campos `valor` dentro de `LoteIndividual` continuam nos dados (uso interno/futuro), mas não são renderizados em lugar nenhum.
- **Seção "Áreas e glebas para novos empreendimentos"** (`src/components/sections/AreasIncorporacao.tsx`, dados em `src/lib/incorporacao.ts`): 11 itens vindos das seções "Disponível para empreendimentos" + "Empreendimentos em andamento" + "Comercial" da mesma planilha de preços. Público diferente do catálogo residencial (incorporadoras/construtoras, não famílias) — por isso fica numa seção própria no fim de `/imoveis`, com cards escuros e CTA de WhatsApp com mensagem contextualizada.

## Pipeline de imagens (importante entender antes de mexer)

Fotos reais do cliente (lançamentos) e imagens geradas por IA (terrenos/chácaras genéricos e específicos) passam por scripts em `scripts/*.mjs` que usam `sharp` pra redimensionar/converter pra `.webp`. **Nunca importar `.jpg`/`.png` cru direto num componente** — sempre gerar o `.webp` otimizado primeiro.

- `scripts/import-assets.mjs` — copia as fotos reais dos empreendimentos (entregues pelo cliente em `C:\Users\adm_ti\desktop\site` e `C:\Users\adm_ti\Desktop\ritchy`) pra `src/assets/empreendimentos/<slug>/`, com hash-dedupe.
- `scripts/generate-card-thumbs.mjs` — gera miniaturas leves (480px) em `src/assets/capas/<slug>-capa.webp` pros cards do catálogo (a galeria cheia de 1920px deixava o catálogo lento). Tem um `CAPA_INDEX_OVERRIDE` no topo do arquivo pra empreendimentos onde a 1ª foto da galeria não é a melhor capa (Le Ciel, La Roche, Floriatto, Lancelot já têm override).
- `scripts/process-gemini-images.mjs` — processa imagens geradas no Gemini (hero, atmosphere-ai, genéricos de terreno/chácara) de `scripts/gemini-raw/*.jpg` pra `.webp` otimizado.
- `scripts/process-incorporacao-images.mjs` — mesma ideia pras 11 fotos únicas da seção de incorporadoras (`src/assets/generico/incorporacao/<slug>.webp`).
- `scripts/process-terreno-images.mjs` — fotos únicas por loteamento (em vez do genérico compartilhado), gera full (1200px, `src/assets/empreendimentos-terrenos/<slug>.webp`) + capa (480px, `src/assets/capas/<slug>-capa.webp`) de uma vez. **Trabalho incompleto**, ver seção abaixo.

`src/lib/imoveis.ts` usa `import.meta.glob` pra resolver essas imagens por slug automaticamente (`capaFor`, `terrenoImagemFor`, `terrenoCapaFor`, etc.) — sempre com fallback pro genérico (`terreno-01.webp` / `chacara-01.webp`) quando não existe uma foto específica pro slug. Isso significa que **dá pra ir gerando fotos específicas aos poucos, sem quebrar nada** — só rodar o script de processamento de novo depois de adicionar o `.jpg` cru em `scripts/gemini-raw/` e mapear no array `mapping` do script.

### Status da cobertura de fotos (terrenos/chácaras) — pendência conhecida

Dos 11 loteamentos, **5 já têm foto própria**: `jardim-bonanza-ii`, `parque-residencial-viena`, `parque-residencial-viena-ii`, `parque-residencial-viena-iii`, `parque-metropolitano`. Os outros 6 (`parque-residencial-perola-ii`, `jardim-nova-america`, `pq-firenze`, `parque-residencial-roma`, `jardim-tangara`, `paysage-unique-condominio`) ainda usam a foto genérica compartilhada.

Das 2 chácaras (`chacara-rod-henio-romagnoli`, `chacara-cruzeiro`), **nenhuma tem foto própria ainda** — ambas na genérica.

Pra completar: gerar as imagens (ver seção "Gerar imagens novas" abaixo), salvar em `scripts/gemini-raw/<slug>.jpg`, adicionar a entrada no `mapping` de `scripts/process-terreno-images.mjs`, rodar o script, `npm run build`.

## Gerar imagens novas (fluxo manual via Gemini)

Não há chave de API configurada neste ambiente (nem Pollinations nem RunComfy/nano-banana) — a skill `pollinations-image-gen` falha por falta de `POLLINATIONS_API_KEY`. O fluxo que funciona é **manual via gemini.google.com no browser** (Claude in Chrome), conta Google logada é a do cliente/projeto.

Passos: digitar o prompt na caixa "Peça ao Gemini" → clicar na seta azul de enviar (não no "+") → esperar (pode levar de 20s a 3min, às vezes trava em "Creating your image" e precisa recarregar a página pra revelar o resultado que já tinha terminado no servidor) → passar o mouse sobre a imagem pra revelar os ícones (ou usar "..." → "Baixar imagem") → conferir o hash (`md5sum`) do arquivo baixado antes de usar.

**Cuidado com abas paralelas**: gerar em múltiplas abas do Gemini ao mesmo tempo causou repetidamente o download de uma aba trazer a imagem de OUTRA aba (bug de cache do lado do Gemini/extensão, não do nosso código) — resultou em várias imagens duplicadas erradas que precisaram ser identificadas por checksum e descartadas. **Prefira gerar uma imagem por vez, numa aba só, verificando o hash antes de seguir pra próxima**, mesmo sendo mais lento.

Estilo dos prompts usados (adaptar por local/característica de cada terreno): foto aérea de drone ultra-realista, 4:3, terreno vago/gleba brasileira, com detalhes específicos (rural com pomar, esquina urbana com asfalto, obra em andamento, etc.), luz e época do dia variadas pra não ficarem repetitivas, sempre terminando com "no people, no text, no watermark".

## O que NÃO fazer

- Não reintroduzir preços/valores em R$ em telas visíveis.
- Não expor a marca da imobiliária parceira que forneceu a tabela de terrenos/chácaras.
- Não usar imagem cheia (1920px+) como thumbnail de card — sempre gerar a versão de 480px em `src/assets/capas/`.
- `scripts/gemini-raw/` já está no `.gitignore` (são só fontes brutos de reprocessamento) — não forçar `git add` nela.
