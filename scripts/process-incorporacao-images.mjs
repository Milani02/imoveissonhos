// Processa as fotos genéricas (uma por área/lote) da seção "Áreas e glebas para
// novos empreendimentos" — cada item tem sua própria foto ilustrativa, em vez
// de todas compartilharem uma única imagem genérica.
//
// Uso: node scripts/process-incorporacao-images.mjs

import { mkdirSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const RAW = path.join(__dirname, "gemini-raw")
const PROJECT_ROOT = path.resolve(__dirname, "..")
const DEST = path.join(PROJECT_ROOT, "src/assets/generico/incorporacao")

mkdirSync(DEST, { recursive: true })

async function toWebp(file, slug) {
  await sharp(path.join(RAW, file))
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(DEST, `${slug}.webp`))
  console.log(`[ok] ${slug}.webp`)
}

const mapping = [
  ["jardim-araxa.jpg", "jardim-araxa"],
  ["interlagos-ii.jpg", "parque-residencial-interlagos-ii"],
  ["av-portugal-comercial.jpg", "av-portugal-comercial"],
  ["chacara-dom-bosco.jpg", "chacara-dom-bosco-gleba-figueira"],
  ["chacara-okamoto.jpg", "chacara-okamoto-villa-ii"],
  ["pq-gavea-andamento.jpg", "pq-residencial-da-gavea-comercial"],
  ["av-castelo-branco.jpg", "av-pres-castelo-branco"],
  ["av-colombo.jpg", "av-colombo-zona-i"],
  ["pq-firenze-comercial.jpg", "pq-firenze-comercial"],
  ["jardim-nova-america-comercial.jpg", "jardim-nova-america-comercial"],
  ["parque-roma-comercial.jpg", "parque-residencial-roma-comercial"],
]

for (const [file, slug] of mapping) await toWebp(file, slug)
