import { mkdirSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const RAW = path.join(__dirname, "gemini-raw")
const PROJECT_ROOT = path.resolve(__dirname, "..")

async function toWebp(src, dest, { maxWidth = 1920, quality = 84 } = {}) {
  mkdirSync(path.dirname(dest), { recursive: true })
  await sharp(src).resize({ width: maxWidth, withoutEnlargement: true }).webp({ quality }).toFile(dest)
  console.log(`[ok] ${dest}`)
}

const heroDest = path.join(PROJECT_ROOT, "src/assets/hero-ai")
await toWebp(path.join(RAW, "house-dusk.jpg"), path.join(heroDest, "house-dusk.webp"))
await toWebp(path.join(RAW, "street-golden-hour.jpg"), path.join(heroDest, "street-golden-hour.webp"))
await toWebp(path.join(RAW, "living-room-warm.jpg"), path.join(heroDest, "living-room-warm.webp"))
await toWebp(path.join(RAW, "family-silhouette.jpg"), path.join(heroDest, "family-silhouette.webp"))

const genericDest = path.join(PROJECT_ROOT, "src/assets/generico")
await toWebp(path.join(RAW, "terreno-01.jpg"), path.join(genericDest, "terreno-01.webp"))
await toWebp(path.join(RAW, "chacara-01.jpg"), path.join(genericDest, "chacara-01.webp"))

const stageDest = path.join(PROJECT_ROOT, "src/assets/atmosphere-ai")
await toWebp(path.join(RAW, "stage-01-land.jpg"), path.join(stageDest, "stage-01-land.webp"))
await toWebp(path.join(RAW, "stage-02-construction.jpg"), path.join(stageDest, "stage-02-construction.webp"))
await toWebp(path.join(RAW, "stage-03-streets.jpg"), path.join(stageDest, "stage-03-streets.webp"))
await toWebp(path.join(RAW, "stage-04-finished.jpg"), path.join(stageDest, "stage-04-finished.webp"))
