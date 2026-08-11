// Conteúdo estratégico — baseado nas informações reais fornecidas pelo cliente
// (Informações.docx + fotos/plantas oficiais dos empreendimentos + tabela de terrenos).

export const whatsappNumbers = {
  geral: "5543991839425", // Londrina
  umuarama: "5544991594260", // Umuarama
}

export function waLink(message: string, number: string = whatsappNumbers.geral) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export const waMessages = {
  header: "Olá! Vi o site da Imóveis dos Sonhos e gostaria de saber mais sobre os imóveis disponíveis.",
  floating: "Olá! Vi o site e gostaria de saber mais sobre os imóveis exclusivos da Imóveis dos Sonhos 🏡",
  hero: "Olá! Quero sair do aluguel e simular meu financiamento com a Imóveis dos Sonhos.",
  comparison: "Olá! Não sei se compro imóvel pronto ou na planta. Podem me ajudar a decidir?",
  journey: "Olá! Quero fazer minha simulação 100% online com a Imóveis dos Sonhos.",
  gallery: "Olá! Vi os lançamentos no site e quero saber mais detalhes.",
  brisaDoVale: "Olá! Tenho interesse no Residências Brisa do Vale, em Umuarama. Podem me passar mais informações?",
  cafezal: "Olá! Tenho interesse no lançamento em Cafezal do Sul. Podem me passar mais informações?",
  terreno: "Olá! Vi os terrenos no site e quero simular a compra de um deles.",
  chacara: "Olá! Tenho interesse em uma chácara. Podem me passar mais informações?",
  finalCta: "Olá! Vim pelo site e quero falar com um especialista agora.",
}

export const siteMeta = {
  title: "Imóveis dos Sonhos — Seu sonho de morar bem começa aqui",
  description:
    "Imobiliária 100% digital com foco em lançamentos imobiliários em Londrina, Umuarama e Cafezal do Sul. Simulação online, entrada 100% parcelada e atendimento personalizado do primeiro contato às chaves.",
  instagram: "@imoveis_dos_sonhoss",
  instagramUrl: "https://instagram.com/imoveis_dos_sonhoss",
}

export const nav = [
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Lançamentos", href: "#empreendimentos" },
  { label: "Terrenos", href: "#terrenos" },
  { label: "Jornada", href: "#jornada" },
  { label: "Cidades", href: "#cidades" },
]

export const hero = {
  eyebrow: "Imobiliária 100% digital · Londrina, Umuarama e Cafezal do Sul",
  headlineLine1: "Você não nasceu",
  headlineEmphasis: "pra pagar aluguel",
  headlineLine2: "a vida toda.",
  body:
    "Simulação 100% online, entrada parcelada e atendimento personalizado até a chave na mão. Conheça os lançamentos que estão saindo do papel em Umuarama e Cafezal do Sul.",
  ctaPrimary: "Quero sair do aluguel",
  ctaSecondary: "Ver lançamentos",
  stats: [
    { value: "100%", label: "Entrada parcelada" },
    { value: "3", label: "Cidades atendidas" },
    { value: "1º", label: "Contato até as chaves" },
  ],
}

export const cities = ["Londrina", "Umuarama", "Cafezal do Sul"]

export const diferenciais = {
  eyebrow: "Por que Imóveis dos Sonhos",
  heading: "Mais que vendas. Realizamos conquistas.",
  body: "Somos uma imobiliária 100% digital, focada em lançamentos — mas também com casas e apartamentos prontos pra morar. Do primeiro contato à assinatura, você é acompanhado de perto.",
  cards: [
    {
      icon: "Smartphone",
      title: "Atendimento 100% Online",
      description: "Entendemos o que você procura, apresentamos as opções e fazemos a simulação sem sair de casa.",
    },
    {
      icon: "Building2",
      title: "Foco em Lançamentos",
      description: "Acesso a empreendimentos saindo do papel, com condições exclusivas de pré-lançamento.",
    },
    {
      icon: "Wallet",
      title: "Entrada 100% Parcelada",
      description: "Você não precisa ter tudo guardado hoje pra começar a conquistar seu imóvel.",
    },
    {
      icon: "HeartHandshake",
      title: "Acompanhamento Completo",
      description: "Após o online, encaminhamos você pra um atendimento presencial junto à construtora responsável.",
    },
  ],
}

export const comparison = {
  eyebrow: "Pronto ou na planta?",
  heading: "Qual é o melhor caminho pra você?",
  body: "Cada escolha tem suas vantagens. Conheça as duas e descubra qual combina com o seu momento.",
  ready: {
    title: "Imóvel pronto",
    subtitle: "pra morar",
    points: [
      "Entrada à vista",
      "Pronto pra uso imediato — é só mudar",
      "Você visita e confere cada detalhe antes de decidir",
      "Localização e bairro já definidos",
      "Sem surpresas de prazo ou obra",
      "Valorização imediata",
    ],
    note: "Gasta mais com documentação (ITBI, registro e escritura)",
  },
  planned: {
    title: "Lançamento",
    subtitle: "na planta",
    points: [
      "Entrada 100% parcelada",
      "Você se planeja com calma até a entrega",
      "Potencial de valorização até a entrega das chaves",
      "Condições exclusivas de pré-lançamento",
      "Financiamento facilitado (inclusive Minha Casa Minha Vida)",
      "Mais tempo pra organizar suas finanças",
    ],
    note: "Nosso foco principal — é aqui que estão as melhores condições",
  },
  cta: "Falar com um especialista",
}

export const journey = {
  eyebrow: "A jornada da chave",
  heading: "Do aluguel à chave da conquista",
  body: "É assim que caminhamos com você — do primeiro contato online até o dia em que a chave do seu imóvel vira sua.",
  stages: [
    {
      icon: "KeyRound",
      tag: "Hoje",
      title: "O aluguel",
      description: "Pagando a conta de outra pessoa, sem construir patrimônio próprio.",
      image: null as string | null,
    },
    {
      icon: "Smartphone",
      tag: "Passo 1",
      title: "Simulação 100% online",
      description: "Entendemos o que você procura, mostramos as opções disponíveis e simulamos seu financiamento sem sair de casa.",
      image: null as string | null,
    },
    {
      icon: "Handshake",
      tag: "Passo 2",
      title: "Atendimento com a construtora",
      description: "Você conhece o projeto de perto, tira dúvidas e dá continuidade à negociação com quem constrói.",
      image: "construction",
    },
    {
      icon: "PartyPopper",
      tag: "Conquista",
      title: "Chaves na mão",
      description: "Seu sonho, sua conquista, seu endereço novo.",
      image: "keysHandoff",
    },
  ],
}

export const fiveReasons = {
  eyebrow: "5 motivos",
  heading: "5 motivos pra escolher a Imóveis dos Sonhos",
  reasons: [
    {
      title: "Atendimento 100% Personalizado",
      description: "Acompanhamos você do primeiro contato até a entrega das chaves.",
    },
    {
      title: "Especialistas em Lançamentos",
      description: "Foco em empreendimentos saindo do papel, com as melhores condições de pré-lançamento.",
    },
    {
      title: "Atendimento Inicial 100% Online",
      description: "Faça sua simulação e entenda suas opções sem sair de casa.",
    },
    {
      title: "Entrada 100% Parcelada",
      description: "Você não precisa ter tudo guardado hoje pra dar o primeiro passo.",
    },
    {
      title: "Diversas Opções de Imóveis",
      description: "Lançamentos, casas e apartamentos prontos pra morar — sempre a opção certa pro seu momento.",
    },
  ],
}

export const empreendimentos = {
  eyebrow: "Lançamentos em destaque",
  heading: "Empreendimentos saindo do papel — e do sonho pra realidade",
  body: "Conheça de perto os lançamentos que estão transformando bairros inteiros em Umuarama e Cafezal do Sul.",
}

export const brisaDoVale = {
  nome: "Residências Brisa do Vale",
  cidade: "Umuarama · PR",
  bairro: "Parque Residencial Viena",
  precoDesde: "R$ 204.900",
  destaques: [
    "Financiamento pelo programa Minha Casa Minha Vida",
    "Entrada 100% parcelada",
    "Plantas de 43,73 m² e 49,73 m²",
    "Terrenos de até 152,90 m²",
    "Ao lado de uma ampla área verde",
    "A poucos minutos do IFPR e do aeroporto",
  ],
  plantas: [
    { nome: "Planta 1", area: "43,73 m²", detalhe: "2 dormitórios, coz/sala integrada" },
    { nome: "Planta 2", area: "49,73 m²", detalhe: "Suíte + dormitório, 2 banheiros" },
  ],
}

export const cafezal = {
  nome: "Novo Lançamento",
  cidade: "Cafezal do Sul · PR",
  precoDesde: "R$ 190.000",
  unidades: "Apenas 19 unidades",
  areaConstruida: "48 m²",
  destaques: [
    "2 quartos, sala, cozinha e BWC social",
    "Lavanderia coberta",
    "Vaga de garagem descoberta",
    "Terrenos de até 204 m²",
    "Apenas 19 unidades disponíveis",
  ],
}

export const terrenosSection = {
  eyebrow: "Terrenos e Chácaras",
  heading: "Escolha o chão — a casa dos seus sonhos vem depois",
  body: "Dezenas de lotes prontos pra construir, em loteamentos residenciais consolidados. Sem fotos, sem enrolação: aqui está exatamente onde fica, quanto mede e quanto custa.",
  ctaLabel: "Simular um terreno",
}

export const chacarasSection = {
  eyebrow: "Pra quem sonha grande",
  heading: "Chácaras",
  body: "Espaço, natureza e um investimento que só cresce.",
}

export const finalCta = {
  eyebrow: "Sua próxima conversa pode mudar tudo",
  headline: "Seu sonho começa com a escolha certa.",
  body: "Fale agora com um especialista e descubra em minutos se você já pode sair do aluguel.",
  cta: "Falar no WhatsApp agora",
}

export const footer = {
  tagline: "Mais que imóveis, realizamos sonhos.",
  rights: `© ${new Date().getFullYear()} Imóveis dos Sonhos. Todos os direitos reservados.`,
}
