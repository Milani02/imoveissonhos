// Processa fotos únicas por loteamento/chácara (em vez da foto genérica
// compartilhada por todos). Itens sem entrada aqui continuam usando o
// genérico de src/assets/generico/ como reserva.
//
// Uso: node scripts/process-terreno-images.mjs

import { mkdirSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const RAW = path.join(__dirname, "gemini-raw")
const PROJECT_ROOT = path.resolve(__dirname, "..")
const DEST = path.join(PROJECT_ROOT, "src/assets/empreendimentos-terrenos")
const DEST_CAPAS = path.join(PROJECT_ROOT, "src/assets/capas")

mkdirSync(DEST, { recursive: true })
mkdirSync(DEST_CAPAS, { recursive: true })

async function toWebp(file, slug) {
  const src = path.join(RAW, file)
  await sharp(src).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(DEST, `${slug}.webp`))
  await sharp(src).resize({ width: 480, withoutEnlargement: true }).webp({ quality: 68 }).toFile(path.join(DEST_CAPAS, `${slug}-capa.webp`))
  console.log(`[ok] ${slug}`)
}

const mapping = [
  ["jardim-bonanza-ii.jpg", "jardim-bonanza-ii"],
  ["parque-residencial-viena-ii.jpg", "parque-residencial-viena-ii"],
  ["parque-residencial-viena-iii.jpg", "parque-residencial-viena-iii"],
  ["parque-residencial-viena.jpg", "parque-residencial-viena"],
  ["parque-metropolitano.jpg", "parque-metropolitano"],
  ["parque-residencial-perola-ii.jpg", "parque-residencial-perola-ii"],
  ["jardim-nova-america.jpg", "jardim-nova-america"],
  ["pq-firenze.jpg", "pq-firenze"],
  ["parque-residencial-roma.jpg", "parque-residencial-roma"],
  ["jardim-tangara.jpg", "jardim-tangara"],
  ["paysage-unique-condominio.jpg", "paysage-unique-condominio"],
  ["chacara-rod-henio-romagnoli.jpg", "chacara-rod-henio-romagnoli"],
  ["chacara-cruzeiro.jpg", "chacara-cruzeiro"],
]

for (const [file, slug] of mapping) await toWebp(file, slug)
