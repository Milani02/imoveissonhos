// Gera miniaturas leves (usadas nos cards do catálogo) a partir da capa já
// otimizada de cada empreendimento — os cards exibem a foto bem menor que o
// original de 1920px, então usar o arquivo cheio deixava o catálogo lento.
//
// Uso: node scripts/generate-card-thumbs.mjs

import { existsSync, mkdirSync, readdirSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, "..")
const EMPREENDIMENTOS_DIR = path.join(PROJECT_ROOT, "src", "assets", "empreendimentos")
const GENERICO_DIR = path.join(PROJECT_ROOT, "src", "assets", "generico")
const DEST_DIR = path.join(PROJECT_ROOT, "src", "assets", "capas")

// Por padrão a capa usa a primeira foto (ordem alfabética) de cada galeria.
// Alguns empreendimentos pediram uma foto específica do carrossel como capa —
// índice 1-based, na mesma ordem exibida no carrossel do site.
const CAPA_INDEX_OVERRIDE = {
  "residencial-le-ciel": 10, // penúltima foto (de 11)
  "residencial-la-roche": 3, // terceira foto
  "floriatto-morada-dos-ventos": 4, // penúltima foto (de 5)
  "residencial-lancelot": 4, // quarta foto
}

async function makeThumb(srcPath, destPath) {
  await sharp(srcPath).resize({ width: 480, withoutEnlargement: true }).webp({ quality: 68 }).toFile(destPath)
  console.log(`[ok] ${path.relative(PROJECT_ROOT, destPath)}`)
}

mkdirSync(DEST_DIR, { recursive: true })

for (const slug of readdirSync(EMPREENDIMENTOS_DIR)) {
  const dir = path.join(EMPREENDIMENTOS_DIR, slug)
  const files = readdirSync(dir).sort()
  if (!files.length) continue
  const index = CAPA_INDEX_OVERRIDE[slug] ? CAPA_INDEX_OVERRIDE[slug] - 1 : 0
  const chosen = files[index] ?? files[0]
  await makeThumb(path.join(dir, chosen), path.join(DEST_DIR, `${slug}-capa.webp`))
}

for (const [name, file] of [
  ["terreno", "terreno-01.webp"],
  ["chacara", "chacara-01.webp"],
]) {
  const srcPath = path.join(GENERICO_DIR, file)
  if (existsSync(srcPath)) await makeThumb(srcPath, path.join(DEST_DIR, `${name}-capa.webp`))
}
