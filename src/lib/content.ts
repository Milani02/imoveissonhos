// Conteúdo estratégico extraído e sintetizado das artes do Instagram @imoveis_dos_sonhoss
// Todo o copy segue o tom de voz da marca: direto, caloroso, focado em conquista e saída do aluguel.

export const whatsappNumber = "5543991839425" // (43) 99183-9425

export function waLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}

export const waMessages = {
  header: "Olá! Vi o site da Imóveis dos Sonhos e gostaria de saber mais sobre os imóveis disponíveis.",
  floating: "Olá! Vi o site e gostaria de saber mais sobre os imóveis exclusivos da Imóveis dos Sonhos 🏡",
  hero: "Olá! Quero sair do aluguel e simular meu financiamento com a Imóveis dos Sonhos.",
  comparison: "Olá! Não sei se compro imóvel pronto ou na planta. Podem me ajudar a decidir?",
  journey: "Olá! Quero fazer minha simulação 100% online com a Imóveis dos Sonhos.",
  gallery: "Olá! Vi os imóveis no site e quero saber mais detalhes.",
  finalCta: "Olá! Vim pelo site e quero falar com um especialista agora.",
}

export const siteMeta = {
  title: "Imóveis dos Sonhos — Seu sonho de morar bem começa aqui",
  description:
    "Casas, apartamentos e terrenos com financiamento facilitado em Londrina, Umuarama, Cafezal do Sul, Joinville e todo o Paraná. Atendimento 100% personalizado, do primeiro contato às chaves.",
  instagram: "@imoveis_dos_sonhoss",
  instagramUrl: "https://instagram.com/imoveis_dos_sonhoss",
}

export const nav = [
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Pronto x Planta", href: "#comparativo" },
  { label: "Jornada", href: "#jornada" },
  { label: "Imóveis", href: "#imoveis" },
  { label: "Cidades", href: "#cidades" },
]

export const hero = {
  eyebrow: "Imóveis dos Sonhos · Paraná & Santa Catarina",
  headlineLine1: "Você não nasceu",
  headlineEmphasis: "pra pagar aluguel",
  headlineLine2: "a vida toda.",
  body:
    "Ajudamos você a conquistar o lugar perfeito pra viver momentos inesquecíveis — com financiamento 100% facilitado, atendimento personalizado e as melhores oportunidades de Londrina a Joinville.",
  ctaPrimary: "Quero sair do aluguel",
  ctaSecondary: "Ver como funciona",
  stats: [
    { value: "100%", label: "Financiamento facilitado" },
    { value: "4+", label: "Cidades atendidas" },
    { value: "1º", label: "Contato até as chaves" },
  ],
}

export const cities = ["Londrina", "Umuarama", "Cafezal do Sul", "Joinville · SC", "Todo o Paraná"]

export const diferenciais = {
  eyebrow: "Por que Imóveis dos Sonhos",
  heading: "Mais que vendas. Realizamos conquistas.",
  body: "Seja pra morar, seja pra investir, temos as melhores oportunidades pra você sair do aluguel e conquistar seu espaço.",
  cards: [
    {
      icon: "Home",
      title: "Casas Modernas",
      description: "Projetos atuais, acabamento de qualidade e localização estratégica em toda a região.",
    },
    {
      icon: "Building2",
      title: "Apartamentos na Planta",
      description: "Entrada facilitada e potencial de valorização até o dia da entrega das chaves.",
    },
    {
      icon: "TrendingUp",
      title: "Investimentos Seguros",
      description: "Consultoria especializada pra fazer seu dinheiro trabalhar a favor do seu futuro.",
    },
    {
      icon: "HeartHandshake",
      title: "Atendimento Personalizado",
      description: "Do primeiro contato à entrega das chaves, você nunca caminha sozinho.",
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
    title: "Casa na planta",
    subtitle: "e construção",
    points: [
      "Entrada parcelada — gasta menos pra começar",
      "Entrada facilitada, você se planeja com calma",
      "Potencial de valorização até a entrega das chaves",
      "Liberdade pra personalizar acabamentos",
      "Condições especiais direto com as construtoras",
      "Mais tempo pra organizar suas finanças",
    ],
    note: "Gasta menos com documentação",
  },
  cta: "Falar com um especialista",
}

export const journey = {
  eyebrow: "A jornada da chave",
  heading: "Do aluguel à chave da conquista",
  body: "É assim que caminhamos com você — do primeiro contato até o dia em que a chave do seu imóvel vira sua.",
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
      description: "Envie sua documentação sem sair de casa e descubra sua capacidade de financiamento.",
      image: null as string | null,
    },
    {
      icon: "Landmark",
      tag: "Passo 2",
      title: "Financiamento aprovado",
      description: "Especialistas em crédito imobiliário buscam a melhor condição pro seu perfil — inclusive programas habitacionais e subsídios do governo.",
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
      title: "Especialistas em Financiamento Imobiliário",
      description: "Encontramos a melhor condição de crédito pro seu perfil.",
    },
    {
      title: "Atendimento Inicial 100% Online",
      description: "Faça sua simulação e envie sua documentação sem sair de casa.",
    },
    {
      title: "Diversas Opções de Imóveis",
      description: "Casas prontas, imóveis na planta e financiamento de terreno e construção.",
    },
    {
      title: "Programas Habitacionais",
      description: "Buscamos as melhores condições e analisamos subsídios do governo pra você pagar menos.",
    },
  ],
}

export const gallery = {
  eyebrow: "Imóveis em destaque",
  heading: "Feito pra parecer que já é seu",
  body: "Uma amostra do padrão de imóveis com o qual trabalhamos — modernos, bem localizados e prontos pra receber sua história.",
  items: [
    { image: "heroHouseDusk", title: "Casas modernas", caption: "Projetos atuais com acabamento de alto padrão" },
    { image: "houseDaytime", title: "Investimentos seguros", caption: "Imóveis com potencial real de valorização" },
    { image: "apartmentBuilding", title: "Apartamentos na planta", caption: "Entrada facilitada, valorização até as chaves" },
    { image: "livingRoom", title: "Ambientes planejados", caption: "Espaços pensados pra viver bem, todos os dias" },
  ],
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
