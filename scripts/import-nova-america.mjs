// Importação única das fotos/plantas do novo lançamento "Residencial Nova América"
// (Umuarama), entregues pelo cliente em C:\Users\adm_ti\desktop\ritchy\conteudo novo\image.
//
// Uso: node scripts/import-nova-america.mjs

import { mkdirSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, "..")
const SRC_DIR = String.raw`C:\Users\adm_ti\desktop\ritchy\conteudo novo\image`
const SLUG = "residencial-nova-america"
const DEST_DIR = path.join(PROJECT_ROOT, "src", "assets", "empreendimentos", SLUG)

// Ordem escolhida: fachadas/renders externos primeiro (a 01 vira capa), plantas dos 4 modelos por último.
const ORDER = [
  "WhatsApp Image 2026-08-17 at 11.59.52.jpeg", // rua, entardecer/chuva
  "WhatsApp Image 2026-08-17 at.jpeg", // rua, dia, plano aberto
  "WhatsApp Image 2026-08-17 at 11.59.56.jpeg", // rua, dia, mais perto
  "WhatsApp Image 2026-08-17 at 11.59.53.jpeg", // portão, dia
  "WhatsApp Image 2026-08-17 at 11.59.54.jpeg", // portão, entardecer, luzes acesas
  "WhatsApp Image 2026-08-17 at 12.00.22.jpeg", // planta modelo 1
  "WhatsApp Image 2026-08-17 at 12.00.46.jpeg", // planta modelo 2
  "WhatsApp Image 2026-08-17 at 12.01.06.jpeg", // planta modelo 3
  "WhatsApp Image 2026-08-17 at 12.01.27.jpeg", // planta modelo 4
]

mkdirSync(DEST_DIR, { recursive: true })

let i = 0
for (const file of ORDER) {
  i += 1
  const srcPath = path.join(SRC_DIR, file)
  const destPath = path.join(DEST_DIR, `${SLUG}-${String(i).padStart(2, "0")}.webp`)
  await sharp(srcPath).rotate().resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 78 }).toFile(destPath)
  console.log(`[ok] ${destPath}`)
}
