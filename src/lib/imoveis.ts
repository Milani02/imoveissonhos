// Modelo de dados unificado do catálogo — lançamentos, terrenos (loteamentos) e chácaras.
// Textos extraídos das artes/documentos oficiais de cada empreendimento enviados pelo cliente
// e da Tabela de Preços - Terrenos e Chácaras (planilha de uma imobiliária parceira — por pedido
// do cliente, nenhuma marca/identificação da parceira é exibida, apenas os dados do lote em si).
import { whatsappNumbers, waLink } from "./content"
import terrenoGenerico from "../assets/generico/terreno-01.webp"
import chacaraGenerica from "../assets/generico/chacara-01.webp"
import terrenoCapa from "../assets/capas/terreno-capa.webp"
import chacaraCapa from "../assets/capas/chacara-capa.webp"

export type Categoria = "lancamento" | "terreno" | "chacara"

export interface FichaItem {
  label: string
  value: string
}

interface ImovelBase {
  slug: string
  categoria: Categoria
  nome: string
  cidade: string
  bairro?: string
  capa: string
  galeria: string[]
  destaques: string[]
  mapaLink?: string
  whatsappNumber: string
  video?: string
}

export interface Lancamento extends ImovelBase {
  categoria: "lancamento"
  fichaTecnica: FichaItem[]
  plantas?: { nome: string; area: string; detalhe: string }[]
}

export interface LoteIndividual {
  quadra: string
  lote: string
  dimensoes: string
  area: number
  valor: number
  matricula: string
  mapaLink: string
}

export interface LoteamentoImovel extends ImovelBase {
  categoria: "terreno"
  regiao: string
  formaPagamento: string
  lotes: LoteIndividual[]
}

export interface ChacaraImovel extends ImovelBase {
  categoria: "chacara"
  area: string
  condicao: string
}

export type Imovel = Lancamento | LoteamentoImovel | ChacaraImovel

// -- galeria automática por slug (evita import manual por arquivo) --
const galleryModules = import.meta.glob<{ default: string }>(
  "../assets/empreendimentos/*/*.{jpg,jpeg,png,webp,avif}",
  { eager: true },
)

function galleryFor(slug: string): string[] {
  return Object.entries(galleryModules)
    .filter(([filePath]) => filePath.includes(`/empreendimentos/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default)
}

// -- miniatura leve por slug, usada nos cards do catálogo (a foto cheia de 1920px
// deixava o carregamento do catálogo lento) --
const capaModules = import.meta.glob<{ default: string }>("../assets/capas/*.webp", { eager: true })

function capaFor(slug: string): string {
  const mod = Object.entries(capaModules).find(([filePath]) => filePath.endsWith(`/${slug}-capa.webp`))
  return mod ? mod[1].default : galleryFor(slug)[0]
}

// -- foto própria por loteamento, quando existir (a maioria ainda usa a foto
// genérica de referência em src/assets/generico/) --
const terrenoImagemModules = import.meta.glob<{ default: string }>("../assets/empreendimentos-terrenos/*.webp", {
  eager: true,
})

function terrenoImagemFor(slug: string): string {
  const mod = Object.entries(terrenoImagemModules).find(([filePath]) => filePath.endsWith(`/${slug}.webp`))
  return mod ? mod[1].default : terrenoGenerico
}

function terrenoCapaFor(slug: string): string {
  const mod = Object.entries(capaModules).find(([filePath]) => filePath.endsWith(`/${slug}-capa.webp`))
  return mod ? mod[1].default : terrenoCapa
}

// -- mesma lógica acima, aplicada às chácaras (compartilham as pastas
// empreendimentos-terrenos/ e capas/, caem no genérico de chácara) --
function chacaraImagemFor(slug: string): string {
  const mod = Object.entries(terrenoImagemModules).find(([filePath]) => filePath.endsWith(`/${slug}.webp`))
  return mod ? mod[1].default : chacaraGenerica
}

function chacaraCapaFor(slug: string): string {
  const mod = Object.entries(capaModules).find(([filePath]) => filePath.endsWith(`/${slug}-capa.webp`))
  return mod ? mod[1].default : chacaraCapa
}

function numeroPorCidade(cidade: string): string {
  return cidade.includes("Umuarama") ? whatsappNumbers.umuarama : whatsappNumbers.geral
}

export function waMessageForImovel(imovel: Imovel): string {
  const local = imovel.bairro ? `${imovel.bairro}, ${imovel.cidade}` : imovel.cidade
  const rotulo = imovel.categoria === "terreno" ? "no loteamento" : imovel.categoria === "chacara" ? "na" : "no"
  return `Olá! Tenho interesse ${rotulo} ${imovel.nome}, em ${local}. Podem me passar mais informações?`
}

export function waLinkForImovel(imovel: Imovel): string {
  return waLink(waMessageForImovel(imovel), imovel.whatsappNumber)
}

// ---------------------------------------------------------------------------
// Lançamentos
// ---------------------------------------------------------------------------

export const lancamentos: Lancamento[] = [
  {
    slug: "floriatto-morada-dos-ventos",
    categoria: "lancamento",
    nome: "Floriatto — Morada dos Ventos",
    cidade: "Londrina",
    bairro: "Califórnia",
    capa: capaFor("floriatto-morada-dos-ventos"),
    galeria: galleryFor("floriatto-morada-dos-ventos"),
    destaques: [
      "2 dormitórios, plantas de 40,45 m² a 40,70 m²",
      "Opções com garden privativo",
      "1 vaga de garagem, elevadores em todas as torres",
      "Piscinas e Play Kids com piso emborrachado",
      "Guarita, controle de acesso e preparação para CFTV perimetral",
      "4 torres, 420 unidades, 8 opções de plantas",
    ],
    mapaLink: undefined,
    whatsappNumber: numeroPorCidade("Londrina"),
    fichaTecnica: [
      { label: "Localização", value: "Rua Delma Lucia da Silva Leme Pereira, 70 — Califórnia, Londrina/PR" },
      { label: "Tipologia", value: "2 dormitórios" },
      { label: "Área privativa", value: "40,45 m² a 40,70 m²" },
      { label: "Vagas", value: "1 vaga de garagem" },
      { label: "Estrutura", value: "4 torres — Torres 1, 2 e 4 com térreo + 12 pavimentos; Torre 3 com térreo + 13" },
      { label: "Unidades", value: "420 unidades, 8 opções de plantas" },
    ],
  },
  {
    slug: "granvi",
    categoria: "lancamento",
    nome: "Granví",
    cidade: "Londrina",
    bairro: "Portal Itamaracá 2",
    capa: capaFor("granvi"),
    galeria: galleryFor("granvi"),
    destaques: [
      "2 dormitórios, plantas de 48,64 m² a 50,11 m²",
      "Opções com suíte, todos os apartamentos com varanda",
      "Opções de unidades com garden privativo",
      "Piscina adulto e infantil, solarium, play kids",
      "268 unidades, 2 elevadores por torre",
    ],
    whatsappNumber: numeroPorCidade("Londrina"),
    fichaTecnica: [
      { label: "Localização", value: "Avenida José Pavan, 377 — Portal Itamaracá 2, Londrina/PR" },
      { label: "Tipologia", value: "2 dormitórios, opções com suíte" },
      { label: "Área privativa", value: "48,64 m² a 50,11 m²" },
      { label: "Vagas", value: "1 vaga de garagem" },
      { label: "Unidades", value: "268 unidades" },
    ],
  },
  {
    slug: "residencial-la-roche",
    categoria: "lancamento",
    nome: "Residencial La Roche",
    cidade: "Londrina",
    bairro: "Zona Leste",
    capa: capaFor("residencial-la-roche"),
    galeria: galleryFor("residencial-la-roche"),
    destaques: [
      "2 quartos, apartamentos a partir de 45 m²",
      "Opções com área privativa no térreo",
      "Piscinas, playground, salão de festas, bicicletário",
      "Pet Place — condomínio pet friendly",
      "Condições especiais pelo Minha Casa, Minha Vida",
    ],
    whatsappNumber: numeroPorCidade("Londrina"),
    fichaTecnica: [
      { label: "Localização", value: "Zona Leste de Londrina/PR" },
      { label: "Tipologia", value: "2 quartos" },
      { label: "Área privativa", value: "a partir de 45 m²" },
      { label: "Vagas", value: "1 vaga de garagem" },
      { label: "Financiamento", value: "Minha Casa, Minha Vida" },
    ],
  },
  {
    slug: "residencial-lake-dali",
    categoria: "lancamento",
    nome: "Residencial Lake Dalí",
    cidade: "Londrina",
    bairro: "Acquaville",
    capa: capaFor("residencial-lake-dali"),
    galeria: galleryFor("residencial-lake-dali"),
    destaques: [
      "2 quartos, plantas a partir de 41 m²",
      "Opções com sacada e churrasqueira",
      "Piscina adulto e infantil, espaço gourmet, playground",
      "Torres com 2 elevadores, condomínio fechado",
    ],
    whatsappNumber: numeroPorCidade("Londrina"),
    fichaTecnica: [
      { label: "Localização", value: "Acquaville, Londrina/PR" },
      { label: "Tipologia", value: "2 quartos" },
      { label: "Área privativa", value: "a partir de 41 m²" },
      { label: "Condomínio", value: "Fechado, torres com 2 elevadores" },
    ],
  },
  {
    slug: "residencial-lancelot",
    categoria: "lancamento",
    nome: "Residencial Lancelot",
    cidade: "Londrina",
    bairro: "Zona Norte",
    capa: capaFor("residencial-lancelot"),
    galeria: galleryFor("residencial-lancelot"),
    destaques: [
      "2 quartos, plantas a partir de 46 m²",
      "Opções com sacada e churrasqueira",
      "Unidades Garden e vaga de garagem",
      "Piscina, playground, churrasqueira, bicicletário",
      "Condições pelo Minha Casa, Minha Vida",
    ],
    whatsappNumber: numeroPorCidade("Londrina"),
    fichaTecnica: [
      { label: "Localização", value: "Zona Norte de Londrina/PR" },
      { label: "Tipologia", value: "2 quartos" },
      { label: "Área privativa", value: "a partir de 46 m²" },
      { label: "Financiamento", value: "Minha Casa, Minha Vida" },
    ],
  },
  {
    slug: "residencial-le-ciel",
    categoria: "lancamento",
    nome: "Residencial Le Ciel",
    cidade: "Londrina",
    bairro: "Parque Jamaica",
    capa: capaFor("residencial-le-ciel"),
    galeria: galleryFor("residencial-le-ciel"),
    destaques: [
      "2 quartos, a partir de 43 m²",
      "Opções com suíte e sacada",
      "3 elevadores por torre",
      "Piscina adulto/infantil, salão de festas, espaço gourmet, pet place",
      "Fácil acesso à Av. Arthur Thomas e Av. Castelo Branco",
    ],
    whatsappNumber: numeroPorCidade("Londrina"),
    fichaTecnica: [
      { label: "Localização", value: "Parque Jamaica, Londrina/PR" },
      { label: "Tipologia", value: "2 quartos, opções com suíte" },
      { label: "Área privativa", value: "a partir de 43 m²" },
      { label: "Estrutura", value: "3 elevadores por torre" },
    ],
  },
  {
    slug: "viva-alameda",
    categoria: "lancamento",
    nome: "Residencial Viva Alameda",
    cidade: "Londrina",
    bairro: "Sabará III",
    capa: capaFor("viva-alameda"),
    galeria: galleryFor("viva-alameda"),
    destaques: [
      "2 quartos, plantas de 47,79 m² e 48,52 m²",
      "Sacada e churrasqueira em todos os apartamentos",
      "Opções Garden de até 94,93 m²",
      "Portaria 24h, entrada enclausurada e sistema de segurança",
      "Próximo à Av. Arthur Thomas, Gleba Palhano, Shopping Catuaí e UEL",
      "Minha Casa Minha Vida + Casa Fácil Paraná, possibilidade de subsídio",
    ],
    whatsappNumber: numeroPorCidade("Londrina"),
    fichaTecnica: [
      { label: "Localização", value: "Rua Vital Ferreira Chagas, 480 — Sabará III, Londrina/PR" },
      { label: "Tipologia", value: "2 quartos" },
      { label: "Área privativa", value: "47,79 m² a 48,52 m² (Garden até 94,93 m²)" },
      { label: "Vagas", value: "1 vaga de garagem" },
      { label: "Financiamento", value: "Minha Casa Minha Vida + Casa Fácil Paraná + FGTS" },
    ],
  },
  {
    slug: "reserva-hause",
    categoria: "lancamento",
    nome: "Reserva Hause",
    cidade: "Umuarama",
    capa: capaFor("reserva-hause"),
    galeria: galleryFor("reserva-hause"),
    destaques: [
      "Rooftop exclusivo com Sky Bar e Sky Fitness",
      "Área privativa de 63 m² a 138 m², 6 opções de plantas",
      "1, 2 ou 3 vagas de garagem — opções tipo e duplex",
      "Portaria remota, sistema de reaproveitamento de água, vagas ecológicas",
      "Desenvolvido pela Quadra 1 Construtora e Incorporadora",
    ],
    whatsappNumber: numeroPorCidade("Umuarama"),
    fichaTecnica: [
      { label: "Área privativa", value: "63 m² a 138 m² (total: 104 m² a 228 m²)" },
      { label: "Plantas", value: "6 opções, incluindo 3 unidades duplex" },
      { label: "Vagas", value: "1, 2 ou 3 vagas de garagem" },
      { label: "Estrutura", value: "1 torre, 81 apartamentos, 17 pavimentos, 2 elevadores" },
      { label: "Área de lazer", value: "2.420,57 m²" },
    ],
  },
  {
    slug: "brisa-do-vale",
    categoria: "lancamento",
    nome: "Residências Brisa do Vale",
    cidade: "Umuarama",
    bairro: "Parque Residencial Viena",
    capa: capaFor("brisa-do-vale"),
    galeria: galleryFor("brisa-do-vale"),
    destaques: [
      "Financiamento pelo programa Minha Casa Minha Vida",
      "Entrada 100% parcelada",
      "Plantas de 43,73 m² e 49,73 m²",
      "Terrenos de até 152,90 m²",
      "Ao lado de uma ampla área verde",
      "A poucos minutos do IFPR e do aeroporto",
    ],
    whatsappNumber: numeroPorCidade("Umuarama"),
    fichaTecnica: [
      { label: "Localização", value: "Jardim Viena, Umuarama/PR" },
      { label: "Tipologia", value: "2 quartos, opções com suíte" },
      { label: "Área construída", value: "43,73 m² a 49,73 m²" },
      { label: "Terreno", value: "até 152,90 m²" },
      { label: "Financiamento", value: "Minha Casa Minha Vida, entrada 100% parcelada" },
    ],
    plantas: [
      { nome: "Planta 1", area: "43,73 m²", detalhe: "2 dormitórios, coz/sala integrada" },
      { nome: "Planta 2", area: "49,73 m²", detalhe: "Suíte + dormitório, 2 banheiros" },
    ],
  },
  {
    slug: "cafezal-do-sul",
    categoria: "lancamento",
    nome: "Casas em Cafezal do Sul",
    cidade: "Cafezal do Sul",
    capa: capaFor("cafezal-do-sul"),
    galeria: galleryFor("cafezal-do-sul"),
    destaques: [
      "2 quartos, sala, cozinha e BWC social",
      "Lavanderia coberta",
      "Vaga de garagem descoberta",
      "Financiamento pelo Minha Casa, Minha Vida",
      "Apenas 19 unidades — 80% já vendidas",
    ],
    whatsappNumber: numeroPorCidade("Cafezal do Sul"),
    fichaTecnica: [
      { label: "Área construída", value: "48 m²" },
      { label: "Tipologia", value: "2 quartos, sala, cozinha, lavanderia" },
      { label: "Unidades", value: "19 unidades — 80% já vendidas" },
      { label: "Financiamento", value: "Minha Casa, Minha Vida" },
    ],
  },
]

// ---------------------------------------------------------------------------
// Terrenos (loteamentos) — dado agregado, expandido com os lotes individuais
// ---------------------------------------------------------------------------

function loteamentoDestaques(l: { lotes: LoteIndividual[] }): string[] {
  return [`${l.lotes.length} lote${l.lotes.length > 1 ? "s" : ""} disponíve${l.lotes.length > 1 ? "is" : "l"}`]
}

const loteamentosBase: Omit<LoteamentoImovel, "capa" | "galeria" | "destaques">[] = [
  {
    slug: "jardim-bonanza-ii",
    categoria: "terreno",
    nome: "Jardim Bonanza II",
    cidade: "Xambrê",
    regiao: "Xambrê · PR",
    formaPagamento: "30% de entrada, restante em 60x corrigidas a 1,5% a.m.",
    mapaLink: "https://maps.app.goo.gl/87dh7VP3222WgnEF7",
    whatsappNumber: whatsappNumbers.umuarama,
    lotes: [
      { quadra: "Q08", lote: "L6", dimensoes: "8,80 x 25,00", area: 220, valor: 36900, matricula: "M 10.805", mapaLink: "https://maps.app.goo.gl/87dh7VP3222WgnEF7" },
      { quadra: "Q08", lote: "L7", dimensoes: "8,80 x 25,00", area: 220, valor: 36900, matricula: "M 10.806", mapaLink: "https://maps.app.goo.gl/87dh7VP3222WgnEF7" },
      { quadra: "Q08", lote: "L8", dimensoes: "14,0 x 22,00", area: 308, valor: 52000, matricula: "M 10.807", mapaLink: "https://maps.app.goo.gl/aropswsYEEvVSb9G8" },
      { quadra: "Q08", lote: "L9", dimensoes: "11,0 x 22,00", area: 240, valor: 39900, matricula: "M 10.808", mapaLink: "https://maps.app.goo.gl/2hNmAdtkyXqSnH9BA" },
    ],
  },
  {
    slug: "parque-residencial-viena-ii",
    categoria: "terreno",
    nome: "Parque Residencial Viena II",
    cidade: "Umuarama",
    regiao: "Umuarama · PR",
    formaPagamento: "10% de entrada, restante em 96x corrigidas a 1,5% a.m.",
    mapaLink: "https://maps.app.goo.gl/MPUwroV5aARMSNr17",
    whatsappNumber: whatsappNumbers.umuarama,
    lotes: [
      { quadra: "Q12", lote: "L12-A", dimensoes: "7,0 x 18,23", area: 127.61, valor: 46900, matricula: "M 71.962", mapaLink: "https://maps.app.goo.gl/MPUwroV5aARMSNr17" },
      { quadra: "Q12", lote: "L12-B", dimensoes: "7,0 x 18,23", area: 127.61, valor: 46900, matricula: "M 71.963", mapaLink: "https://maps.app.goo.gl/eTYvS2obXZkENQV76" },
      { quadra: "Q16", lote: "L15-B", dimensoes: "7,0 x 18,10", area: 126.70, valor: 46900, matricula: "M 79.716", mapaLink: "https://maps.app.goo.gl/froLQjgcmCHoPMzD7" },
      { quadra: "Q16", lote: "L16", dimensoes: "18,1 x 17,7", area: 320.37, valor: 112129.5, matricula: "M 54.381", mapaLink: "https://maps.app.goo.gl/yYAa4MWoMn9cjRbZ8" },
    ],
  },
  {
    slug: "parque-residencial-viena-iii",
    categoria: "terreno",
    nome: "Parque Residencial Viena III",
    cidade: "Umuarama",
    regiao: "Umuarama · PR",
    formaPagamento: "10% de entrada, restante em 96x corrigidas a 1,5% a.m.",
    mapaLink: "https://maps.app.goo.gl/iheDBTYbvrgEkPjz7",
    whatsappNumber: whatsappNumbers.umuarama,
    lotes: [
      { quadra: "Q9-B", lote: "L5-A (esquina)", dimensoes: "14,81 x 17,80", area: 263.62, valor: 110000, matricula: "M 54.731 (inteiro)", mapaLink: "https://maps.app.goo.gl/iheDBTYbvrgEkPjz7" },
      { quadra: "Q12", lote: "L07-A", dimensoes: "7,50 x 17,80", area: 133.50, valor: 49900, matricula: "M 76.908", mapaLink: "https://maps.app.goo.gl/7Eb2CKWYHxeAMAYe9" },
      { quadra: "Q15", lote: "L05-A", dimensoes: "7,50 x 17,80", area: 133.50, valor: 46900, matricula: "M 71.742", mapaLink: "https://maps.app.goo.gl/zE3CUTsu9ZtvRt6M8" },
      { quadra: "Q16", lote: "L06-B", dimensoes: "7,50 x 17,85", area: 133.87, valor: 46900, matricula: "M 54.857 (inteiro)", mapaLink: "https://maps.app.goo.gl/chAfcQKahDnB2cGd9" },
      { quadra: "Q19", lote: "L11-A", dimensoes: "7,50 x 17,85", area: 133.87, valor: 46900, matricula: "M 54.922/54.923", mapaLink: "https://maps.app.goo.gl/J4JzucCnWSwcLsda8" },
      { quadra: "Q19", lote: "L12-A", dimensoes: "7,50 x 17,85", area: 133.87, valor: 46900, matricula: "M 54.922/54.923", mapaLink: "https://maps.app.goo.gl/KLMeg4cc5m2GK8gq6" },
      { quadra: "Q19", lote: "L12-B", dimensoes: "7,50 x 17,85", area: 133.87, valor: 46900, matricula: "M 54.922/54.923", mapaLink: "https://maps.app.goo.gl/22tpSdxYPp7EeFwj6" },
    ],
  },
  {
    slug: "parque-residencial-viena",
    categoria: "terreno",
    nome: "Parque Residencial Viena",
    cidade: "Umuarama",
    regiao: "Umuarama · PR",
    formaPagamento: "10% de entrada, restante em 96x corrigidas a 1,5% a.m.",
    mapaLink: "https://maps.app.goo.gl/1U5TVhLrf8sDk6jo6",
    whatsappNumber: whatsappNumbers.umuarama,
    lotes: [
      { quadra: "Q9", lote: "L11", dimensoes: "14,00 x 18,38", area: 257.32, valor: 98000, matricula: "M 77.263 (inteira)", mapaLink: "https://maps.app.goo.gl/1U5TVhLrf8sDk6jo6" },
      { quadra: "Q11", lote: "L08-B", dimensoes: "7,00 x 18,39", area: 128.73, valor: 48900, matricula: "M 65.778", mapaLink: "https://maps.app.goo.gl/rktPer7ac2wWhnEA7" },
      { quadra: "Q13", lote: "L12-B", dimensoes: "7,00 x 18,38", area: 128.66, valor: 48900, matricula: "M 65.738", mapaLink: "https://maps.app.goo.gl/ReeqKKHviAxSYsbKA" },
    ],
  },
  {
    slug: "parque-metropolitano",
    categoria: "terreno",
    nome: "Parque Metropolitano",
    cidade: "Umuarama",
    regiao: "Umuarama e região",
    formaPagamento: "10% de entrada, restante em 96x corrigidas a 1,5% a.m.",
    mapaLink: "https://maps.app.goo.gl/1WjejjXaBcjbYGXR7",
    whatsappNumber: whatsappNumbers.umuarama,
    lotes: [
      { quadra: "Q05", lote: "L7/8-A (esquina)", dimensoes: "14,0 x 16,00", area: 224, valor: 106000, matricula: "—", mapaLink: "https://maps.app.goo.gl/1WjejjXaBcjbYGXR7" },
      { quadra: "Q05", lote: "L7/8-B", dimensoes: "12,0 x 14,00", area: 168, valor: 78000, matricula: "—", mapaLink: "https://maps.app.goo.gl/ipXCqKvndFv3NqN6A" },
      { quadra: "Q11", lote: "L37/38-B", dimensoes: "6,5 x 22,00", area: 143, valor: 74000, matricula: "M 41.879", mapaLink: "https://maps.app.goo.gl/E2t5AkfsdYV2LaEj7" },
      { quadra: "Q11", lote: "L41", dimensoes: "10,0 x 22,00", area: 220, valor: 98000, matricula: "—", mapaLink: "https://maps.app.goo.gl/TtnZ2NQuAfDMsX187" },
    ],
  },
  {
    slug: "parque-residencial-perola-ii",
    categoria: "terreno",
    nome: "Parque Residencial Pérola II",
    cidade: "Pérola",
    regiao: "Pérola · PR",
    formaPagamento: "30% de entrada, restante em 60x corrigidas a 1,5% a.m.",
    mapaLink: "https://maps.app.goo.gl/p9jAY5caz2sf7Zfg8",
    whatsappNumber: whatsappNumbers.umuarama,
    lotes: [
      { quadra: "Q06", lote: "L37", dimensoes: "7,50 x 24,0", area: 180, valor: 55000, matricula: "M 11.950", mapaLink: "https://maps.app.goo.gl/p9jAY5caz2sf7Zfg8" },
      { quadra: "Q06", lote: "L38", dimensoes: "7,50 x 24,0", area: 180, valor: 55000, matricula: "M 11.951", mapaLink: "https://maps.app.goo.gl/WUyGQsqhGhYev83y8" },
      { quadra: "Q146", lote: "L06", dimensoes: "10,0 x 40,0", area: 400, valor: 178000, matricula: "M 4.612", mapaLink: "https://maps.app.goo.gl/584ND1NkWmgm5neZ6" },
    ],
  },
  {
    slug: "jardim-nova-america",
    categoria: "terreno",
    nome: "Jardim Nova América",
    cidade: "Umuarama",
    regiao: "Umuarama e região",
    formaPagamento: "30% de entrada, restante em 10x corrigidas a 1,5% a.m.",
    mapaLink: "https://maps.app.goo.gl/QpnVZ67M82PpsCYh7",
    whatsappNumber: whatsappNumbers.umuarama,
    lotes: [
      { quadra: "Q01", lote: "L23-B", dimensoes: "7,0 x 27,10", area: 189.70, valor: 68292, matricula: "M 25.931", mapaLink: "https://maps.app.goo.gl/gRhoe4NqGDDw1LWJ7" },
      { quadra: "Q01", lote: "L25-A", dimensoes: "7,0 x 27,10", area: 189.70, valor: 68292, matricula: "M 25.934", mapaLink: "https://maps.app.goo.gl/Gdc7kRS71wZeyUtGA" },
      { quadra: "Q03", lote: "L17", dimensoes: "10,0 x 21,00", area: 210, valor: 75600, matricula: "M 24.743", mapaLink: "https://maps.app.goo.gl/SSMrTd3cHVLNMXi47" },
      { quadra: "Q03", lote: "L30/31-A", dimensoes: "6,65 x 21,00", area: 139.65, valor: 58653, matricula: "M 47.953", mapaLink: "https://maps.app.goo.gl/F3An2sU15zVVEtEb8" },
      { quadra: "Q03", lote: "L30/31-B", dimensoes: "6,65 x 21,00", area: 139.65, valor: 58653, matricula: "M 47.954", mapaLink: "https://maps.app.goo.gl/AbfcBsXPZsAJ7QJCA" },
      { quadra: "Q03", lote: "L30/31-C", dimensoes: "6,7 x 21,00", area: 140.7, valor: 59094, matricula: "M 47.955", mapaLink: "https://maps.app.goo.gl/mHVr4hrZNaWUuQmX6" },
      { quadra: "Q03", lote: "L34", dimensoes: "10,0 x 21,00", area: 210, valor: 75600, matricula: "M 24.760", mapaLink: "https://maps.app.goo.gl/QpnVZ67M82PpsCYh7" },
      { quadra: "Q03", lote: "L37", dimensoes: "10,0 x 21,00", area: 210, valor: 75600, matricula: "M 24.763", mapaLink: "https://maps.app.goo.gl/XoqLPP8zjKGySnSq5" },
      { quadra: "Q09", lote: "L11", dimensoes: "13,0 x 20,00", area: 252.26, valor: 88291, matricula: "M 24.951", mapaLink: "https://maps.app.goo.gl/xYpbS1iaC6wyS4bc6" },
      { quadra: "Q10", lote: "L1", dimensoes: "12,8 x 19,90", area: 252.26, valor: 88291, matricula: "M 24.952", mapaLink: "https://maps.app.goo.gl/XyBAihLNmhAaqNzr9" },
      { quadra: "Q10", lote: "L6", dimensoes: "10,0 x 20,00", area: 200, valor: 72000, matricula: "M 24.957", mapaLink: "https://maps.app.goo.gl/pKtj3w6V1JXqcQfz5" },
      { quadra: "Q10", lote: "L13/14-A", dimensoes: "6,8 x 20,00", area: 132, valor: 55440, matricula: "M 48.480", mapaLink: "https://maps.app.goo.gl/WZBce81QA1Rja1WEA" },
      { quadra: "Q10", lote: "L13/14-C", dimensoes: "6,62 x 20,00", area: 137.16, valor: 57607.2, matricula: "M 48.482", mapaLink: "https://maps.app.goo.gl/WZBce81QA1Rja1WEA" },
      { quadra: "Q10", lote: "L15-B", dimensoes: "21,76 x 16,17", area: 277.37, valor: 97079.5, matricula: "M 25.999", mapaLink: "https://maps.app.goo.gl/weFBaDM4xpBLEASW9" },
      { quadra: "Q11", lote: "L02", dimensoes: "19,0 x 14,0", area: 265.33, valor: 92865.5, matricula: "M 24.968", mapaLink: "https://maps.app.goo.gl/X9LSf4xXHPttaNM26" },
    ],
  },
  {
    slug: "pq-firenze",
    categoria: "terreno",
    nome: "PQ Firenze",
    cidade: "Umuarama",
    regiao: "Umuarama e região",
    formaPagamento: "30% de entrada, restante em 60x corrigidas a 1,5% a.m.",
    mapaLink: "https://maps.app.goo.gl/tH6h8d9ysQL1ivD8A",
    whatsappNumber: whatsappNumbers.umuarama,
    lotes: [
      { quadra: "Q32", lote: "L05-B", dimensoes: "6,4 x 29,38", area: 188, valor: 69900, matricula: "M 48.980", mapaLink: "https://maps.app.goo.gl/tH6h8d9ysQL1ivD8A" },
      { quadra: "Q26", lote: "L09", dimensoes: "12,0 x 30,00", area: 360, valor: 135000, matricula: "M 26.953", mapaLink: "https://maps.app.goo.gl/9zoFkvjapN6Khd946" },
    ],
  },
  {
    slug: "parque-residencial-roma",
    categoria: "terreno",
    nome: "Parque Residencial Roma",
    cidade: "Umuarama",
    regiao: "Umuarama e região",
    formaPagamento: "10% de entrada, restante em 100x corrigidas a 1,5% a.m.",
    mapaLink: "https://maps.app.goo.gl/cavD4Ab5Z21Yrju87",
    whatsappNumber: whatsappNumbers.umuarama,
    lotes: [
      { quadra: "Q10", lote: "L01", dimensoes: "9,03 fr / 5,66 e 11,2 fun x 21,7 e 14,7 lat", area: 220.20, valor: 85000, matricula: "M 67.389", mapaLink: "https://maps.app.goo.gl/cavD4Ab5Z21Yrju87" },
    ],
  },
  {
    slug: "jardim-tangara",
    categoria: "terreno",
    nome: "Jardim Tangará",
    cidade: "Umuarama",
    regiao: "Umuarama e região (Panorama)",
    formaPagamento: "30% de entrada, restante em 60x corrigidas a 1,5% a.m.",
    mapaLink: "https://maps.app.goo.gl/1aWfM7df4iMW89F39",
    whatsappNumber: whatsappNumbers.umuarama,
    lotes: [
      { quadra: "Q06", lote: "L16", dimensoes: "12,24 x 42,74", area: 523.25, valor: 300000, matricula: "M 4294", mapaLink: "https://maps.app.goo.gl/1aWfM7df4iMW89F39" },
    ],
  },
  {
    slug: "paysage-unique-condominio",
    categoria: "terreno",
    nome: "Paysage Unique Condomínio",
    cidade: "Umuarama",
    regiao: "Umuarama · PR",
    formaPagamento: "30% de entrada, restante em 60x corrigidas a 1,5% a.m.",
    mapaLink: "https://maps.app.goo.gl/9ddJW4ceMiTdW5267",
    whatsappNumber: whatsappNumbers.umuarama,
    lotes: [
      { quadra: "Q02", lote: "L14", dimensoes: "12,0 x 25,0 x 25,97 x 25,55", area: 406.94, valor: 335000, matricula: "M 63.205", mapaLink: "https://maps.app.goo.gl/9ddJW4ceMiTdW5267" },
    ],
  },
]

export const loteamentosImoveis: LoteamentoImovel[] = loteamentosBase.map((l) => ({
  ...l,
  capa: terrenoCapaFor(l.slug),
  galeria: [terrenoImagemFor(l.slug)],
  destaques: loteamentoDestaques(l),
}))

// ---------------------------------------------------------------------------
// Chácaras
// ---------------------------------------------------------------------------

export const chacarasImoveis: ChacaraImovel[] = [
  {
    slug: "chacara-rod-henio-romagnoli",
    categoria: "chacara",
    nome: "Chácara Rod. Henio Romagnoli",
    cidade: "Região de Umuarama",
    bairro: "Saída Mariluz, próx. Stang Distribuidora",
    area: "20.550 m²",
    condicao: "10% de entrada, restante em 120x corrigidas a 1% a.m.",
    capa: chacaraCapaFor("chacara-rod-henio-romagnoli"),
    galeria: [chacaraImagemFor("chacara-rod-henio-romagnoli")],
    destaques: ["Área de 20.550 m²", "Acesso pela Rod. PR-468", "10% de entrada, restante em 120x"],
    mapaLink: "https://maps.app.goo.gl/mCaj5e9wsjQezyVq8",
    whatsappNumber: whatsappNumbers.umuarama,
  },
  {
    slug: "chacara-cruzeiro",
    categoria: "chacara",
    nome: "Chácara Cruzeiro",
    cidade: "Cruzeiro do Oeste",
    bairro: "Duas glebas disponíveis",
    area: "29.894 m² e 25.848 m²",
    condicao: "30% de entrada, restante em 60x corrigidas a 1,5% a.m.",
    capa: chacaraCapaFor("chacara-cruzeiro"),
    galeria: [chacaraImagemFor("chacara-cruzeiro")],
    destaques: ["Duas glebas disponíveis: 29.894 m² e 25.848 m²", "30% de entrada, restante em 60x"],
    mapaLink: "https://maps.app.goo.gl/SrfTUjUqCcwdFSmz5",
    whatsappNumber: whatsappNumbers.umuarama,
  },
]

export const imoveis: Imovel[] = [...lancamentos, ...loteamentosImoveis, ...chacarasImoveis]

export function getImovel(categoria: Categoria, slug: string): Imovel | undefined {
  return imoveis.find((i) => i.categoria === categoria && i.slug === slug)
}
