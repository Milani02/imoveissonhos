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
  { label: "Home", href: "/" },
  { label: "Imóveis", href: "/imoveis" },
  { label: "Sobre", href: "/sobre" },
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

export const growthStory = {
  line1: "Do terreno à chave",
  line2Pre: "Um bairro nascendo, ",
  line2Emphasis: "um sonho",
  line2Post: " de cada vez",
  line3Pre: "Sua próxima casa pode ",
  line3Emphasis: "estar aqui",
}

export const empreendimentos = {
  eyebrow: "Lançamentos em destaque",
  heading: "Empreendimentos saindo do papel — e do sonho pra realidade",
  body: "Conheça de perto os lançamentos que estão transformando bairros inteiros em Umuarama e Cafezal do Sul.",
}

export const finalCta = {
  eyebrow: "Sua próxima conversa pode mudar tudo",
  headline: "Seu sonho começa com a escolha certa.",
  body: "Fale agora com um especialista e descubra em minutos se você já pode sair do aluguel.",
  cta: "Falar no WhatsApp agora",
}

export const sobre = {
  eyebrow: "Sobre a Imóveis dos Sonhos",
  heading: "Uma imobiliária 100% digital, do primeiro contato às chaves",
  intro:
    "Somos uma imobiliária 100% digital, com foco principalmente em lançamentos imobiliários — mas também com casas e apartamentos prontos pra morar.",
  paragrafos: [
    "Nosso primeiro atendimento é feito totalmente online: entendemos o que você procura, apresentamos as opções disponíveis e realizamos a simulação, sem você precisar sair de casa.",
    "Depois do atendimento inicial, encaminhamos você para um atendimento presencial junto à construtora responsável pelo empreendimento, onde pode conhecer o projeto de perto, tirar dúvidas e dar continuidade à negociação.",
    "Hoje atendemos Londrina, Umuarama e Cafezal do Sul, sempre com a mesma proposta: entrada 100% parcelada e acompanhamento pessoal em cada etapa da conquista do seu imóvel.",
  ],
  contatos: [
    { cidade: "Londrina e Cafezal do Sul", numero: "(43) 99183-9425" },
    { cidade: "Umuarama", numero: "(44) 99159-4260" },
  ],
}

export const depoimentos = {
  eyebrow: "Quem já conquistou",
  heading: "O que dizem os nossos clientes",
  body: "Cada mensagem aqui é de alguém que trocou o aluguel por um endereço próprio.",
}

// Textos reais, extraídos das conversas de WhatsApp enviadas pelo cliente como prova social.
// Nome do cliente não identificado nas capturas — usamos um rótulo genérico em vez de inventar um nome.
export const depoimentosLista = [
  {
    texto:
      "Quero deixar aqui meu agradecimento pelo atendimento incrível! 🙏 Sempre soubemos que um dia iríamos conquistar nosso imóvel próprio, mas não imaginávamos que seria tão rápido assim. Vc foi essencial nesse processo, sempre tirando todas as nossas dúvidas com paciência e clareza, passando muita segurança em cada etapa. Hoje eu e minha família estamos realizando um grande sonho, e isso só foi possível graças ao seu profissionalismo e dedicação. Atendimento excelente, de verdade! Profissional top 👏 Muito obrigado por tudo!",
    nome: "Cliente Imóveis dos Sonhos",
  },
  {
    texto:
      "Vou ser sincero contigo, no início eu não acreditava em nada, principalmente quando você falou que não precisa de entrada à vista, fiquei sem acreditar e pedi pra ir no escritório falar pessoalmente 😅 mas enfim... Sem palavras pra descrever o quanto somos gratos por todo o suporte que você nos deu! 🙏 Você veio e mostrou que era possível ter uma casa própria sem precisar ter um grande recurso financeiro. Isso mudou tudo pra gente. Hoje estamos realizando um sonho que não é só nosso, mas da nossa família inteira. É uma sensação que não tem preço. Obrigado de coração pelo seu esforço, dedicação e profissionalismo. Seu atendimento foi simplesmente incrível! 👏🔥",
    nome: "Cliente Imóveis dos Sonhos",
  },
  {
    texto:
      "O seu atendimento é nota 10. Fui muito bem atendido. Sempre deu atenção e sanou as dúvidas, independente do horário que mandasse mensagem. E poder estar adquirindo a casa própria foi um marco muito importante na minha vida e da minha família. Sem dúvidas tudo isso é muito gratificante!",
    nome: "Cliente Imóveis dos Sonhos",
  },
  {
    texto:
      "Ritchy, queria agradecer pelo atendimento na compra do imóvel, principalmente pelo seu atendimento. Obrigado por ajudar a gente a conquistar o sonho da casa própria 🙏😁",
    nome: "Cliente Imóveis dos Sonhos",
  },
]

export const footer = {
  tagline: "Mais que imóveis, realizamos sonhos.",
  rights: `© ${new Date().getFullYear()} Imóveis dos Sonhos. Todos os direitos reservados.`,
}
