// Script de importação única: copia e renomeia as fotos entregues pelo cliente
// (em C:\Users\adm_ti\desktop\site e C:\Users\adm_ti\Desktop\ritchy) para
// src/assets/empreendimentos/<slug>/ e src/assets/depoimentos/, com nomes
// sanitizados e sem duplicatas (dedupe por hash de conteúdo).
//
// Uso: node scripts/import-assets.mjs

import { createHash } from "node:crypto"
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, "..")
const SITE_ROOT = String.raw`C:\Users\adm_ti\desktop\site`
const RITCHY_ROOT = String.raw`C:\Users\adm_ti\Desktop\ritchy`

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"])
const PRIORITY_KEYWORDS = ["fachada", "aerea", "aérea", "voo", "implanta", "portico", "pórtico"]

const empreendimentos = [
  { slug: "floriatto-morada-dos-ventos", src: path.join(SITE_ROOT, "Londrina", "Floriatto – Morada dos Ventos", "image") },
  { slug: "granvi", src: path.join(SITE_ROOT, "Londrina", "Granví", "image") },
  { slug: "residencial-la-roche", src: path.join(SITE_ROOT, "Londrina", "Residencial La roche", "image") },
  { slug: "residencial-lake-dali", src: path.join(SITE_ROOT, "Londrina", "Residencial Lake Dalí", "image") },
  { slug: "residencial-lancelot", src: path.join(SITE_ROOT, "Londrina", "Residencial Lancelot", "image") },
  { slug: "residencial-le-ciel", src: path.join(SITE_ROOT, "Londrina", "Residencial Le Ciel", "image") },
  { slug: "viva-alameda", src: path.join(SITE_ROOT, "Londrina", "Viva Alameda", "image") },
  { slug: "reserva-hause", src: path.join(SITE_ROOT, "Umuarama", "RESERVA HAUSE", "image") },
  { slug: "brisa-do-vale", src: path.join(SITE_ROOT, "Umuarama", "Residencial Brisa do Vale", "image") },
  { slug: "cafezal-do-sul", src: path.join(SITE_ROOT, "Cafezal do Sul", "Casas em Cafezal do Sul", "image") },
]

function hashFile(filePath) {
  return createHash("md5").update(readFileSync(filePath)).digest("hex")
}

function sortKey(filename) {
  const lower = filename.toLowerCase()
  const isPriority = PRIORITY_KEYWORDS.some((kw) => lower.includes(kw))
  return [isPriority ? 0 : 1, lower]
}

async function optimizeToWebp(srcPath, destPath, { maxWidth = 1920, quality = 78 } = {}) {
  await sharp(srcPath)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality })
    .toFile(destPath)
}

async function importGallery({ slug, src }) {
  if (!existsSync(src)) {
    console.warn(`[skip] pasta não encontrada: ${src}`)
    return
  }
  const dest = path.join(PROJECT_ROOT, "src", "assets", "empreendimentos", slug)
  rmSync(dest, { recursive: true, force: true })
  mkdirSync(dest, { recursive: true })

  const files = readdirSync(src)
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()) && statSync(path.join(src, f)).isFile())
    .sort((a, b) => {
      const [pa, la] = sortKey(a)
      const [pb, lb] = sortKey(b)
      if (pa !== pb) return pa - pb
      return la.localeCompare(lb)
    })

  const seenHashes = new Set()
  let i = 0
  for (const file of files) {
    const srcPath = path.join(src, file)
    const hash = hashFile(srcPath)
    if (seenHashes.has(hash)) continue
    seenHashes.add(hash)
    i += 1
    const destPath = path.join(dest, `${slug}-${String(i).padStart(2, "0")}.webp`)
    await optimizeToWebp(srcPath, destPath)
  }
  console.log(`[ok] ${slug}: ${i} imagem(ns)`)
}

async function importDepoimentos() {
  const src = path.join(SITE_ROOT, "Depoimento")
  if (!existsSync(src)) {
    console.warn(`[skip] pasta não encontrada: ${src}`)
    return
  }
  const dest = path.join(PROJECT_ROOT, "src", "assets", "depoimentos")
  rmSync(dest, { recursive: true, force: true })
  mkdirSync(dest, { recursive: true })

  const files = readdirSync(src).sort()
  let imgCount = 0
  for (const file of files) {
    const ext = path.extname(file).toLowerCase()
    const srcPath = path.join(src, file)
    if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
      imgCount += 1
      const destPath = path.join(dest, `depoimento-${String(imgCount).padStart(2, "0")}.webp`)
      await optimizeToWebp(srcPath, destPath, { maxWidth: 1000, quality: 88 })
    } else if (ext === ".mp4") {
      copyFileSync(srcPath, path.join(dest, "depoimento-video.mp4"))
    }
  }
  console.log(`[ok] depoimentos: ${imgCount} imagem(ns) + vídeo`)
}

function importHeroVideo() {
  const src = path.join(RITCHY_ROOT, "conteudo sobre a empresa", "video hero", "video hero cafezal novo.mp4")
  if (!existsSync(src)) {
    console.warn(`[skip] vídeo não encontrado: ${src}`)
    return
  }
  const dest = path.join(PROJECT_ROOT, "src", "assets", "videos")
  mkdirSync(dest, { recursive: true })
  copyFileSync(src, path.join(dest, "cafezal-do-sul-hero.mp4"))
  console.log("[ok] vídeo hero Cafezal do Sul")
}

for (const emp of empreendimentos) await importGallery(emp)
await importDepoimentos()
importHeroVideo()
