// Dados extraídos da Tabela de Preços - Terrenos e Chácaras (planilha do parceiro).
// Por pedido do cliente: nenhuma marca/identificação do parceiro é exibida — apenas os dados do lote/chácara em si.
// Lotes agregados por loteamento (não listados individualmente) para leitura rápida e visual limpo.

export interface Loteamento {
  nome: string
  regiao: string
  lotes: number
  precoM2Min: number
  precoM2Max: number
  valorMin: number
  valorMax: number
  mapaLink: string
  destaque?: string
}

export const loteamentos: Loteamento[] = [
  {
    nome: "Jardim Bonanza II",
    regiao: "Xambrê · PR",
    lotes: 4,
    precoM2Min: 166.25,
    precoM2Max: 168.83,
    valorMin: 36900,
    valorMax: 52000,
    mapaLink: "https://maps.app.goo.gl/87dh7VP3222WgnEF7",
    destaque: "Menor entrada de todas",
  },
  {
    nome: "Parque Residencial Viena II",
    regiao: "Umuarama · PR",
    lotes: 4,
    precoM2Min: 350,
    precoM2Max: 370.17,
    valorMin: 46900,
    valorMax: 112129.5,
    mapaLink: "https://maps.app.goo.gl/MPUwroV5aARMSNr17",
    destaque: "Mesmo bairro do Brisa do Vale",
  },
  {
    nome: "Parque Residencial Viena III",
    regiao: "Umuarama · PR",
    lotes: 7,
    precoM2Min: 350.34,
    precoM2Max: 417.27,
    valorMin: 46900,
    valorMax: 110000,
    mapaLink: "https://maps.app.goo.gl/iheDBTYbvrgEkPjz7",
    destaque: "Mesmo bairro do Brisa do Vale",
  },
  {
    nome: "Parque Residencial Viena",
    regiao: "Umuarama · PR",
    lotes: 3,
    precoM2Min: 379.86,
    precoM2Max: 380.85,
    valorMin: 48900,
    valorMax: 98000,
    mapaLink: "https://maps.app.goo.gl/1U5TVhLrf8sDk6jo6",
    destaque: "Mesmo bairro do Brisa do Vale",
  },
  {
    nome: "Parque Metropolitano",
    regiao: "Umuarama e região",
    lotes: 4,
    precoM2Min: 445.45,
    precoM2Max: 517.48,
    valorMin: 74000,
    valorMax: 106000,
  mapaLink: "https://maps.app.goo.gl/1WjejjXaBcjbYGXR7",
  },
  {
    nome: "Parque Residencial Pérola II",
    regiao: "Pérola · PR",
    lotes: 3,
    precoM2Min: 305.56,
    precoM2Max: 445,
    valorMin: 55000,
    valorMax: 178000,
    mapaLink: "https://maps.app.goo.gl/p9jAY5caz2sf7Zfg8",
  },
  {
    nome: "Jardim Nova América",
    regiao: "Umuarama e região",
    lotes: 15,
    precoM2Min: 350,
    precoM2Max: 420,
    valorMin: 55440,
    valorMax: 97079.5,
    mapaLink: "https://maps.app.goo.gl/QpnVZ67M82PpsCYh7",
    destaque: "Maior variedade disponível",
  },
  {
    nome: "PQ Firenze",
    regiao: "Umuarama e região",
    lotes: 2,
    precoM2Min: 371.81,
    precoM2Max: 375,
    valorMin: 69900,
    valorMax: 135000,
    mapaLink: "https://maps.app.goo.gl/tH6h8d9ysQL1ivD8A",
  },
  {
    nome: "Parque Residencial Roma",
    regiao: "Umuarama e região",
    lotes: 1,
    precoM2Min: 386.01,
    precoM2Max: 386.01,
    valorMin: 85000,
    valorMax: 85000,
    mapaLink: "https://maps.app.goo.gl/cavD4Ab5Z21Yrju87",
  },
  {
    nome: "Jardim Tangará",
    regiao: "Umuarama e região",
    lotes: 1,
    precoM2Min: 573.34,
    precoM2Max: 573.34,
    valorMin: 300000,
    valorMax: 300000,
    mapaLink: "https://maps.app.goo.gl/1aWfM7df4iMW89F39",
  },
  {
    nome: "Paysage Unique Condomínio",
    regiao: "Umuarama · PR",
    lotes: 1,
    precoM2Min: 823.22,
    precoM2Max: 823.22,
    valorMin: 335000,
    valorMax: 335000,
    mapaLink: "https://maps.app.goo.gl/9ddJW4ceMiTdW5267",
    destaque: "Condomínio fechado",
  },
]

export interface Chacara {
  nome: string
  localizacao: string
  area: string
  valor: string
  condicao: string
  mapaLink: string
}

export const chacaras: Chacara[] = [
  {
    nome: "Chácara Rod. Henio Romagnoli",
    localizacao: "Saída Mariluz, próx. Stang Distribuidora",
    area: "20.550 m²",
    valor: "R$ 320.000",
    condicao: "10% de entrada, restante em 120x",
    mapaLink: "https://maps.app.goo.gl/mCaj5e9wsjQezyVq8",
  },
  {
    nome: "Chácara Cruzeiro",
    localizacao: "Duas glebas disponíveis",
    area: "29.894 m² e 25.848 m²",
    valor: "R$ 800.000 e R$ 450.000",
    condicao: "30% de entrada, restante em 60x",
    mapaLink: "https://maps.app.goo.gl/SrfTUjUqCcwdFSmz5",
  },
]

export const terrenosStats = {
  totalLotes: loteamentos.reduce((acc, l) => acc + l.lotes, 0),
  totalLoteamentos: loteamentos.length,
  menorValor: Math.min(...loteamentos.map((l) => l.valorMin)),
}

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })
}
