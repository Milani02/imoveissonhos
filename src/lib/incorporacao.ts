// Áreas voltadas a incorporadoras/construtoras — glebas maiores para novos
// empreendimentos, extraídas da Tabela de Preços - Terrenos e Chácaras (seções
// "Disponível para empreendimentos" e "Empreendimentos em andamento"). Público
// diferente do catálogo residencial: aqui o comprador é quem vai desenvolver
// o imóvel, não a família final — por isso ficam numa seção própria.
import { whatsappNumbers, waLink } from "./content"

const imagemModules = import.meta.glob<{ default: string }>("../assets/generico/incorporacao/*.webp", { eager: true })

export function imagemIncorporacao(slug: string): string {
  const entry = Object.entries(imagemModules).find(([filePath]) => filePath.endsWith(`/${slug}.webp`))
  if (!entry) throw new Error(`Imagem genérica não encontrada para "${slug}"`)
  return entry[1].default
}

export interface AreaIncorporacao {
  slug: string
  nome: string
  regiao: string
  area: string
  matricula: string
  mapaLink: string
  observacao?: string
  status: "disponivel" | "andamento" | "comercial"
}

export const areasIncorporacao: AreaIncorporacao[] = [
  {
    slug: "jardim-araxa",
    nome: "Jardim Araxá",
    regiao: "Região de Umuarama · PR",
    area: "2.706,78 m² (4 lotes contíguos)",
    matricula: "M 42.570 a M 42.573",
    mapaLink: "https://maps.app.goo.gl/khus14nYxuKF6aMA7",
    status: "disponivel",
  },
  {
    slug: "parque-residencial-interlagos-ii",
    nome: "Parque Residencial Interlagos II",
    regiao: "Região de Umuarama · PR",
    area: "2.879,83 m² (2 lotes)",
    matricula: "M 47.347 (2º CRI) e M 35.205 (2º CRI)",
    mapaLink: "https://maps.app.goo.gl/3ut4ygrcQwoe4M9aA",
    status: "disponivel",
  },
  {
    slug: "av-portugal-comercial",
    nome: "Av. Portugal — Terreno Comercial",
    regiao: "Região de Umuarama · PR",
    area: "1.246,62 m²",
    matricula: "M 28.571 (1º CRI)",
    mapaLink: "https://maps.app.goo.gl/s58jpm39z5TCNuJM8",
    status: "disponivel",
  },
  {
    slug: "chacara-dom-bosco-gleba-figueira",
    nome: "Chácara Dom Bosco — Gleba Figueira",
    regiao: "Região de Umuarama · PR",
    area: "4.672,84 m²",
    matricula: "M 35.952 (2º CRI)",
    observacao: "50% da fração ideal do imóvel",
    mapaLink: "https://maps.app.goo.gl/XzQkdFZBgVuiqxXf8",
    status: "disponivel",
  },
  {
    slug: "chacara-okamoto-villa-ii",
    nome: "Chácara Okamoto (Villa II)",
    regiao: "Região de Umuarama · PR",
    area: "16.701,16 m²",
    matricula: "M 73.302 (1º CRI)",
    mapaLink: "https://maps.app.goo.gl/kK5whK6dt18CihjE8",
    status: "disponivel",
  },
  {
    slug: "pq-residencial-da-gavea-comercial",
    nome: "Pq. Residencial da Gávea — Comercial",
    regiao: "Região de Umuarama · PR",
    area: "573,10 m²",
    matricula: "M 45.389",
    mapaLink: "https://maps.app.goo.gl/wcqK5SKbp26pJPeR7",
    status: "andamento",
  },
  {
    slug: "av-pres-castelo-branco",
    nome: "Av. Presidente Castelo Branco — Comercial",
    regiao: "Região de Umuarama · PR",
    area: "1.416 m²",
    matricula: "M 59.686 (inteira)",
    mapaLink: "https://maps.app.goo.gl/iuGCnWtS98rMJaNh6",
    status: "comercial",
  },
  {
    slug: "av-colombo-zona-i",
    nome: "Av. Colombo — Zona I (Comercial)",
    regiao: "Região de Umuarama · PR",
    area: "287,7 m²",
    matricula: "M 51.783 (inteira)",
    mapaLink: "https://maps.app.goo.gl/irrWK9Ti3u96oGyx6",
    status: "comercial",
  },
  {
    slug: "pq-firenze-comercial",
    nome: "PQ Firenze — Comercial",
    regiao: "Região de Umuarama · PR",
    area: "463,18 m²",
    matricula: "M 49.329 (2º CRI)",
    mapaLink: "https://maps.app.goo.gl/fyz5v5iKbRHvxUzX6",
    status: "comercial",
  },
  {
    slug: "jardim-nova-america-comercial",
    nome: "Jardim Nova América — Comercial",
    regiao: "Região de Umuarama · PR",
    area: "1.234,98 m² (7 lotes)",
    matricula: "M 47.194, 47.195, 47.165, 47.166, 26.036, 22.210 e 47.280",
    mapaLink: "https://maps.app.goo.gl/EV1Rw6uzLcA6SUNKA",
    status: "comercial",
  },
  {
    slug: "parque-residencial-roma-comercial",
    nome: "Parque Residencial Roma — Comercial",
    regiao: "Região de Umuarama · PR",
    area: "288,83 m²",
    matricula: "M 67.254",
    mapaLink: "https://maps.app.goo.gl/B2NJJxyH1LtzLWdP6",
    status: "comercial",
  },
]

export function waLinkIncorporacao(item: AreaIncorporacao) {
  const mensagem = `Olá! Sou incorporador(a)/construtor(a) e tenho interesse na área ${item.nome} para um novo empreendimento. Podem me passar mais informações?`
  return waLink(mensagem, whatsappNumbers.umuarama)
}
