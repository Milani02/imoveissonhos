// Processa as fotos dos cards da seção "Por que Imóveis dos Sonhos" (Diferenciais)
// — cada card tem sua própria foto ilustrativa, geradas via Nano Banana a partir
// dos prompts documentados na conversa com o cliente.
//
// Uso: node scripts/process-diferenciais-images.mjs

import { mkdirSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const RAW = path.join(__dirname, "gemini-raw")
const PROJECT_ROOT = path.resolve(__dirname, "..")
const DEST = path.join(PROJECT_ROOT, "src/assets/diferenciais")

mkdirSync(DEST, { recursive: true })

async function toWebp(file, slug) {
  await sharp(path.join(RAW, file))
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(DEST, `${slug}.webp`))
  console.log(`[ok] ${slug}.webp`)
}

const mapping = [
  ["atendimento-online.jpg", "atendimento-online"],
  ["foco-lancamentos.jpg", "foco-lancamentos"],
  ["entrada-parcelada.jpg", "entrada-parcelada"],
  ["acompanhamento-completo.jpg", "acompanhamento-completo"],
]

for (const [file, slug] of mapping) await toWebp(file, slug)
